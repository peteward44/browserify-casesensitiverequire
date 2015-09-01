/*jslint node: true */
"use strict";

var colors = require('colors/safe');
var path = require( 'path' );
var transformTools = require( 'browserify-transform-tools' );

var paths = [];

module.exports = transformTools.makeRequireTransform(
	"browserify-casesensitiverequire",
	{
		evaluateArguments: true,
		jsFilesOnly: true
	},
	function( args, opts, cb ) {

		var include = args[0];
		var fullpath = include;	
		if ( opts.file && fullpath.match( /^\.{1,2}(\\|\/)/ ) ) {
			// if a relative file path, create a full path for it so the same file can be referenced in from
			// multiple locations and still be recognised as the same file
			fullpath = path.normalize( path.join( path.dirname( opts.file ), fullpath ) );
		}
		// otherwise it's an absolute path or one that sits in node_modules
		var lhs;
		var exists = paths.some( function( p2 ) {
			lhs = p2;
			// checks if the full path of each file is the same, and shares the same casing
			return fullpath.toUpperCase() === p2.fullpath.toUpperCase() && fullpath !== p2.fullpath;
		} );
		if ( exists ) {
			console.error( colors.red( "browserify-casesensitiverequire: Inconsistency found" ) );
			console.error( colors.cyan( "'" + include + "'" ), colors.yellow( "require'd from" ), colors.cyan( "'" + opts.file + "'" ) );
			console.error( colors.yellow( "does not match case of" ) );
			console.error( colors.cyan( "'" + lhs.include + "'" ), colors.yellow( "require'd from" ), colors.cyan( "'" + lhs.source + "'" ) );
		} else {
			paths.push( { include: include, fullpath: fullpath, source: opts.file } );
		}
		return cb();
	}
);

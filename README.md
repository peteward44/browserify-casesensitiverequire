# browserify-casesensitiverequire
A simple browserify transform to ensure that the case of require()'d file names are consistent, and warn the user if they aren't. This makes sure that browersify code that is written on Windows will also work on *nix's.

Example usage (command line)
```
npm i browserify-casesensitiverequire -g
browserify -t browserify-casesensitiverequire ./myindex.js
```

I was originally tempted to create a transform that would automatically alter the case for you, however this seemed like bad practice so I have opted for emitting warnings instead.

If the same file is require()'d by Browserify using different casing, on Windows this will cause the same file to be processed & compiled twice (which works, but is undesirable). On case-sensitive file systems, the operation will fail. So we have code that can build on Windows but not unix. This transform aims to resolve that, by warning the developer they have require()'d the same file at different points in their code using different casing.

Example

File: index1.js
```
var a = require( './index3.js' );
```

File: index2.js
```
var b = require( './INDEX3.js' );
```

This will emit a warning that index3.js is referenced in multiple files using different casing.


Example (using relative paths from different subfolders)

File: index1.js
```
var a = require( './index3.js' );
```

File: subfolder/index2.js
```
var b = require( '../INDEX3.js' );
```

browserify-casesensitiverequire is smart enough to figure out that they are referencing the same index3.js, so will also emit a warning.



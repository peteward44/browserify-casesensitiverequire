# browserify-casesensitiverequire
A simple browserify transform to ensure that the case of require()'d file names are consistent, and warn the user if they aren't. This makes sure that browersify code that is written on Windows will also work on *nix's.

Example usage (command line)
```
npm i browserify-casesensitiverequire -g
browserify -t browserify-casesensitiverequire ./myindex.js
```

I was originally tempted to create a transform that would automatically alter the case for you, however this seemed like bad practice so I have opted for emitting warnings instead.

If the same file is require()'d by Browserify using different casing, on Windows this will cause the same file to be processed & compiled twice (which works, but is undesirable). On case-sensitive file systems, the operation will fail. So we have code that can build on Windows but not unix. This transform aims to resolve that, by warning the developer they have require()'d the same file at different points in their code using different casing.

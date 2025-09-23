/*
 * grunt-po2mo
 * https://github.com/MicheleBertoli/grunt-po2mo
 *
 * Copyright (c) 2013 Michele Bertoli
 * Licensed under the MIT license.
 */

"use strict";

var spawnSync = require("child_process").spawnSync;
var path = require("path");

module.exports = function (grunt) {
  grunt.registerMultiTask(
    "po2mo",
    "Compile .po files into binary .mo files with msgfmt.",
    function () {
      var options = this.options({
        deleteSrc: false,
      });

      this.files.forEach(function (file) {
        var src = file.src[0];
        var dest = file.dest;
        if (dest.indexOf(".po") > -1) {
          dest = dest.replace(".po", ".mo");
        }
        // Ensure destination directory exists
        grunt.file.mkdir(path.dirname(dest));

        var args = ["-o", dest, src];
        grunt.verbose.writeln("Executing: msgfmt " + args.join(" "));
        var result = spawnSync("msgfmt", args);

        if (result.error) {
          grunt.fail.warn("Failed to execute msgfmt: " + result.error.message);
          return;
        }

        if (result.status !== 0) {
          var stderr = result.stderr ? result.stderr.toString() : "";
          grunt.fail.warn(
            "msgfmt exited with code " +
              result.status +
              (stderr ? "\n" + stderr : "")
          );
          return;
        }

        if (options.deleteSrc) {
          grunt.file.delete(src);
        }
      });
    }
  );
};

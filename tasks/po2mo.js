/*
 * grunt-po2mo
 * https://github.com/MicheleBertoli/grunt-po2mo
 *
 * Copyright (c) 2013 Michele Bertoli
 * Licensed under the MIT license.
 */

"use strict";

const spawnSync = require("child_process").spawnSync;
const path = require("path");

module.exports = (grunt) => {
  grunt.registerMultiTask(
    "po2mo",
    "Compile .po files into binary .mo files with msgfmt.",
    function () {
      const options = this.options({
        deleteSrc: false,
      });

      for (const file of this.files) {
        const src = file.src[0];
        let dest = file.dest;
        if (dest.endsWith(".po")) {
          dest = dest.slice(0, -3) + ".mo";
        }
        // Ensure destination directory exists
        grunt.file.mkdir(path.dirname(dest));

        const args = ["-o", dest, src];
        grunt.verbose.writeln("Executing: msgfmt " + args.join(" "));
        const result = spawnSync("msgfmt", args);

        if (result.error) {
          grunt.fail.warn("Failed to execute msgfmt: " + result.error.message);
          continue;
        }

        if (result.status !== 0) {
          const stderr = result.stderr ? result.stderr.toString() : "";
          grunt.fail.warn(
            "msgfmt exited with code " +
              result.status +
              (stderr ? "\n" + stderr : "")
          );
          continue;
        }

        if (options.deleteSrc) {
          grunt.file.delete(src);
        }
      }
    }
  );
};

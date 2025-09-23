"use strict";

var grunt = require("grunt");
var spawnSync = require("child_process").spawnSync;

exports.po2mo = {
  setUp: function (done) {
    done();
  },
  stage: function (test) {
    test.expect(2);

    var result = spawnSync("msgunfmt", ["tmp/fr.mo"]);
    if (result.status !== 0) {
      test.ok(
        false,
        "msgunfmt failed: " + (result.stderr ? result.stderr.toString() : "")
      );
      test.done();
      return;
    }

    var poText = result.stdout.toString();
    test.ok(
      poText.indexOf('msgid "My name is %s.\\n"') !== -1,
      "Expected msgid missing"
    );
    test.ok(
      poText.indexOf('msgstr "Je m\'appelle %s.\\n"') !== -1,
      "Expected msgstr missing"
    );

    test.done();
  },
  prod: function (test) {
    test.expect(1);

    var expected = grunt.file.exists("tmp/fixtures/fr.po");
    test.equal(expected, false);

    test.done();
  },
};

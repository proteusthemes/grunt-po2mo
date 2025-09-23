"use strict";

const grunt = require("grunt");
const spawnSync = require("child_process").spawnSync;

exports.po2mo = {
  setUp: (done) => {
    done();
  },
  stage: (test) => {
    test.expect(2);

    const result = spawnSync("msgunfmt", ["tmp/fr.mo"]);
    if (result.status !== 0) {
      test.ok(
        false,
        "msgunfmt failed: " + (result.stderr ? result.stderr.toString() : "")
      );
      test.done();
      return;
    }

    const poText = result.stdout.toString();
    test.ok(poText.includes('msgid "My name is %s.\\n"'), "Expected msgid missing");
    test.ok(poText.includes('msgstr "Je m\'appelle %s.\\n"'), "Expected msgstr missing");

    test.done();
  },
  prod: (test) => {
    test.expect(1);

    const expected = grunt.file.exists("tmp/fixtures/fr.po");
    test.equal(expected, false);

    test.done();
  },
};

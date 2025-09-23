# grunt-po2mo

[![No Maintenance Intended](https://unmaintained.tech/badge.svg)](https://unmaintained.tech/)

Compile .po files into binary .mo files with msgfmt.

## Getting Started

This plugin requires:

- Grunt
- [gettext](https://www.gnu.org/software/gettext/) (Installation instructions: [Mac](https://brewformulas.org/Gettext), [Windows](https://gnuwin32.sourceforge.net/packages/gettext.htm) and [Linux](https://ftp.gnu.org/pub/gnu/gettext/))

If you haven't used [Grunt](https://gruntjs.com/) before, be sure to check out the [Getting Started](https://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](https://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command — at least if you want the original, and not this fork:

```shell
npm install grunt-po2mo --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-po2mo');
```

## The `po2mo` task

### Overview

In your project's Gruntfile, add a section named `po2mo` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  po2mo: {
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.deleteSrc

Type: `Boolean`  
Default value: `false`

Will delete the source .po file.

### Usage Examples

```js
grunt.initConfig({
  po2mo: {
    files: {
      src: 'languages/fr.po',
      dest: 'languages/fr.mo',
    },
  },
})
```

```js
grunt.initConfig({
  po2mo: {
    files: {
      options: {
        deleteSrc: true
      },
      src: 'languages/fr.po',
      dest: 'languages/fr.mo',
    },
  },
})
```

'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-rapid:app', function () {
  this.timeout(0);

  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        project: 'foo',
        ghPages: true,
        email: 'foo@bar.baz',
        ghRepo: 'git@github.ibm.com:mcpaul/generator-rapid.git'
      })
      .on('end', done);
  });

  it('creates config files', function () {
    assert.file([
      '.editorconfig',
      '.gitignore',
      '.npmrc'
    ]);
  });

  it('creates package manager files', function () {
    assert.file([
      'package.json'
    ]);
  });

  it('creates gitkeep files', function () {
    assert.file([
      'fonts/.gitkeep'
    ]);
  });

  it('creates Gullpfile', function () {
    assert.file(['Gulpfile.js']);
  });

  it('creates Travis file', function () {
    assert.file(['.travis.yml']);
  });

  it('creates deploy file', function () {
    assert.file(['.deploy.sh']);
  });

  it('creates pages files', function () {
    assert.file([
      'pages/index.html',
      'pages/markdown.md'
    ]);
  });

  it('creates template file', function () {
    assert.file(['templates/_layout.html']);
  });

  it('creates JavaScript files', function () {
    assert.file(['js/app.js']);
  });

  it('creates Sass files', function () {
    assert.file(['sass/style.scss']);
  });
});

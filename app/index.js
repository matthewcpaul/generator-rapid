'use strict';
var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var path = require('path');
var _ = require('lodash');
var _s = require('underscore.string');

module.exports = generators.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user
    this.log(yosay(
      'Welcome to the lovely ' + chalk.red('Rapid Design System') + ' project generator!'
    ));

    // Ask the user for a mandatory project name
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'What is your project’s name (e.g. Dashboard Prototype)?',
      validate: function (input) {
        if (input === '') {
          return 'Please enter a project name';
        }
        else {
          return true;
        }
      }
    }]).then(function (answers) {
      this.appname = _s.slugify(answers.name);
    }.bind(this));
  },

  // Create the project folder using the project name
  configuring: {
    enforceFolderName: function () {
      if (this.appname !== _.last(this.destinationRoot().split(path.sep))) {
        this.destinationRoot(this.appname);
      }

      this.config.save();
    }
  },

  // Create the project files
  writing: {
    app: function () {
      // Package.json
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          'name': this.appname
        }
      );

      // Gulpfile
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
    },

    dotfiles: function () {
      // Editor config
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );

      // Gitignore
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );

      // nvmrc
      this.fs.copy(
        this.templatePath('nvmrc'),
        this.destinationPath('.nvmrc')
      );

      // npmrc
      this.fs.copy(
        this.templatePath('npmrc'),
        this.destinationPath('.npmrc')
      );

      // armadillo
      this.fs.copy(
        this.templatePath('_armadillo.js'),
        this.destinationPath('.armadillo.js')
      );
    },

    projectfiles: function () {
      var folders = [
        'images'
        // 'videos',
        // 'fonts'
      ],
        _this = this;

      // Pages and templates
      this.fs.copy(
        this.templatePath('pages'),
        this.destinationPath('pages')
      );

      this.fs.copyTpl(
        this.templatePath('_layout.html'),
        this.destinationPath('templates/_layout.html'),
        { name: this.appname }
      );

      // JavaScript and SCSS files
      this.fs.copy(
        this.templatePath('app.js'),
        this.destinationPath('js/app.js')
      );
      this.fs.copy(
        this.templatePath('sass/**'),
        this.destinationPath('sass')
      );

      // Gitkeep folders
      folders.forEach(function (folder) {
        _this.fs.copy(
          _this.templatePath('gitkeep'),
          _this.destinationPath(folder + '/.gitkeep')
        );
      });
    }
  }

  // install: function () {
  //   this.installDependencies();
  // }
});

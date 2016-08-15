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

  configuring: {
    enforceFolderName: function () {
      if (this.appname !== _.last(this.destinationRoot().split(path.sep))) {
        this.destinationRoot(this.appname);
      }

      this.config.save();
    }
  },

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
    },

    projectfiles: function () {
      var folders = [
        'images',
        'videos',
        'fonts'
      ],
        _this = this;

      // Index file
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('index.html'),
        {
          'name': this.appname
        }
      );

      // JavaScript and SCSS files
      this.fs.copy(
        this.templatePath('js/**'),
        this.destinationPath('js')
      );
      this.fs.copy(
        this.templatePath('scss/**'),
        this.destinationPath('scss')
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

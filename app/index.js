var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var path = require('path');
var _ = require('lodash');
var _s = require('underscore.string');

module.exports = generators.Base.extend({
  constructor: function () {

    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

    // Add your custom code here
  },

  prompting: function () {
    var done = this.async();

    // Greet the user
    this.log(yosay(
      'Rapid Generator is creating a project for you to design, build, and deploy your app with the Rapid Design System.'
    ));

    var prompts = [{
      type: 'string',
      name: 'project',
      message: 'What is your project\'s name?',
      validate: function (input) {
        if (input === '') {
          return 'Please enter a project name';
        }
        else {
          return true;
        }
      }
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.appname = _s.slugify(props.project);
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      // NVMRC
      this.fs.copy(
        this.templatePath('nvmrc'),
        this.destinationPath('.nvmrc')
      );

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
          'name': this.props.project
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
  },

  install: function () {
    this.installDependencies();
  }
});

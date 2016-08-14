var generators = require('yeoman-generator');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
  constructor: function () {

    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

    // Next, add your custom code
  },

  initializing: function () {
    this.pkg = require('../../package.json');
  },

  prompting: function () {
    this.log(yosay('Rapid Generator is an HTML5/SCSS starter environment with a Gulp and gh-pages workflow to design, build, and deploy your app with the Rapid Design System.'));
  },

  writing: {
    gulpfile: function () {
      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
    },

    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        // Remove the '_' from '_package.json'
        this.destinationPath('_package.json')
      );
    },

    git: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    editorConfig: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        // Add a '.' to 'editorconfig'
        this.destinationPath('editorconfig')
      );
    },

    h5bp: function () {
      this.fs.copy(
        this.templatePath('favicon.ico'),
        this.destinationPath('app/favicon.ico')
      );

      this.fs.copy(
        this.templatePath('robots.txt'),
        this.destinationPath('app/robots.txt'));
    },

    styles: function () {
			this.fs.copyTpl(
        this.templatePath('main.scss'),
        this.destinationPath('app/styles/main.scss')
      );
    },

    scripts: function () {
      this.fs.copy(
        this.templatePath('main.js'),
        this.destinationPath('app/scripts/main.js')
      );
    },

    html: function () {
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('app/index.html'),
        {
          appname: this.appname
        }
      );
    },

    misc: function () {
      mkdirp('app/images');
    }
  },

  method1: function () {
    console.log('method 1 just ran');
  },

  method2: function () {
    console.log('method 2 just ran');
  }
});

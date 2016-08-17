'use strict';
var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var path = require('path');
var _s = require('underscore.string');
var fs = require('fs-extra');
var _v = require('validator');
var NodeGit = require('nodegit');

module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user
    this.log(yosay(
      'Welcome to the lovely ' + chalk.red('Rapid Design System') + ' project generator!'
    ));

    var prompts = [
      {
        type: 'string',
        name: 'project',
        message: 'What\'s the name of your project?',
        validate: function (input) {
          if (input === '') {
            return 'Please enter a project name';
          } else {
            return true;
          }
        }
      },
      {
        type: 'confirm',
        name: 'ghPages',
        message: 'Would you like to publish your site to GitHub Pages?',
        default: true
      },
      {
        type: 'confirm',
        name: 'gitInit',
        message: 'Would you like to initialize your project with Git?',
        default: true,
        when: function (answers) {
          return !answers.ghPages;
        }
      },
      {
        type: 'string',
        name: 'email',
        message: 'What\'s your email address (so I can attribute commits properly for you)?',
        when: function (answers) {
          return answers.ghPages || answers.gitInit;
        },
        validate: function (input) {
          if (!_v.isEmail(input)) {
            return 'Please enter a valid email address';
          } else {
            return true;
          }
        }
      },
      {
        type: 'string',
        name: 'ghRepo',
        message: 'What\'s the Git repo you\'d like to use? (use the SSH repo, e.g. `git@github.ibm.com:Whitewater/rapid-generator.git`)',
        when: function (answers) {
          return answers.ghPages || answers.gitInit;
        },
        validate: function (input) {
          // Validate Regex from https://www.debuggex.com/r/H4kRw1G0YPyBFjfm
          if (_v.matches(input, /((git|ssh|http(s)?)|(git@[\w\.]+))(:(\/\/)?)([\w\.@\:\/\-~]+)(\.git)(\/)?/i)) {
            return true;
          } else {
            return 'Please enter a valid Git remote URL';
          }
        }
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      this.appname = _s.slugify(props.project);
      if (props.ghRepo) {
        this.props.repoSlug = props.ghRepo.split('@')[1];
      }

      props.cid = "Travis CI";

      done();
    }.bind(this));
  },

  configuring: function () {
    // Create the project folder using the project name
    if (path.basename(this.destinationPath()) !== this.appname) {
      this.log('Creating the ' + this.appname + ' folder');

      fs.ensureDirSync(this.appname);
      this.destinationRoot(this.destinationPath(this.appname));
    }

    this.config.save();
  },

  writing: function () {
    var _this = this;

    // Create child folders
    var folders = [
      'pages',
      'templates',
      'sass',
      'js',
      'images',
      'fonts',
      'documents'
    ];

    // Gitkeep folders
    folders.forEach(function (folder) {
      _this.fs.copy(
        _this.templatePath('gitkeep'),
        _this.destinationPath(folder + '/.gitkeep')
      );
    });

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

    // README
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        name: this.props.project,
        deploy: this.props.ghPages,
        ci: this.props.cid
      }
    );

    // travis.yml
    this.fs.copyTpl(
      this.templatePath('_travis.yml'),
      this.destinationPath('.travis.yml'),
      { deploy: this.props.ghPages }
    );

    // deploy.sh
    if (this.props.ghPages) {
      this.fs.copyTpl(
        this.templatePath('_deploy.sh'),
        this.destinationPath('.deploy.sh'),
        {
          repo: this.props.repoSlug,
          email: this.props.email,
          ci: this.props.cid
        }
      );
    }

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
  },

  install: function () {
    this.npmInstall();
  },

  end: function () {
    var done = this.async();
    var _this = this;

    if (this.props.ghPages || this.props.gitInit) {

      NodeGit.Repository.init(path.resolve('./'), 0).then(function (repo) {
        NodeGit.Remote.create(repo, 'origin', _this.props.ghRepo);

      }).then(function () {
        _this.log('All done!');
        done();
      }).catch(function (e) {
        _this.log(e);
      });
    }
  }
});

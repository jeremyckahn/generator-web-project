'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var Mustache = require('mustache');


var ProjectGeneratorGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to Jeremy\'s generator!'));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'What is the name of this project?',
      default: process.cwd().split('/').pop()
    }, {
      type: 'input',
      name: 'friendlyName',
      message: 'What is your name?',
      default: 'John Doe'
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.friendlyName = props.friendlyName;

      done();
    }.bind(this));
  },

  setVariables: function () {
    this.year = (new Date()).getFullYear();
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/scripts');
    this.mkdir('app/styles');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('gitignore', '.gitignore');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('bowerrc', '.bowerrc');
    this.template('LICENSE-MIT', 'LICENSE-MIT');
  }
});

module.exports = ProjectGeneratorGenerator;

# Rapid Generator

> Yeoman generator that scaffolds out a front-end web app using [gulp-armadillo](https://github.com/Snugug/gulp-armadillo) for the build process and [Rapid Design System](https://github.ibm.com/Whitewater/rapid) for the SCSS library.

## GitHub Setup

#### GitHub Enterprise
Create a [github.ibm.com](https://github.ibm.com/) account

#### Travis CI
Create a [travis.innovate.ibm](https://travis.innovate.ibm.com/) account

#### SSH Key
Generate an [SSH Key](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/) and [add it to your GitHub Enterprise account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)

## Prerequisites

#### Node
  - If you previously installed Node through the Node.js website, uninstall using [these instructions](https://gist.github.com/TonyMtz/d75101d9bdf764c890ef#file-gistfile1-txt)
  - Install node the right way: http://blog.teamtreehouse.com/install-node-js-npm-mac

#### Gulp
Install Gulp globally:
```
npm install -g gulp
```

#### Yeoman

First, you need to install [Yeoman](http://yeoman.io). You only have to ask for her once, then she packs up and moves into your hard drive.

Open up your terminal, and in any directory, run:
```
npm install -g yo
```

## Installation

#### Yeoman Generator

Yeoman travels light. She didn't pack any generators when she moved in. You can think of a generator like a plug-in, and like Yeoman herself, you only have to ask for generators once. This project is all about the Rapid Design System, so let’s grab that generator.

To install generator-rapid, clone the generator repo in the folder where you keep your dev projects:
```
git clone git@github.ibm.com:mcpaul/generator-rapid.git
```

Now, we want to go into the project and link the generator locally with npm:
```
cd /generator-rapid
npm link
```

## Yo Rapid

Then, back in your development directory, run Yeoman to create a new project:
```
yo rapid
```

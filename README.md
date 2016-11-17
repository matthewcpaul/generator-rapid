# Rapid Generator [![Build Status](https://travis.ibm.com/mcpaul/generator-rapid.svg?token=zyKr4q1yXhTxTRCi32JS&branch=master)](https://travis.ibm.com/mcpaul/generator-rapid)

Yeoman generator that scaffolds out a front-end web app using [gulp-armadillo](https://github.com/Snugug/gulp-armadillo) for the build process and [Rapid Design System](https://github.ibm.com/Whitewater/rapid) for the SCSS library.

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
  - Install node the right way with Homebrew: http://blog.teamtreehouse.com/install-node-js-npm-mac
  - Fixing npm permissions (if you don't want to use Homebrew): https://docs.npmjs.com/getting-started/fixing-npm-permissions

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

Rapid Generator is available as a package on IBM’s [NPM Enterprise registry](https://npm.whitewater.ibm.com/). To get access, follow [these instructions](https://github.ibm.com/Whitewater/npm-enterprise#option-2-using-npm-enterprise-for-private-packages-only) to authenticate with your w3id. You can initiate the authentication by logging in with the `@whitewater` scope:

```
npm login --registry=https://npm-registry.whitewater.ibm.com --scope=@whitewater
```

#### Yeoman Generator

Yeoman travels light. She didn't pack any generators when she moved in. You can think of a generator like a plug-in, and like Yeoman herself, you only have to ask for generators once. This project is all about the Rapid Design System, so let’s grab that generator.

To install generator-rapid:
```
npm install -g @whitewater-rapid
```

#### Yo Rapid

Then, back in your development directory, run Yeoman to create a new project:
```
yo @whitewater/rapid
```

## Automated deploys to GitHub

Almost everything is set up for you to deploy your site to [GitHub Pages](https://pages.github.com/) with [Travis CI](https://travis.innovate.ibm.com).

#### Personal access token
You need to create an [personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) with the [`repo`](https://developer.github.com/v3/oauth/#scopes) scope. Keep this a secret! It's what lets Travis CI write to your `gh-pages` branch and deploy for you!

#### Enable GitHub Repo from Travis CI
Navigate to https://travis.innovate.ibm.com/profile/{github-username}, click **sync now**, and then toggle your repository **on**

#### Set environment variable
Once you've got your token, in your [Travis CI environment variables](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings), add a `GH_TOKEN` variable and set it to your token.

#### Push to GitHub Enterprise
Back in your terminal, push your project up to GitHub
```
git add .
git commit -m ":tada: Initial commit"
git push origin master
```

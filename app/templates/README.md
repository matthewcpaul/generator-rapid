# <%= name %>

Welcome to your new awesome [Armadillo](https://github.com/Snugug/gulp-armadillo) powered website! For more in-depth documentation, check out its website.

All of the Armadillo's [Basic Commands](https://github.com/Snugug/gulp-armadillo#basic-armadillo-commands) can be run by prepending `npm run` to them if you don't have Gulp globally installed, so if you wanted to run your Armadillo's development command, you can run `npm run gulp`.

This app has also been setup with [Rapid](https://github.ibm.com/Whitewater/rapid). For more information, check out it's [documentation](https://pages.github.ibm.com/Whitewater/rapid/).

## Starting the application

Make sure your node modules are installed, then start the app and navigate to [localhost:3000](http://localhost:3000).

```sh
$ npm install
$ npm start
```

## Deploying to GitHub Pages

Almost everything is set up for you to deploy your site to [GitHub Pages](https://pages.github.com/) with [Travis CI](https://travis.innovate.ibm.com). You need to create an [personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) with the [`repo`](https://developer.github.com/v3/oauth/#scopes) scope. Keep this a secret! It's what lets Travis CI write to your `gh-pages` branch and deploy for you! Once you've got your token, in your [Travis CI environment variables](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings), add a `GH_TOKEN` variable and set it to your token. Be sure to enable your GitHub repo from Travis CI!

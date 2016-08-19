# <%= name %>

Welcome to your new prototype! This app has been setup with [Rapid](https://github.ibm.com/Whitewater/rapid), a SCSS design system for rapid prototyping at IBM, and [Armadillo](https://github.com/Snugug/gulp-armadillo), a static site generator.

## Starting the application

Yeoman generously installed all of your dependencies as npm node modules, so all you need to do is run Gulp to start the app:

```bash
gulp
```

## Deploying to GitHub Pages

Almost everything is set up for you to deploy your site to [GitHub Pages](https://pages.github.com/) with [Travis CI](https://travis.innovate.ibm.com). You need to create an [personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) with the [`repo`](https://developer.github.com/v3/oauth/#scopes) scope. Keep this a secret! It's what lets Travis CI write to your `gh-pages` branch and deploy for you! Once you've got your token, in your [Travis CI environment variables](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings), add a `GH_TOKEN` variable and set it to your token. Be sure to enable your GitHub repo from Travis CI!

#!/bin/bash

# exit with nonzero exit code if anything fails
set -e

# Move to build folder and init it
cd .dist
git init

# Configure Git
git config user.name "<%= ci %>"
git config user.email "<%= email %>"

# Commit all the things into the repo
git add .
git commit -m ":shipit: Deploy to GitHub Pages"

# Force push to gh-pages
git push --force "${GH_TOKEN}@<%= repo %>" master:gh-pages > /dev/null 2>&1

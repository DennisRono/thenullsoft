/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const gulp = require('gulp');
const path = require('path');
const fs = require('fs-extra');

const getVersionsCDNUrl = require('./utils/versioned-cdn-url');
const getNpmCmd = require('./utils/get-npm-cmd');
const spawn = require('./utils/spawn-promise-wrapper');
const constants = require('./utils/constants');

// TODO: This should publish based on git tags, similar to GitHub and CDN
// releases

gulp.task('publish-demos:updateCDNDetails', () => {
  const details = {
    latestUrl: getVersionsCDNUrl(),
  };
  const filePath = path.join(__dirname, '..', 'demos',
      'functions', 'cdn-details.json');

  return fs.writeJSON(filePath, details);
});

gulp.task('publish-demos:deploy', () => {
  return spawn(getNpmCmd(), ['run', 'demos-deploy'], {
    cwd: path.join(__dirname, '..'),
  });
});

gulp.task('publish-demos:clean', () => {
  return fs.remove(
      path.join(__dirname, '..', 'demos', 'public', constants.LOCAL_BUILDS_DIR)
  );
});

gulp.task('publish-demos', gulp.series([
  'publish-demos:clean',
  'publish-demos:updateCDNDetails',
  'publish-demos:deploy',
]));

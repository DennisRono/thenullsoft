/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const gulp = require('gulp');

const {transpilePackageOrSkip} = require('./transpile-typescript');
const buildWindowBundle = require('./utils/build-window-bundle');
const versionModule = require('./utils/version-module');
const constants = require('./utils/constants');
const packageRunnner = require('./utils/package-runner');


gulp.task('build-window-packages:window-bundle', gulp.series(
    packageRunnner('build-window-packages:transpile-typescript',
        'window', transpilePackageOrSkip),
    Object.keys(constants.BUILD_TYPES).map((buildKey) => packageRunnner(
        'build-window-packages:window-bundle',
        'window',
        buildWindowBundle,
        constants.BUILD_TYPES[buildKey],
    ))
));

gulp.task('build-window-packages:version-module', gulp.series(
    packageRunnner(
        'build-window-packages:version-module',
        'window',
        versionModule)
));

gulp.task('build-window-packages', gulp.series(
    'build-window-packages:version-module',
    'build-window-packages:window-bundle',
));

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const fs = require('fs-extra');
const oneLine = require('common-tags').oneLine;
const path = require('path');
const {rollup} = require('rollup');
const constants = require('./constants');
const logHelper = require('../../infra/utils/log-helper');
const pkgPathToName = require('./pkg-path-to-name');
const rollupHelper = require('./rollup-helper');

/*
 * To test sourcemaps are valid and working, use:
 * http://paulirish.github.io/source-map-visualization/#custom-choose
 */
const ERROR_NO_MODULE_INDEX = `Could not find the module's index.mjs file: `;
const ERROR_NO_NAMSPACE = oneLine`
  You must define a 'browserNamespace' parameter in the 'package.json'.
  Example: 'workbox-precaching' would have a browserNamespace param of
  'workbox.precaching' in 'package.json', meaning developers would use
  'workbox.precaching' in their JavaScript. Please fix for:
`;

// This makes Rollup assume workbox-* will be added to the global
// scope and replace references with the core namespace
const globals = (moduleId) => {
  if (moduleId === 'workbox') {
    return moduleId;
  }

  const splitImportPath = moduleId.split('/');
  if (splitImportPath[0].indexOf('workbox-') !== 0) {
    throw new Error(`Unknown global module ID: ${moduleId}`);
  }

  const packageName = splitImportPath.shift();
  const packagePath = path.join(__dirname, '..', '..', 'packages', packageName);
  const namespacePathParts = splitImportPath.map((importPathPiece) => {
    // The browser namespace will need the file extension removed
    return path.basename(importPathPiece, path.extname(importPathPiece));
  });

  if (namespacePathParts.length === 0) {
    // Tried to pull in default export of module - this isn't allowed.
    // A specific file must be referenced
    throw new Error(oneLine`
        You cannot use a module directly - you must specify
        file, this is to force a best practice for tree shaking (i.e. only
        pulling in what you use). Please fix the import: '${moduleId}'`);
  }

  let additionalNamespace;
  if (namespacePathParts.length > 1) {
    if (namespacePathParts[0] !== '_private' || namespacePathParts.length > 2) {
      // Tried to pull in default export of module - this isn't allowed.
      // A specific file must be referenced
      throw new Error(oneLine`
          You cannot use nested files. It must be a top level (and public) file
          or a file under '_private' in a module. Please fix the import:
          '${moduleId}'`);
    }
    additionalNamespace = namespacePathParts[0];
  }

  // Get a package's browserNamespace so we know where it will be
  // on the global scope (i.e. workbox.<name space>)
  try {
    const pkg = require(path.join(packagePath, 'package.json'));
    return [
      pkg.workbox.browserNamespace,
      additionalNamespace,
    ].filter((value) => (value && value.length > 0)).join('.');
  } catch (err) {
    logHelper.error(`Unable to get browserNamespace for package: ` +
        `'${packageName}'`);
    logHelper.error(err);
    throw err;
  }
};

// This ensures all workbox-* modules are treated as external and are
// referenced as globals.
const externalAndPure = (importPath) => {
  return (importPath.indexOf('workbox-') === 0);
};

module.exports = async (packagePath, buildType) => {
  const packageName = pkgPathToName(packagePath);
  const packageIndex = path.join(packagePath, `index.mjs`);

  // First check if the bundle file exists, if it doesn't
  // there is nothing to build
  if (!fs.existsSync(packageIndex)) {
    logHelper.error(ERROR_NO_MODULE_INDEX + packageName);
    return Promise.reject(ERROR_NO_MODULE_INDEX + packageName);
  }

  const pkgJson = require(path.join(packagePath, 'package.json'));
  if (!pkgJson.workbox || !pkgJson.workbox.browserNamespace) {
    logHelper.error(ERROR_NO_NAMSPACE + ' ' + packageName);
    return Promise.reject(ERROR_NO_NAMSPACE + ' ' + packageName);
  }

  let outputFilename = pkgJson.workbox.outputFilename || packageName;
  if (pkgJson.workbox.prodOnly) {
    // Bail out early if this is a non-prod build.
    if (buildType !== constants.BUILD_TYPES.prod) {
      return Promise.resolve();
    }
  } else {
    // Prod-only builds (above) don't need the build type, but when there's a
    // dev and prod build we have to include it.
    outputFilename += `.${buildType.slice(0, 4)}`;
  }
  outputFilename += '.js';

  const namespace = pkgJson.workbox.browserNamespace;
  const outputDirectory = path.join(packagePath,
      constants.PACKAGE_BUILD_DIRNAME);

  logHelper.log(oneLine`
    Building Browser Bundle for
    ${logHelper.highlight(packageName)}.
  `);
  logHelper.log(`    Namespace: ${logHelper.highlight(namespace)}`);
  logHelper.log(`    Filename: ${logHelper.highlight(outputFilename)}`);

  const plugins = rollupHelper.getDefaultPlugins(buildType);

  const bundle = await rollup({
    input: packageIndex,
    external: externalAndPure,
    treeshake: {
      pureExternalModules: externalAndPure,
    },
    plugins,
    onwarn: (warning) => {
      if (buildType === constants.BUILD_TYPES.prod &&
        warning.code === 'UNUSED_EXTERNAL_IMPORT') {
        // This can occur when using rollup-plugin-replace.
        logHelper.warn(`[${warning.code}] ${warning.message}`);
        return;
      }

      // The final builds should have no warnings.
      if (warning.code && warning.message) {
        throw new Error(`Unhandled Rollup Warning: [${warning.code}] ` +
          `${warning.message}`);
      } else {
        throw new Error(`Unhandled Rollup Warning: ${warning}`);
      }
    },
  });

  await bundle.write({
    file: path.join(outputDirectory, outputFilename),
    name: namespace,
    sourcemap: true,
    format: 'iife',
    globals,
  });
};

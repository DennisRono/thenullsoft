/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const expect = require('chai').expect;
const fse = require('fs-extra');
const upath = require('upath');
const tempy = require('tempy');

const errors = require('../../../packages/workbox-build/src/lib/errors');
const injectManifest = require('../../../packages/workbox-build/src/inject-manifest');
const validateServiceWorkerRuntime = require('../../../infra/testing/validator/service-worker-runtime');

describe(`[workbox-build] inject-manifest.js (End to End)`, function() {
  const GLOB_DIR = upath.join(__dirname, '..', 'static', 'example-project-1');
  const SW_SRC_DIR = upath.join(__dirname, '..', 'static', 'sw-injections');
  const BASE_OPTIONS = {
    globDirectory: GLOB_DIR,
    swDest: tempy.file({extension: 'js'}),
    swSrc: upath.join(SW_SRC_DIR, 'basic.js'),
  };
  const REQUIRED_PARAMS = [
    'swDest',
    'swSrc',
  ];
  const SUPPORTED_PARAMS = [
    'additionalManifestEntries',
    'dontCacheBustURLsMatching',
    'globDirectory',
    'globFollow',
    'globIgnores',
    'globPatterns',
    'globStrict',
    'injectionPoint',
    'manifestTransforms',
    'maximumFileSizeToCacheInBytes',
    'modifyURLPrefix',
    'templatedURLs',
  ].concat(REQUIRED_PARAMS);
  const UNSUPPORTED_PARAMS = [
    'cacheId',
    'clientsClaim',
    'directoryIndex',
    'ignoreURLParametersMatching',
    'importScripts',
    'importWorkboxFrom',
    'navigateFallback',
    'navigateFallbackAllowlist',
    'runtimeCaching',
    'skipWaiting',
  ];

  describe('[workbox-build] required parameters', function() {
    for (const requiredParam of REQUIRED_PARAMS) {
      it(`should reject with a ValidationError when '${requiredParam}' is missing`, async function() {
        const options = Object.assign({}, BASE_OPTIONS);
        delete options[requiredParam];

        try {
          await injectManifest(options);
          throw new Error('Unexpected success.');
        } catch (error) {
          expect(error.name).to.eql('ValidationError');
          expect(error.details[0].context.key).to.eql(requiredParam);
        }
      });
    }
  });

  describe('[workbox-build] unsupported parameters', function() {
    for (const unsupportedParam of UNSUPPORTED_PARAMS) {
      it(`should reject with a ValidationError when '${unsupportedParam}' is present`, async function() {
        const options = Object.assign({}, BASE_OPTIONS);
        options[unsupportedParam] = unsupportedParam;

        try {
          await injectManifest(options);
          throw new Error('Unexpected success.');
        } catch (error) {
          expect(error.name).to.eql('ValidationError');
          expect(error.details[0].context.key).to.eql(unsupportedParam);
        }
      });
    }
  });

  describe('[workbox-build] invalid parameter values', function() {
    for (const param of SUPPORTED_PARAMS) {
      it(`should reject with a ValidationError when '${param}' is null`, async function() {
        const options = Object.assign({}, BASE_OPTIONS);
        options[param] = null;

        try {
          await injectManifest(options);
          throw new Error('Unexpected success.');
        } catch (error) {
          expect(error.name).to.eql('ValidationError');
          expect(error.details[0].context.key).to.eql(param);
        }
      });
    }
  });

  describe(`[workbox-build] runtime errors`, function() {
    it(`should throw the expected error when 'swSrc' is invalid`, async function() {
      const options = Object.assign({}, BASE_OPTIONS, {
        swSrc: 'DOES_NOT_EXIST',
      });

      try {
        await injectManifest(options);
        throw new Error('Unexpected success.');
      } catch (error) {
        expect(error.message).to.have.string(errors['invalid-sw-src']);
      }
    });

    it(`should throw the expected error when there is no match for 'injectionPoint'`, async function() {
      const options = Object.assign({}, BASE_OPTIONS, {
        swSrc: upath.join(SW_SRC_DIR, 'bad-no-injection.js'),
      });

      try {
        await injectManifest(options);
        throw new Error('Unexpected success.');
      } catch (error) {
        expect(error.message).to.have.string(errors['injection-point-not-found']);
      }
    });

    it(`should throw the expected error when there is no match for 'injectionPoint' and 'swSrc' and 'swDest' are the same`, async function() {
      const swFile = upath.join(SW_SRC_DIR, 'bad-no-injection.js');
      const options = Object.assign({}, BASE_OPTIONS, {
        swSrc: swFile,
        swDest: swFile,
      });

      try {
        await injectManifest(options);
        throw new Error('Unexpected success.');
      } catch (error) {
        expect(error.message).to.have.string(errors['same-src-and-dest']);
      }
    });

    it(`should throw the expected error when there are multiple matches for 'injectionPoint'`, async function() {
      const options = Object.assign({}, BASE_OPTIONS, {
        swSrc: upath.join(SW_SRC_DIR, 'bad-multiple-injection.js'),
      });

      try {
        await injectManifest(options);
        throw new Error('Unexpected success.');
      } catch (error) {
        expect(error.message).to.have.string(errors['multiple-injection-points']);
      }
    });
  });

  describe(`[workbox-build] writing a service worker file`, function() {
    it(`should use defaults when all the required parameters are present`, async function() {
      const swDest = tempy.file({extension: 'js'});
      const options = Object.assign({}, BASE_OPTIONS, {swDest});

      const {count, filePaths, size, warnings} = await injectManifest(options);
      expect(warnings).to.be.empty;
      expect(count).to.eql(6);
      expect(size).to.eql(2604);
      expect(filePaths).to.have.members([swDest]);

      await validateServiceWorkerRuntime({
        entryPoint: 'injectManifest',
        swFile: swDest,
        expectedMethodCalls: {
          precacheAndRoute: [[[{
            url: 'index.html',
            revision: '3883c45b119c9d7e9ad75a1b4a4672ac',
          }, {
            url: 'page-1.html',
            revision: '544658ab25ee8762dc241e8b1c5ed96d',
          }, {
            url: 'page-2.html',
            revision: 'a3a71ce0b9b43c459cf58bd37e911b74',
          }, {
            url: 'styles/stylesheet-1.css',
            revision: '934823cbc67ccf0d67aa2a2eeb798f12',
          }, {
            url: 'styles/stylesheet-2.css',
            revision: '884f6853a4fc655e4c2dc0c0f27a227c',
          }, {
            url: 'webpackEntry.js',
            revision: '5b652181a25e96f255d0490203d3c47e',
          }]]],
        },
      });
    });

    it(`should use absolute paths in the filePaths return value`, async function() {
      // Deliberately use a relative path for swDest.
      const swDest = upath.relative('.', tempy.file({extension: 'js'}));
      const options = Object.assign({}, BASE_OPTIONS, {swDest});

      const {filePaths, warnings} = await injectManifest(options);
      expect(warnings).to.be.empty;
      // Use upath.resolve() to confirm that we get back an absolute path.
      expect(filePaths).to.have.members([upath.resolve(swDest)]);
    });

    it(`should use defaults when all the required parameters are present, when workboxSW.precache() is called twice`, async function() {
      const swDest = tempy.file({extension: 'js'});
      const options = Object.assign({}, BASE_OPTIONS, {
        swDest,
        swSrc: upath.join(SW_SRC_DIR, 'multiple-calls.js'),
      });

      const {count, filePaths, size, warnings} = await injectManifest(options);
      expect(warnings).to.be.empty;
      expect(count).to.eql(6);
      expect(size).to.eql(2604);
      expect(filePaths).to.have.members([swDest]);

      await validateServiceWorkerRuntime({
        entryPoint: 'injectManifest',
        swFile: swDest,
        expectedMethodCalls: {
          importScripts: [['./sample-import.js']],
          precacheAndRoute: [[[{
            url: 'index.html',
            revision: '3883c45b119c9d7e9ad75a1b4a4672ac',
          }, {
            url: 'page-1.html',
            revision: '544658ab25ee8762dc241e8b1c5ed96d',
          }, {
            url: 'page-2.html',
            revision: 'a3a71ce0b9b43c459cf58bd37e911b74',
          }, {
            url: 'styles/stylesheet-1.css',
            revision: '934823cbc67ccf0d67aa2a2eeb798f12',
          }, {
            url: 'styles/stylesheet-2.css',
            revision: '884f6853a4fc655e4c2dc0c0f27a227c',
          }, {
            url: 'webpackEntry.js',
            revision: '5b652181a25e96f255d0490203d3c47e',
          }]], [[
            '/extra-assets/example.1234.css',
            '/extra-assets/example-2.1234.js',
          ]]],
        },
      });
    });

    it(`should use defaults when all the required parameters are present, when a custom 'injectionPoint' is used`, async function() {
      const swDest = tempy.file({extension: 'js'});
      const options = Object.assign({}, BASE_OPTIONS, {
        swDest,
        injectionPoint: 'self.__custom_injection_point',
        swSrc: upath.join(SW_SRC_DIR, 'custom-injection-point.js'),
      });

      const {count, filePaths, size, warnings} = await injectManifest(options);
      expect(warnings).to.be.empty;
      expect(count).to.eql(6);
      expect(size).to.eql(2604);
      expect(filePaths).to.have.members([swDest]);

      await validateServiceWorkerRuntime({
        entryPoint: 'injectManifest',
        swFile: swDest,
        expectedMethodCalls: {
          precacheAndRoute: [[[{
            url: 'index.html',
            revision: '3883c45b119c9d7e9ad75a1b4a4672ac',
          }, {
            url: 'page-1.html',
            revision: '544658ab25ee8762dc241e8b1c5ed96d',
          }, {
            url: 'page-2.html',
            revision: 'a3a71ce0b9b43c459cf58bd37e911b74',
          }, {
            url: 'styles/stylesheet-1.css',
            revision: '934823cbc67ccf0d67aa2a2eeb798f12',
          }, {
            url: 'styles/stylesheet-2.css',
            revision: '884f6853a4fc655e4c2dc0c0f27a227c',
          }, {
            url: 'webpackEntry.js',
            revision: '5b652181a25e96f255d0490203d3c47e',
          }]]],
        },
      });
    });

    it(`should support using the default 'injectionPoint' when precacheAndRoute() is called with options`, async function() {
      const swDest = tempy.file({extension: 'js'});
      const options = Object.assign({}, BASE_OPTIONS, {
        swDest,
        swSrc: upath.join(SW_SRC_DIR, 'precache-and-route-options.js'),
      });

      const {count, filePaths, size, warnings} = await injectManifest(options);
      expect(warnings).to.be.empty;
      expect(count).to.eql(6);
      expect(size).to.eql(2604);
      expect(filePaths).to.have.members([swDest]);

      await validateServiceWorkerRuntime({
        entryPoint: 'injectManifest',
        swFile: swDest,
        expectedMethodCalls: {
          precacheAndRoute: [[[{
            url: 'index.html',
            revision: '3883c45b119c9d7e9ad75a1b4a4672ac',
          }, {
            url: 'page-1.html',
            revision: '544658ab25ee8762dc241e8b1c5ed96d',
          }, {
            url: 'page-2.html',
            revision: 'a3a71ce0b9b43c459cf58bd37e911b74',
          }, {
            url: 'styles/stylesheet-1.css',
            revision: '934823cbc67ccf0d67aa2a2eeb798f12',
          }, {
            url: 'styles/stylesheet-2.css',
            revision: '884f6853a4fc655e4c2dc0c0f27a227c',
          }, {
            url: 'webpackEntry.js',
            revision: '5b652181a25e96f255d0490203d3c47e',
          }], {
            cleanURLs: true,
          }]],
        },
      });
    });

    it(`should ignore swSrc and swDest when generating manifest entries`, async function() {
      const tempDirectory = tempy.directory();
      await fse.copy(BASE_OPTIONS.globDirectory, tempDirectory);
      const swSrc = upath.join(tempDirectory, 'sw-src-service-worker.js');
      await fse.copyFile(upath.join(SW_SRC_DIR, 'basic.js'), swSrc);
      const swDest = upath.join(tempDirectory, 'sw-dest-service-worker.js');
      await fse.createFile(swDest);
      const options = Object.assign({}, BASE_OPTIONS, {
        swSrc,
        swDest,
        globDirectory: tempDirectory,
      });

      const {count, size, warnings} = await injectManifest(options);
      expect(warnings).to.be.empty;
      expect(count).to.eql(6);
      expect(size).to.eql(2604);
      await validateServiceWorkerRuntime({
        entryPoint: 'injectManifest',
        swFile: swDest,
        expectedMethodCalls: {
          precacheAndRoute: [[[{
            url: 'index.html',
            revision: '3883c45b119c9d7e9ad75a1b4a4672ac',
          }, {
            url: 'page-1.html',
            revision: '544658ab25ee8762dc241e8b1c5ed96d',
          }, {
            url: 'page-2.html',
            revision: 'a3a71ce0b9b43c459cf58bd37e911b74',
          }, {
            url: 'styles/stylesheet-1.css',
            revision: '934823cbc67ccf0d67aa2a2eeb798f12',
          }, {
            url: 'styles/stylesheet-2.css',
            revision: '884f6853a4fc655e4c2dc0c0f27a227c',
          }, {
            url: 'webpackEntry.js',
            revision: '5b652181a25e96f255d0490203d3c47e',
          }]]],
        },
      });
    });
  });

  describe(`[workbox-webpack-plugin] Sourcemap manipulation`, function() {
    it(`should update the sourcemap to account for manifest injection`, async function() {
      const outputDir = tempy.directory();
      const swSrc = upath.join(SW_SRC_DIR, 'basic-with-sourcemap.js.nolint');
      const swDest = upath.join(outputDir, 'basic-with-sourcemap.js');
      const sourcemapDest = upath.join(outputDir, 'basic-with-sourcemap.js.map');
      const options = Object.assign({}, BASE_OPTIONS, {
        swDest,
        swSrc,
      });

      const {count, filePaths, size, warnings} = await injectManifest(options);
      expect(warnings).to.be.empty;
      expect(count).to.eql(6);
      expect(size).to.eql(2604);
      expect(filePaths).to.have.members([swDest, sourcemapDest]);

      const actualSourcemap = await fse.readJSON(sourcemapDest);
      const expectedSourcemap = await fse.readJSON(
          upath.join(SW_SRC_DIR, '..', 'expected-source-map.js.map'));
      expect(actualSourcemap).to.eql(expectedSourcemap);

      // We can't validate the SW file contents.
    });
  });

  describe(`[workbox-build] removed options`, function() {
    // These were deprecated in v4, and formally removed in v5.
    const oldOptionsToValue = {
      dontCacheBustUrlsMatching: /ignored/,
      ignoreUrlParametersMatching: [/ignored/],
      modifyUrlPrefix: {
        ignored: 'ignored',
      },
      templatedUrls: {},
    };

    for (const [option, value] of Object.entries(oldOptionsToValue)) {
      it(`should fail validation when ${option} is used`, async function() {
        const options = Object.assign({}, BASE_OPTIONS, {
          [option]: value,
        });

        try {
          await injectManifest(options);
          throw new Error('Unexpected success.');
        } catch (error) {
          expect(error.name).to.eql('ValidationError');
          expect(error.details[0].context.key).to.eql(option);
        }
      });
    }
  });
});

const CACHE_NAME = "thenullsoft-offline";
const OFFLINE_VERSION = 1;
const OFFLINE_URL = "/offline/offline.html";

const filespaths = ['/about.html',
'/assets/css/blog.css',
'/assets/css/blog.css.map',
'/assets/css/features.css',
'/assets/css/features.css.map',
'/assets/css/footer.css',
'/assets/css/footer.css.map',
'/assets/css/globals.css',
'/assets/css/globals.css.map',
'/assets/css/header.css',
'/assets/css/header.css.map',
'/assets/css/home.css',
'/assets/css/home.css.map',
'/assets/css/newsletter.css',
'/assets/css/newsletter.css.map',
'/assets/images/api.png',
'/assets/images/cookie-bg.png',
'/assets/images/could-not-fetch.png',
'/assets/images/daraja.png',
'/assets/images/dmca-badge.png',
'/assets/images/enterprise-overview-hero.webp',
'/assets/images/google-page-speed.png',
'/assets/images/icons/android/android-launchericon-144-144.png',
'/assets/images/icons/android/android-launchericon-192-192.png',
'/assets/images/icons/android/android-launchericon-48-48.png',
'/assets/images/icons/android/android-launchericon-512-512.png',
'/assets/images/icons/android/android-launchericon-72-72.png',
'/assets/images/icons/android/android-launchericon-96-96.png',
'/assets/images/icons/android-chrome-192x192.png',
'/assets/images/icons/android-chrome-512x512.png',
'/assets/images/icons/apple-touch-icon.png',
'/assets/images/icons/favicon-16x16.png',
'/assets/images/icons/favicon-32x32.png',
'/assets/images/icons/favicon.ico',
'/assets/images/icons/ios/100.png',
'/assets/images/icons/ios/1024.png',
'/assets/images/icons/ios/114.png',
'/assets/images/icons/ios/120.png',
'/assets/images/icons/ios/128.png',
'/assets/images/icons/ios/144.png',
'/assets/images/icons/ios/152.png',
'/assets/images/icons/ios/16.png',
'/assets/images/icons/ios/167.png',
'/assets/images/icons/ios/180.png',
'/assets/images/icons/ios/192.png',
'/assets/images/icons/ios/20.png',
'/assets/images/icons/ios/256.png',
'/assets/images/icons/ios/29.png',
'/assets/images/icons/ios/32.png',
'/assets/images/icons/ios/40.png',
'/assets/images/icons/ios/50.png',
'/assets/images/icons/ios/512.png',
'/assets/images/icons/ios/57.png',
'/assets/images/icons/ios/58.png',
'/assets/images/icons/ios/60.png',
'/assets/images/icons/ios/64.png',
'/assets/images/icons/ios/72.png',
'/assets/images/icons/ios/76.png',
'/assets/images/icons/ios/80.png',
'/assets/images/icons/ios/87.png',
'/assets/images/icons/site.webmanifest',
'/assets/images/icons/windows11/LargeTile.scale-100.png',
'/assets/images/icons/windows11/LargeTile.scale-125.png',
'/assets/images/icons/windows11/LargeTile.scale-150.png',
'/assets/images/icons/windows11/LargeTile.scale-200.png',
'/assets/images/icons/windows11/LargeTile.scale-400.png',
'/assets/images/icons/windows11/SmallTile.scale-100.png',
'/assets/images/icons/windows11/SmallTile.scale-125.png',
'/assets/images/icons/windows11/SmallTile.scale-150.png',
'/assets/images/icons/windows11/SmallTile.scale-200.png',
'/assets/images/icons/windows11/SmallTile.scale-400.png',
'/assets/images/icons/windows11/SplashScreen.scale-100.png',
'/assets/images/icons/windows11/SplashScreen.scale-125.png',
'/assets/images/icons/windows11/SplashScreen.scale-150.png',
'/assets/images/icons/windows11/SplashScreen.scale-200.png',
'/assets/images/icons/windows11/SplashScreen.scale-400.png',
'/assets/images/icons/windows11/Square150x150Logo.scale-100.png',
'/assets/images/icons/windows11/Square150x150Logo.scale-125.png',
'/assets/images/icons/windows11/Square150x150Logo.scale-150.png',
'/assets/images/icons/windows11/Square150x150Logo.scale-200.png',
'/assets/images/icons/windows11/Square150x150Logo.scale-400.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-16.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-20.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-24.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-256.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-30.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-32.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-36.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-40.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-44.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-48.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-60.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-64.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-72.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-80.png',
'/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-96.png',
'/assets/images/icons/windows11/Square44x44Logo.scale-100.png',
'/assets/images/icons/windows11/Square44x44Logo.scale-125.png',
'/assets/images/icons/windows11/Square44x44Logo.scale-150.png',
'/assets/images/icons/windows11/Square44x44Logo.scale-200.png',
'/assets/images/icons/windows11/Square44x44Logo.scale-400.png',
'/assets/images/icons/windows11/Square44x44Logo.targetsize-16.png',
'/assets/images/icons/windows11/Square44x44Logo.targetsize-20.png',
'/assets/images/icons/windows11/Square44x44Logo.targetsize-24.png',
'/assets/images/icons/windows11/Square44x44Logo.targetsize-256.png',
'/assets/images/icons/windows11/Square44x44Logo.targetsize-30.png',
'/assets/images/icons/windows11/Square44x44Logo.targetsize-32.png',
'/assets/images/icons/windows11/Square44x44Logo.targetsize-36.png',
'/assets/images/icons/windows11/Square44x44Logo.targetsize-40.png',
'/assets/images/icons/windows11/Square44x44Logo.targetsize-44.png',
'/assets/images/icons/windows11/Square44x44Logo.targetsize-48.png',
'/assets/images/icons/windows11/Square44x44Logo.targetsize-60.png',
'/assets/images/icons/windows11/Square44x44Logo.targetsize-64.png',
'/assets/images/icons/windows11/Square44x44Logo.targetsize-72.png',
'/assets/images/icons/windows11/Square44x44Logo.targetsize-80.png',
'/assets/images/icons/windows11/Square44x44Logo.targetsize-96.png',
'/assets/images/icons/windows11/StoreLogo.scale-100.png',
'/assets/images/icons/windows11/StoreLogo.scale-125.png',
'/assets/images/icons/windows11/StoreLogo.scale-150.png',
'/assets/images/icons/windows11/StoreLogo.scale-200.png',
'/assets/images/icons/windows11/StoreLogo.scale-400.png',
'/assets/images/icons/windows11/Wide310x150Logo.scale-100.png',
'/assets/images/icons/windows11/Wide310x150Logo.scale-125.png',
'/assets/images/icons/windows11/Wide310x150Logo.scale-150.png',
'/assets/images/icons/windows11/Wide310x150Logo.scale-200.png',
'/assets/images/icons/windows11/Wide310x150Logo.scale-400.png',
'/assets/images/jumbone.jpg',
'/assets/images/jumbthree.jpg',
'/assets/images/jumbtwo.jpg',
'/assets/images/kibet.png',
'/assets/images/null-api.png',
'/assets/images/php-sql-connect.png',
'/assets/images/preloader.gif',
'/assets/images/rehema-min.png',
'/assets/images/rehemaone.png',
'/assets/images/semiconductor.png',
'/assets/images/wolve.png',
'/assets/scss/blog.scss',
'/assets/scss/features.scss',
'/assets/scss/footer.scss',
'/assets/scss/globals.scss',
'/assets/scss/header.scss',
'/assets/scss/home.scss',
'/assets/scss/newsletter.scss',
'/assets/svg/envelop.svg',
'/assets/svg/facebook.svg',
'/assets/svg/glow-blue-02.svg',
'/assets/svg/glow-purple-02.svg',
'/assets/svg/quote-gray.svg',
'/assfiles.md',
'/auth/register.html',
'/blog.html',
'/contact.html',
'/cron-logs.json',
'/data/blogs.json',
'/features.html',
'/index.html',
'/js/fuse-search.js',
'/js/libs/fuse.js',
'/js/libs/workbox-v5/workbox-background-sync.dev.js',
'/js/libs/workbox-v5/workbox-background-sync.dev.js.map',
'/js/libs/workbox-v5/workbox-background-sync.prod.js',
'/js/libs/workbox-v5/workbox-background-sync.prod.js.map',
'/js/libs/workbox-v5/workbox-broadcast-update.dev.js',
'/js/libs/workbox-v5/workbox-broadcast-update.dev.js.map',
'/js/libs/workbox-v5/workbox-broadcast-update.prod.js',
'/js/libs/workbox-v5/workbox-broadcast-update.prod.js.map',
'/js/libs/workbox-v5/workbox-cacheable-response.dev.js',
'/js/libs/workbox-v5/workbox-cacheable-response.dev.js.map',
'/js/libs/workbox-v5/workbox-cacheable-response.prod.js',
'/js/libs/workbox-v5/workbox-cacheable-response.prod.js.map',
'/js/libs/workbox-v5/workbox-core.dev.js',
'/js/libs/workbox-v5/workbox-core.dev.js.map',
'/js/libs/workbox-v5/workbox-core.prod.js',
'/js/libs/workbox-v5/workbox-core.prod.js.map',
'/js/libs/workbox-v5/workbox-expiration.dev.js',
'/js/libs/workbox-v5/workbox-expiration.dev.js.map',
'/js/libs/workbox-v5/workbox-expiration.prod.js',
'/js/libs/workbox-v5/workbox-expiration.prod.js.map',
'/js/libs/workbox-v5/workbox-navigation-preload.dev.js',
'/js/libs/workbox-v5/workbox-navigation-preload.dev.js.map',
'/js/libs/workbox-v5/workbox-navigation-preload.prod.js',
'/js/libs/workbox-v5/workbox-navigation-preload.prod.js.map',
'/js/libs/workbox-v5/workbox-offline-ga.dev.js',
'/js/libs/workbox-v5/workbox-offline-ga.dev.js.map',
'/js/libs/workbox-v5/workbox-offline-ga.prod.js',
'/js/libs/workbox-v5/workbox-offline-ga.prod.js.map',
'/js/libs/workbox-v5/workbox-precaching.dev.js',
'/js/libs/workbox-v5/workbox-precaching.dev.js.map',
'/js/libs/workbox-v5/workbox-precaching.prod.js',
'/js/libs/workbox-v5/workbox-precaching.prod.js.map',
'/js/libs/workbox-v5/workbox-range-requests.dev.js',
'/js/libs/workbox-v5/workbox-range-requests.dev.js.map',
'/js/libs/workbox-v5/workbox-range-requests.prod.js',
'/js/libs/workbox-v5/workbox-range-requests.prod.js.map',
'/js/libs/workbox-v5/workbox-routing.dev.js',
'/js/libs/workbox-v5/workbox-routing.dev.js.map',
'/js/libs/workbox-v5/workbox-routing.prod.js',
'/js/libs/workbox-v5/workbox-routing.prod.js.map',
'/js/libs/workbox-v5/workbox-strategies.dev.js',
'/js/libs/workbox-v5/workbox-strategies.dev.js.map',
'/js/libs/workbox-v5/workbox-strategies.prod.js',
'/js/libs/workbox-v5/workbox-strategies.prod.js.map',
'/js/libs/workbox-v5/workbox-streams.dev.js',
'/js/libs/workbox-v5/workbox-streams.dev.js.map',
'/js/libs/workbox-v5/workbox-streams.prod.js',
'/js/libs/workbox-v5/workbox-streams.prod.js.map',
'/js/libs/workbox-v5/workbox-sw.js',
'/js/libs/workbox-v5/workbox-sw.js.map',
'/js/libs/workbox-v5/workbox-window.dev.es5.mjs',
'/js/libs/workbox-v5/workbox-window.dev.es5.mjs.map',
'/js/libs/workbox-v5/workbox-window.dev.mjs',
'/js/libs/workbox-v5/workbox-window.dev.mjs.map',
'/js/libs/workbox-v5/workbox-window.dev.umd.js',
'/js/libs/workbox-v5/workbox-window.dev.umd.js.map',
'/js/libs/workbox-v5/workbox-window.prod.es5.mjs',
'/js/libs/workbox-v5/workbox-window.prod.es5.mjs.map',
'/js/libs/workbox-v5/workbox-window.prod.mjs',
'/js/libs/workbox-v5/workbox-window.prod.mjs.map',
'/js/libs/workbox-v5/workbox-window.prod.umd.js',
'/js/libs/workbox-v5/workbox-window.prod.umd.js.map',
'/js/main.js',
'/LICENSE',
'/manifest.json',
'/meta.html',
'/offline/offline.html',
'/offline/offpages.html',
'/privacy.html',
'/README.md',
'/service-worker.js',
'/sw.js',
'/test.js',
'/tos.html'];

self.addEventListener("install", event => {
  console.log(`${CACHE_NAME} installing…`);
  console.log("Caching:", filespaths);
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(filespaths))
  );
});

self.addEventListener("activate", event => {
  console.log(`${CACHE_NAME} now ready to handle fetches!`);

  // Remove old caches
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(cacheName) {
            return cacheName !== CACHE_NAME;
          })
          .map(function(cacheName) {
            console.log(`deleting ${cacheName}`);
            return caches.delete(cacheName);
          })
      );
    })
  );
});

//offline page
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }
        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        let currUrl = new URL(event.request.url)
        const cache = await caches.open(CACHE_NAME);
        if(!filespaths.includes(currUrl.pathname)){
            const cachedResponse = await cache.match(OFFLINE_URL);
            return cachedResponse;
        } else {
            const cachresp = await cache.match(event.request);
            return cachresp;
        }
      }
    })());
  }
});


// handle push notifications
// self.addEventListener('push', ...... );
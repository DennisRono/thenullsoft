const CACHE_NAME = "thenullsoft-offline";
const OFFLINE_VERSION = 1;
const OFFLINE_URL = "/offline/offline.html";

const filespaths = ['/about.html',
'/assets/css/blog.css',
'/assets/css/features.css',
'/assets/css/footer.css',
'/assets/css/globals.css',
'/assets/css/header.css',
'/assets/css/home.css',
'/assets/css/newsletter.css',
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
'/features.html',
'/index.html',
'/js/fuse-search.js',
'/js/libs/fuse.js',
'/js/main.js',
'/manifest.json',
'/offline/offline.html',
'/offline/offpages.html',
'/privacy.html',
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
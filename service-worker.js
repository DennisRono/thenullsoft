const CACHE_NAME = "thenullsoft-offline";
const OFFLINE_VERSION = 1;
const OFFLINE_URL = "/offline/offline.html";

const filesToCache = 
  [
    "/index.html",
    "/about.html",
    "/features.html",
    "/privacy.html",
    "/tos.html",
    "/offline/offpages.html",
    "/js/main.js",
    "/js/fuse-search.js",
    "/js/libs/fuse.js",
    "/offline/offline.html",
    "/offline/offline.css",
    "/assets/css/blog.css",
    "/assets/css/features.css",
    "/assets/css/footer.css",
    "/assets/css/globals.css",
    "/assets/css/header.css",
    "/assets/css/home.css",
    "/assets/css/newsletter.css",
    "/assets/images/cookie-bg.png",
    "/assets/images/dmca-badge.png",
    "/assets/images/enterprise-overview-hero.webp",
    "/assets/images/google-page-speed.png",
    "/assets/images/icons/favicon-16x16.png",
    "/assets/images/icons/favicon-32x32.png",
    "/assets/images/icons/favicon.ico",
    "/assets/images/icons/apple-touch-icon.png"
  ];

self.addEventListener("install", event => {
  console.log(`${CACHE_NAME} installing…`);
  console.log("Caching:", filesToCache);
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(filesToCache))
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
            // Return true if you want to remove this cache,
            // but remember that caches are shared across
            // the whole origin
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

// state-while-revalidate strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        // fetch latest resources and update cache in the background
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });

        // respond with cache first if available
        return response || fetchPromise;
      });
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
        console.log('Fetch failed; returning offline page instead.', error);
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return cachedResponse;
      }
    })());
  }
});

// handle push notifications
// self.addEventListener('push', ...... );
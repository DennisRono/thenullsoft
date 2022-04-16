const CACHE_NAME = "thenullsoft-offline";
const OFFLINE_VERSION = 1;
const OFFLINE_URL = "/offline/offline.html";

const filesToCache = 
  [
    "/offline/offline.html",
    "/assets/images/icons/favicon.ico"
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

console.log(window.location.href);

//offline page
self.addEventListener('fetch', (event) => {
  console.log(event.request.mode);
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
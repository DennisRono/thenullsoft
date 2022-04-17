import filespaths from './files.js'

const CACHE_NAME = "thenullsoft-offline";
const OFFLINE_VERSION = 1;
const OFFLINE_URL = "/offline/offline.html";

var offlineExclude = [
    '/contact.html','/blog.html'
];

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
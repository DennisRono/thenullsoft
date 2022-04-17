const CACHE_NAME = "thenullsoft-offline";
const OFFLINE_VERSION = 1;
const OFFLINE_URL = "/offline/offline.html";

const filesToCache = 
  [
    '/index.html','/about.html','/privacy.html','/features.html','/tos.html',
    '/assets/css/home.css','/assets/css/header.css','/assets/css/footer.css','/assets/css/newsletter.css','/assets/css/globals.css',
    '/assets/css/features.css','/assets/css/blog.css',
    '/assets/images/enterprise-overview-hero.webp',
    '/js/main.js',
    '/offline/offline.html'
  ];
var offlineExclude = [
    '/contact.html','/blog.html'
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
  if (event.request.mode === 'GET') {
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
        if(!filesToCache.includes(currUrl.pathname)){
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
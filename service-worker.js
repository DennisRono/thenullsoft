const CACHE_NAME = "thenullsoft-offline";
const OFFLINE_VERSION = 1;
const OFFLINE_URL = "/offline/offline.html";

const filesToCache = 
  [
    "/",
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
        console.log('Fetch failed; returning offline page instead.', error);
        const cache = await caches.open(CACHE_NAME);
        console.log(self.location.pathname);
        if(self.location.pathname === '/blog.html'){
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        } else {
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
        }
      }
    })());
  }
});

self.addEventListener( 'fetch', function ( event ) {

  if ( event.request.url.match( '^.*(\/blog\/).*$' ) ) {
      return false;
  }
   // OR

  if ( event.request.url.indexOf( '/blog/' ) !== -1 ) {
      return false;
  }
  //    **** rest of your service worker code ****
})
// handle push notifications
// self.addEventListener('push', ...... );
const CACHE_NAME = "thenullsoft-offline";
const OFFLINE_VERSION = 1;
const OFFLINE_URL = "/offline/offline.html";

var offlineInclude = [
    'index.html','about.html','privacy.html','features.html','tos.html',              // index.html
    '/assets/',
    '/js/',
    '/offline/'
];

var offlineExclude = [
    '/networkimages/bigimg.png',   //exclude a file
    '/networkimages/smallimg.png',
    '/auth/',
    'contact.html','blog.html'
];

self.addEventListener("install", event => {
    console.log(`${CACHE_NAME} installing…`);
    console.log("Caching:", offlineInclude);
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => cache.addAll(offlineInclude))
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

self.addEventListener("fetch", function(event) {
  console.log('WORKER: fetch event in progress.');
  if (event.request.method !== 'GET') {
    console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
    return;
  }
  for (let i = 0; i < offlineExclude.length; i++)
  {
    if (event.request.url.indexOf(offlineExclude[i]) !== -1)
    {
        const cache = await caches.open(CACHE_NAME);
        console.log('WORKER: fetch event ignored. URL in exclude list.', event.request.url);
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
})
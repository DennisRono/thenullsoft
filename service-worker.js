const CACHE_NAME = "thenullsoft-offline";
const OFFLINE_VERSION = 1;
const OFFLINE_URL = "/offline/offline.html";

const filespaths = ['/about.html',
'/assets/css/blog.css',
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
'/assets/svg/envelop.svg',
'/assets/svg/facebook.svg',
'/assets/svg/glow-blue-02.svg',
'/assets/svg/glow-purple-02.svg',
'/assets/svg/quote-gray.svg',
'/index.php',
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
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(filespaths))
  );
});

self.addEventListener('activate', function () {
  clients.claim();
  console.log('Now ready to handle fetches!');
});

self.addEventListener('fetch', function (evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromNetwork(evt.request, 6000).catch(function () {
    return fromCache(evt, evt.request);
  }));
});

function fromNetwork(request, timeout) {
  console.log('fromNetwork');
  return new Promise(function (fulfill, reject) {
    var timeoutId = setTimeout(reject, timeout);
    fetch(request).then(function (response) {
      clearTimeout(timeoutId);
      fulfill(response);
    }, reject);
  });
}

function fromCache(event, request) {
  console.log('fromCache');
  return caches.open(CACHE_NAME).then(function (cache) {
    let currUrl = new URL(event.request.url)
    if(!filespaths.includes(currUrl.pathname)){
        return cache.match(OFFLINE_URL).then((offpage)=>{
          return offpage || fetch(event.request);
        });
    } else {
      return cache.match(request).then(function (matching) {
        return matching  || fetch(event.request);
      });
    }
  });
}

//cache aricle page from user
// document.querySelector('.cache-article').addEventListener('click', function(event) {
//   event.preventDefault();
//   caches.open(CACHE_NAME).then(cache => cache.addAll([event.request.url]));
// });


// handle push notifications
// self.addEventListener('push', ...... );
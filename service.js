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

self.addEventListener("install", function(event) {
  console.log('WORKER: install event in progress.');
  event.waitUntil(
    caches
      .open(version + 'fundamentals')
      .then(function(cache) {
        return cache.addAll(offlineInclude);
      })
      .then(function() {
        console.log('WORKER: install completed');
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
      console.log('WORKER: fetch event ignored. URL in exclude list.', event.request.url);
      return false;
    }
  }
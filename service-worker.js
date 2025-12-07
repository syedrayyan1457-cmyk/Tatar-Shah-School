const CACHE_NAME = 'tatar-shell-v1';
const PRECACHE_URLS = [
  '/index.html',
  '/',
  '/manifest.json'
  /* add other static assets if you add them (CSS file, icons...) */
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // For navigation requests, prefer cache first
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html').then(resp => resp || fetch(req))
    );
    return;
  }

  // Try cache, fallback to network
  event.respondWith(
    caches.match(req).then(cacheResp => {
      if (cacheResp) return cacheResp;
      return fetch(req).then(netResp => {
        // Optionally cache same-origin GET responses (images/icons)
        if (req.method === 'GET' && req.url.startsWith(self.location.origin)) {
          caches.open(CACHE_NAME).then(cache => cache.put(req, netResp.clone()));
        }
        return netResp;
      }).catch(()=> {
        // fallback could be a generic offline image or page
        return caches.match('/index.html');
      });
    })
  );
});
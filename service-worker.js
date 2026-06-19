const CACHE_NAME = 'agamoon-v6';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                '/MoonWebsite/index.html',
                '/MoonWebsite/style.css',
                '/MoonWebsite/manifest.json',
                '/MoonWebsite/img/LogoWebSite.png'
            ]);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(() => {
                return caches.match('/MoonWebsite/index.html');
            })
    );
});
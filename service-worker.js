const CACHE_NAME = 'agamoon-v4';

// Version simplifiée pour éviter les erreurs 404
const FILES_TO_CACHE = [
    '/MoonWebsite/index.html',
    '/MoonWebsite/style.css',
    '/MoonWebsite/manifest.json',
    '/MoonWebsite/img/LogoWebSite.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Cache ouvert');
                return cache.addAll(FILES_TO_CACHE);
            })
            .catch(err => console.error('[SW] Erreur cache:', err))
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
                if (event.request.destination === 'document') {
                    return caches.match('/MoonWebsite/index.html');
                }
            })
    );
});
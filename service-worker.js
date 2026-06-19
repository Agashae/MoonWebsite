const CACHE_NAME = 'agamoon-v3'; // On incrémente pour forcer la mise à jour

// Fichiers à mettre en cache pour le mode hors-ligne
const FILES_TO_CACHE = [
    '/MoonWebsite/',
    '/MoonWebsite/index.html',
    '/MoonWebsite/style.css',
    '/MoonWebsite/manifest.json',
    '/MoonWebsite/img/LogoWebSite.png',
    
    // Images générales (Missions) - avec le bon nom de dossier
    '/MoonWebsite/img/Images générales/photo-1657637760839-772d81f3e334.jpg',
    '/MoonWebsite/img/Images générales/moon-29.gif',
    '/MoonWebsite/img/Images générales/Luna2.jpg',
    '/MoonWebsite/img/Images générales/Luna9.jpg',
    '/MoonWebsite/img/Images générales/Apollo11.jpg',
    '/MoonWebsite/img/Images générales/Apollo17.jpg',
    '/MoonWebsite/img/Images générales/artemis-3.jpg',
    '/MoonWebsite/img/Images générales/Chandrayaan-3.jpg',
    '/MoonWebsite/img/Images générales/Chang\'e 4.jpg',
    '/MoonWebsite/img/Images générales/TheHuntforArtemis.jpeg',
    '/MoonWebsite/img/Images générales/bg-minimalist.jpg',
    
    // 8 Phases
    '/MoonWebsite/img/8Phases/lune-libration-phases.gif',
    '/MoonWebsite/img/8Phases/phase-nouvelle-lune.jpg',
    '/MoonWebsite/img/8Phases/premier-croissant.jpg',
    '/MoonWebsite/img/8Phases/phase-premier-quartier.jpg',
    '/MoonWebsite/img/8Phases/phase-gibbeuse-croissante.jpg',
    '/MoonWebsite/img/8Phases/phase-pleine-lune.jpg',
    '/MoonWebsite/img/8Phases/phase-gibbeuse-decroissante.jpg',
    '/MoonWebsite/img/8Phases/phase-dernier-quartier.jpg',
    '/MoonWebsite/img/8Phases/dernier-croissant.jpg',
    
    // Transparent (Planètes)
    '/MoonWebsite/img/Transparent/earth.png',
    '/MoonWebsite/img/Transparent/Jupiter.png',
    '/MoonWebsite/img/Transparent/Mars.webp',
    '/MoonWebsite/img/Transparent/Mercure.webp',
    '/MoonWebsite/img/Transparent/MoonTransparent.png',
    '/MoonWebsite/img/Transparent/Neptune.webp',
    '/MoonWebsite/img/Transparent/Pluton.webp',
    '/MoonWebsite/img/Transparent/Saturn_from_Hubble.png',
    '/MoonWebsite/img/Transparent/Uranus.png',
    '/MoonWebsite/img/Transparent/Venus-PNG-Background.png',
];

// Installation : on met tout en cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Mise en cache des fichiers...');
            return cache.addAll(FILES_TO_CACHE).catch((err) => {
                console.error('[SW] Erreur de cache :', err);
            });
        })
    );
    self.skipWaiting();
});

// Activation : on supprime les anciens caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) =>
            Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[SW] Suppression ancien cache :', key);
                        return caches.delete(key);
                    }
                })
            )
        )
    );
    self.clients.claim();
});

// Fetch : cache d'abord, réseau ensuite (offline-first)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response; // Servi depuis le cache
            }
            return fetch(event.request).then((networkResponse) => {
                // On met aussi en cache les nouvelles ressources (ex: photos perso si chargées)
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Hors-ligne et pas en cache : page de fallback
                if (event.request.destination === 'document') {
                    return caches.match('/MoonWebsite/index.html');
                }
            });
        })
    );
});
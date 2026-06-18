const CACHE_NAME = 'agamoon-v2'; // On passe en v2 pour forcer la mise à jour !

// Fichiers à mettre en cache pour le mode hors-ligne
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/manifest.json',
    '/img/LogoWebSite.png',
    
    // Images générales (Missions)
    '/img/Images generales/photo-1657637760839-772d81f3e334.jpg',
    '/img/Images generales/moon-29.gif',
    '/img/Images generales/Luna2.jpg',
    '/img/Images generales/Luna9.jpg',
    '/img/Images generales/Apollo11.jpg',
    '/img/Images generales/Apollo17.jpg',
    '/img/Images generales/artemis-3.jpg',
    '/img/Images generales/Chandrayaan-3.jpg',
    "/img/Images generales/Chang'e 4.jpg",
    '/img/Images generales/TheHuntforArtemis.jpeg',
    '/img/Images generales/bg-minimalist.jpg',
    
    // 8 Phases
    '/img/8Phases/lune-libration-phases.gif',
    '/img/8Phases/phase-nouvelle-lune.jpg',
    '/img/8Phases/premier-croissant.jpg',
    '/img/8Phases/phase-premier-quartier.jpg',
    '/img/8Phases/phase-gibbeuse-croissante.jpg',
    '/img/8Phases/phase-pleine-lune.jpg',
    '/img/8Phases/phase-gibbeuse-decroissante.jpg',
    '/img/8Phases/phase-dernier-quartier.jpg',
    '/img/8Phases/dernier-croissant.jpg',
    
    // Transparent (Planètes)
    '/img/Transparent/earth.png',
    '/img/Transparent/Jupiter.png',
    '/img/Transparent/Mars.webp',
    '/img/Transparent/Mercure.webp',
    '/img/Transparent/MoonTransparent.png',
    '/img/Transparent/Neptune.webp',
    '/img/Transparent/Pluton.webp',
    '/img/Transparent/Saturn_from_Hubble.png',
    '/img/Transparent/Uranus.png',
    '/img/Transparent/Venus-PNG-Background.png',
];

// Installation : on met tout en cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Mise en cache des fichiers...');
            return cache.addAll(FILES_TO_CACHE);
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
                if (networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Hors-ligne et pas en cache : page de fallback
                if (event.request.destination === 'document') {
                    return caches.match('/index.html');
                }
            });
        })
    );
});
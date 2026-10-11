/* offline cache so the installed app opens without network */
const CACHE = 'soar-v2';
const CORE = ['./', 'index.html', 'styles.css', 'app.js', 'editor.js', 'manifest.webmanifest', 'vendor/qrcode.js', 'vendor/leaflet/leaflet.js', 'vendor/leaflet/leaflet.css',
  'assets/hero.jpg', 'assets/case.jpg', 'assets/watch.jpg', 'assets/rider.jpg', 'assets/bikers.jpg', 'assets/paraglider.jpg',
  'assets/skydiver.jpg', 'assets/creator.jpg', 'assets/kiosk.jpg', 'assets/sunset.jpg', 'assets/dronecan.jpg', 'assets/icon-192.png', 'assets/icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return; // map tiles etc go straight to network
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; }).catch(() => caches.match('index.html'))));
});

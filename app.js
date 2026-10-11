/* Red Bull SOAR companion app (vanilla JS, no build step) */
'use strict';

/* ------------------------------------------------------------------ icons */
const ICONS = {
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  drone: '<circle cx="5" cy="5" r="3"/><circle cx="19" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><rect x="9" y="9" width="6" height="6" rx="1.5"/><path d="M7 7l2 2M17 7l-2 2M7 17l2-2M17 17l-2-2"/>',
  film: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 4v16M17 4v16M2 9h5M17 9h5M2 15h5M17 15h5"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  pulse: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  watch: '<circle cx="12" cy="12" r="6"/><path d="M12 10v2l1 1M16.13 7.66l-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05M7.88 16.36l.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05"/>',
  play: '<path d="M6 3l14 9-14 9z" fill="currentColor"/>',
  pause: '<path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"/>',
  gauge: '<path d="M12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"/>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  type: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  ratio: '<rect x="6" y="2" width="12" height="20" rx="2"/>',
  sparkles: '<path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  battery: '<rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2M6 10v4M10 10v4"/>',
  signal: '<circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/>',
  rth: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  msg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  back: '<path d="M15 18l-6-6 6-6"/>',
  next: '<path d="M9 18l6-6-6-6"/>',
  x: '<path d="M18 6L6 18M6 6l12 12"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  orbit: '<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
  zap: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
  mountain: '<path d="M8 3l4 8 5-5 5 15H2L8 3z"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',
  trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  qr: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM18 18h3v3h-3z"/>',
  star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
  wind: '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2"/>',
  up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  nav: '<path d="M3 11l19-9-9 19-2-8-8-2z"/>',
  bt: '<path d="M7 7l10 10-5 5V2l5 5L7 17"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  locate: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
  folder: '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2M13 17v2M13 11v2"/>',
  snow: '<path d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07L19.07 4.93"/>',
  water: '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
  bike: '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 17.5V14l-3-3 4-3 2 3h2"/>',
  crown: '<path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zM5 20h14"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  hand: '<path d="M18 11V6a2 2 0 0 0-4 0v1M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
};
const icon = (n, cls = '') => `<svg class="svg ${cls}" viewBox="0 0 24 24">${ICONS[n] || ''}</svg>`;
function hydrateIcons(root = document) {
  root.querySelectorAll('svg[data-i]').forEach(s => { s.setAttribute('viewBox', '0 0 24 24'); s.innerHTML = ICONS[s.dataset.i] || ''; });
}

/* ------------------------------------------------------------------ helpers */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const A = 'assets/';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtK = n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(n >= 1e4 ? 0 : 1) + 'K' : String(n);
const inr = n => 'Rs ' + n.toLocaleString('en-IN');
const rupee = n => '₹' + n.toLocaleString('en-IN');
const uid = () => Math.random().toString(36).slice(2, 8).toUpperCase();
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const timeAgo = ts => { const s = (Date.now() - ts) / 1000; if (s < 60) return 'just now'; if (s < 3600) return Math.floor(s / 60) + ' min ago'; if (s < 86400) return Math.floor(s / 3600) + ' h ago'; return Math.floor(s / 86400) + ' d ago'; };

/* ------------------------------------------------------------------ storage */
const KEY = 'soar_app_v1';
const DEFAULT = {
  onboarded: false, name: 'Arjun', handle: '@arjun.rides',
  settings: { trigger: true, safe: true, autoDl: true, notif: true, slowAtPeak: true, threshold: 125, maxAlt: 60, follow: 8, units: 'metric' },
  posts: [], likes: {}, saves: {}, follows: { 'nomad.tara': true }, comments: {},
  bookings: [], peaks: [], cart: [], checklist: {}, reels: [],
  stats: { flights: 23, km: 148, reels: 9, peak: 151 },
  watch: null, notifs: [],
};
let S;
try { S = Object.assign(structuredClone(DEFAULT), JSON.parse(localStorage.getItem(KEY) || '{}')); S.settings = Object.assign({}, DEFAULT.settings, S.settings); }
catch (e) { S = structuredClone(DEFAULT); }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('Storage is full. Old posts may not be saved.'); } }

/* tiny IndexedDB for video blobs */
const DB = (() => {
  let dbp;
  const open = () => dbp || (dbp = new Promise((res, rej) => {
    if (!('indexedDB' in window)) return rej('no idb');
    const r = indexedDB.open('soar-media', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('blobs');
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  }));
  const tx = (mode, fn) => open().then(db => new Promise((res, rej) => { const t = db.transaction('blobs', mode); const st = t.objectStore('blobs'); const q = fn(st); t.oncomplete = () => res(q && q.result); t.onerror = () => rej(t.error); }));
  return { put: (k, v) => tx('readwrite', s => s.put(v, k)), get: k => tx('readonly', s => s.get(k)), del: k => tx('readwrite', s => s.delete(k)) };
})();
const urlCache = {};
async function blobURL(key) { if (urlCache[key]) return urlCache[key]; const b = await DB.get(key).catch(() => null); if (!b) return null; return (urlCache[key] = URL.createObjectURL(b)); }
async function hydrateMedia(root) {
  for (const el of $$('[data-key]', root)) { const u = await blobURL(el.dataset.key); if (u) { el.src = u; } else if (el.tagName === 'VIDEO') { el.replaceWith(Object.assign(document.createElement('div'), { className: 'empty', textContent: 'Video no longer on this device' })); } }
}

/* ------------------------------------------------------------------ seed data */
const PEOPLE = {
  'spiti.line': { name: 'Kabir S.', img: 'rider.jpg' },
  'airdrift': { name: 'Meera K.', img: 'paraglider.jpg' },
  'freefall.raj': { name: 'Raj M.', img: 'skydiver.jpg' },
  'trailpair': { name: 'Ana & Dev', img: 'bikers.jpg' },
  'nomad.tara': { name: 'Tara N.', img: 'creator.jpg' },
  'peak.story': { name: 'Ishaan R.', img: 'sunset.jpg' },
};
const SEED_POSTS = [
  { id: 'p1', who: 'spiti.line', img: 'rider.jpg', bpm: 151, sport: 'Bike', loc: 'Khardung La, Ladakh', likes: 2140, cap: 'Khardung La at sunrise. SOAR caught the exact second my heart hit 151. Did not touch my phone once.', tags: ['EarnYourWings', 'AdrenalineTrigger'], ts: Date.now() - 3.6e6 * 2 },
  { id: 'p2', who: 'airdrift', img: 'paraglider.jpg', bpm: 138, sport: 'Air', loc: 'Bir Billing', likes: 1820, cap: 'First solo glide. My hands were on the brakes, SOAR was on me. Slow motion on the take-off is unreal.', tags: ['EarnYourWings', 'BirBilling'], ts: Date.now() - 3.6e6 * 5 },
  { id: 'p3', who: 'freefall.raj', img: 'skydiver.jpg', bpm: 164, sport: 'Air', loc: 'Mysuru drop zone', likes: 3310, cap: 'Jumped. Screamed. 164 bpm. SOAR switched to slow motion by itself and I have the whole scream in 4x.', tags: ['HeartbeatChallenge'], ts: Date.now() - 3.6e6 * 9 },
  { id: 'p4', who: 'trailpair', img: 'bikers.jpg', bpm: 129, sport: 'Bike', loc: 'Spiti Valley', likes: 960, cap: 'Two bikes, one SOAR, zero fights about who films. Route Lock followed the whole switchback.', tags: ['RouteLock', 'Spiti'], ts: Date.now() - 3.6e6 * 20 },
  { id: 'p5', who: 'nomad.tara', img: 'creator.jpg', bpm: 112, sport: 'Trek', loc: 'Kaza', likes: 1210, cap: 'Sorting three days of Spiti reels on a rock. Instant Reel did most of it before chai.', tags: ['SOARWall'], ts: Date.now() - 3.6e6 * 30 },
  { id: 'p6', who: 'peak.story', img: 'sunset.jpg', bpm: 121, sport: 'Trek', loc: 'Triund', likes: 870, cap: 'Hero Reveal at 5:52 am. Pulled back off the ridge and the whole valley lit up.', tags: ['HeroReveal'], ts: Date.now() - 3.6e6 * 44 },
];
const SPOTS = [
  { id: 's1', name: 'Bir Billing paragliding', city: 'Bir', act: 'Paragliding', img: 'paraglider.jpg', rating: 4.9, reviews: 412, slots: ['07:30', '09:00', '10:30', '15:30'] },
  { id: 's2', name: 'Bungee and rafting point', city: 'Rishikesh', act: 'Bungee', img: 'kiosk.jpg', rating: 4.8, reviews: 655, slots: ['08:00', '10:00', '12:00', '14:00', '16:00'] },
  { id: 's3', name: 'Ladakh ride camp', city: 'Leh', act: 'Bike ride', img: 'bikers.jpg', rating: 4.9, reviews: 233, slots: ['06:00', '08:30', '16:30'] },
  { id: 's4', name: 'Spiti valley trail', city: 'Kaza', act: 'Bike ride', img: 'rider.jpg', rating: 4.7, reviews: 180, slots: ['07:00', '11:00', '16:00'] },
  { id: 's5', name: 'Skydive drop zone', city: 'Mysuru', act: 'Skydive', img: 'skydiver.jpg', rating: 4.9, reviews: 302, slots: ['07:00', '09:30', '12:00'] },
  { id: 's6', name: 'Sunrise ridge trek', city: 'Dharamshala', act: 'Trek', img: 'sunset.jpg', rating: 4.6, reviews: 141, slots: ['04:45', '05:15'] },
];
const PKGS = [
  { id: 'snap', name: 'Snapshot', desc: '15 to 30 second clip of your moment', price: 299 },
  { id: 'reel', name: 'Adventure Reel', desc: '60 second edited reel, slow motion at your peak', price: 499, tag: 'Most picked' },
  { id: 'prem', name: 'Premium', desc: 'Full raw footage, music, 3 reels, priority edit', price: 999 },
];
const DEMO_CLIPS = [
  { id: 'c1', title: 'Spiti ridge, chase', img: 'rider.jpg', dur: '0:48', bpm: 151, type: 'peak', when: 'Today, 6:12 am' },
  { id: 'c2', title: 'Ladakh camp, orbit', img: 'bikers.jpg', dur: '1:12', bpm: 133, type: 'clip', when: 'Yesterday' },
  { id: 'c3', title: 'Bir launch, reveal', img: 'paraglider.jpg', dur: '0:36', bpm: 138, type: 'peak', when: '2 days ago' },
  { id: 'c4', title: 'Freefall, slow motion', img: 'skydiver.jpg', dur: '0:22', bpm: 164, type: 'peak', when: 'Last week' },
  { id: 'c5', title: 'Triund sunrise', img: 'sunset.jpg', dur: '2:05', bpm: 118, type: 'photo', when: 'Last week' },
  { id: 'c6', title: 'Camp edit session', img: 'creator.jpg', dur: '0:30', bpm: 104, type: 'photo', when: 'Last week' },
];
const SHOP = [
  { id: 'soar', name: 'Red Bull SOAR', desc: 'Drone, 1 battery, can-shaped case, 1 year crash cover', price: 79999, img: 'hero.jpg' },
  { id: 'summit', name: 'SOAR Summit Edition', desc: '3 batteries, hard case, Concierge, Red Bull event pass', price: 119999, img: 'case.jpg' },
  { id: 'flymore', name: 'Fly More kit', desc: '2 extra batteries and a charging hub', price: 9999, img: 'dronecan.jpg' },
  { id: 'tag', name: 'SOAR Tag', desc: 'USB-C clip beacon, for when you ride without a watch', price: 2499, img: 'watch.jpg' },
];
const MODES = [
  { id: 'follow', name: 'Wingman Follow', desc: 'Stays behind you at your set distance' },
  { id: 'chase', name: 'Downhill Chase', desc: 'Low and fast, made with MTB riders' },
  { id: 'orbit', name: 'Drift Orbit', desc: 'Circles you, great for bikes and drifts' },
  { id: 'reveal', name: 'Cliff Reveal', desc: 'Pulls back and up to show the whole view' },
  { id: 'route', name: 'Route Lock', desc: 'Flies the trail you marked on the map' },
  { id: 'summit', name: 'Summit 360', desc: 'Slow full circle at the top' },
];
const BADGES = [
  { n: 'First flight', i: 'drone', c: 'blue', got: true }, { n: 'Peak hunter', i: 'heart', c: 'red', got: true },
  { n: 'Ladakh 5000 m', i: 'mountain', c: 'yellow', got: true }, { n: '10 reels', i: 'film', c: 'green', got: false },
  { n: 'On SOAR Wall', i: 'crown', c: 'yellow', got: false }, { n: '170 bpm club', i: 'zap', c: 'red', got: false },
  { n: 'Night rider', i: 'moon', c: 'blue', got: true }, { n: 'Spot explorer', i: 'pin', c: 'green', got: false },
];

/* ------------------------------------------------------------------ UI primitives */
let toastT;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600); }
function openSheet(html, mount) {
  $('#sheetBody').innerHTML = html; hydrateIcons($('#sheetBody'));
  $('#scrim').classList.add('show'); $('#sheet').classList.add('show'); $('#sheet').scrollTop = 0;
  mount && mount($('#sheetBody'));
}
function closeSheet() { $('#scrim').classList.remove('show'); $('#sheet').classList.remove('show'); const v = $('#sheetBody video'); v && v.pause(); }
function notify(title, sub, ic = 'bell') { S.notifs.unshift({ title, sub, ic, ts: Date.now() }); S.notifs = S.notifs.slice(0, 30); save(); renderAppbar(); }

/* ------------------------------------------------------------------ heart rate engine */
const HR = {
  bpm: 76, src: 'demo', dev: null, hist: [], lastPeak: 0, spike: 0, listeners: new Set(),
  set(b, src) { this.bpm = Math.round(b); if (src) this.src = src; this.hist.push(this.bpm); if (this.hist.length > 90) this.hist.shift(); this.check(); this.listeners.forEach(f => f()); },
  check() {
    const th = S.settings.threshold;
    if (S.settings.trigger && this.bpm >= th && Date.now() - this.lastPeak > 15000) { this.lastPeak = Date.now(); onPeak(this.bpm); }
  },
  tickDemo() {
    if (this.src !== 'demo') return;
    let base = Drone.flying ? 96 : 76; if (Drone.rec) base += 6;
    if (this.spike > 0) { this.spike--; base += this.spike > 6 ? 70 - (this.spike - 6) * 4 : this.spike * 9; }
    const target = base + (Math.random() - .5) * 6;
    this.set(this.bpm + (target - this.bpm) * .45);
  },
};
HR.hist = Array.from({ length: 60 }, (_, i) => 74 + Math.sin(i / 5) * 3 + Math.random() * 3);

async function pairBluetooth() {
  if (!navigator.bluetooth) { toast('Real pairing needs Chrome on Android or a laptop. Demo mode is on.'); return false; }
  try {
    const dev = await navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }], optionalServices: ['battery_service'] });
    toast('Connecting to ' + (dev.name || 'watch') + '...');
    const server = await dev.gatt.connect();
    const ch = await (await server.getPrimaryService('heart_rate')).getCharacteristic('heart_rate_measurement');
    await ch.startNotifications();
    ch.addEventListener('characteristicvaluechanged', e => { const v = e.target.value; const f = v.getUint8(0); HR.set(f & 1 ? v.getUint16(1, true) : v.getUint8(1), 'ble'); });
    dev.addEventListener('gattserverdisconnected', () => { HR.src = 'demo'; S.watch = null; save(); toast('Watch disconnected. Back to demo mode.'); refresh(); });
    HR.dev = dev; HR.src = 'ble'; S.watch = { name: dev.name || 'Heart rate watch', brand: 'Bluetooth', real: true }; save();
    toast('Paired with ' + S.watch.name); notify('Watch paired', S.watch.name + ' is streaming your heart rate', 'watch'); refresh();
    return true;
  } catch (e) { if (e && e.name !== 'NotFoundError') toast('Could not pair: ' + (e.message || e)); return false; }
}

/* ------------------------------------------------------------------ drone sim */
const Drone = {
  flying: false, rec: false, recStart: 0, bat: 84, alt: 0, spd: 0, dist: 0, sats: 19, wind: 9, mode: 'follow', slowUntil: 0,
  tick() {
    if (this.flying) {
      this.alt = clamp(this.alt + (Math.random() - .35) * 3, 4, S.settings.maxAlt);
      this.spd = clamp(this.spd + (Math.random() - .5) * 6, 8, 46);
      this.dist = clamp(this.dist + (Math.random() - .45) * 2, S.settings.follow - 2, S.settings.follow + 6);
      this.bat = Math.max(5, this.bat - .12);
      if (this.bat < 20 && !this._low) { this._low = true; toast('Battery 20%: SOAR will fly home soon'); }
    } else { this.alt = Math.max(0, this.alt - 4); this.spd = 0; }
    this.sats = 17 + Math.round(Math.random() * 4); this.wind = clamp(this.wind + (Math.random() - .5), 4, 18);
  },
};

function onPeak(bpm) {
  const spot = Drone.flying ? (MODES.find(m => m.id === Drone.mode).name) : 'Walking';
  const imgs = ['rider.jpg', 'paraglider.jpg', 'skydiver.jpg', 'bikers.jpg', 'sunset.jpg'];
  const p = { id: 'k' + Date.now(), bpm, ts: Date.now(), mode: spot, img: imgs[S.peaks.length % imgs.length] };
  S.peaks.unshift(p); S.peaks = S.peaks.slice(0, 25);
  if (bpm > S.stats.peak) S.stats.peak = bpm;
  save();
  Drone.slowUntil = Date.now() + 4500;
  const fpv = $('.fpv'); if (fpv) { const f = $('.peakflash', fpv); f.classList.remove('go'); void f.offsetWidth; f.classList.add('go'); }
  toast('Peak caught at ' + bpm + ' bpm. Slow motion on, clip saved.');
  if (S.settings.notif) notify('Peak moment caught', bpm + ' bpm during ' + spot + '. Saved to your library.', 'heart');
  if (navigator.vibrate) navigator.vibrate([60, 40, 60]);
}

/* ------------------------------------------------------------------ router */
const MAIN = ['home', 'fly', 'create', 'community', 'spots'];
const TITLES = { profile: 'My SOAR', watch: 'Watch and heart rate', library: 'My library', map: 'Safe zones', spots: 'SOAR Experiences', community: 'SOAR Wall', create: 'Reel editor', fly: 'Fly' };
let current = 'home'; const stack = [];
function go(v, opts = {}) {
  if (v === current && !opts.force) { RENDER[v] && RENDER[v](opts); return; }
  if (!MAIN.includes(v)) { if (!opts.noPush && current) stack.push(current); } else stack.length = 0;
  current = v;
  $$('.view').forEach(s => s.classList.toggle('active', s.id === 'v-' + v));
  $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.go === v));
  renderAppbar();
  RENDER[v] && RENDER[v](opts);
  $('#v-' + v).scrollTop = 0;
  try { history.replaceState(null, '', '#' + v); } catch (e) { }
}
function back() { const p = stack.pop() || 'home'; current = ''; go(p, { noPush: true }); }
function refresh() { renderAppbar(); if (['home', 'watch', 'profile', 'library'].includes(current)) RENDER[current](); }

function renderAppbar() {
  const sub = !MAIN.includes(current) || current === 'xx';
  const unread = S.notifs.filter(n => !n.read).length;
  const hr = `<div class="hrchip" data-act="go" data-v="watch" title="${HR.src === 'ble' ? 'Live from watch' : 'Demo heart rate'}">${icon('heart')}<span class="js-bpm">${HR.bpm}</span></div>`;
  $('#appbar').innerHTML = sub
    ? `<button class="iconbtn" data-act="back" aria-label="Back">${icon('back')}</button><div class="title">${TITLES[current] || ''}</div>${hr}`
    : `<div class="logo"><div class="mark">${icon('drone')}</div><div>RED BULL <em>SOAR</em></div></div><div class="spacer"></div>${hr}
       <button class="iconbtn" data-act="notifs" aria-label="Notifications">${icon('bell')}${unread ? '<span class="dot"></span>' : ''}</button>
       <img class="avatar" src="${A}rider.jpg" alt="Profile" data-act="go" data-v="profile">`;
}

/* ------------------------------------------------------------------ views */
const RENDER = {};

RENDER.home = () => {
  const el = $('#v-home');
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const end = nextSunday(); const left = Math.max(0, end - Date.now());
  const d = Math.floor(left / 864e5), h = Math.floor(left / 36e5) % 24, m = Math.floor(left / 6e4) % 60;
  el.innerHTML = `
  <div class="hello"><div><div class="muted small">${greet},</div><h2>${esc(S.name)} \u{1F44B}</h2></div>
    <span class="pill ${Drone.flying ? 'green' : 'yellow'}">${icon('drone')}${Drone.flying ? 'SOAR flying' : 'SOAR ready'}</span></div>
  <div class="hero">
    <div class="kicker">Live it. SOAR films it.</div>
    <h2>Your story. With wings.</h2>
    <p>Throw it from your palm. It follows your watch and goes slow motion when your heart races.</p>
    <div class="btnrow"><button class="btn red" data-act="go" data-v="fly">${icon('drone')}Take off</button><button class="btn ghost" data-act="go" data-v="watch">${icon('watch')}Watch</button></div>
    <img src="${A}hero.jpg" alt="Red Bull SOAR drone">
  </div>

  <div class="sec"><h3>Quick actions</h3></div>
  <div class="grid4">
    ${[['fly', 'drone', 'Fly now', 'red'], ['watch', 'watch', 'Pair watch', 'blue'], ['create', 'film', 'Edit reel', 'yellow'], ['library', 'folder', 'Library', 'green'],
       ['map', 'shield', 'Safe zones', 'green'], ['spots', 'ticket', 'Book a spot', 'red'], ['community', 'trophy', 'Challenge', 'yellow'], ['profile', 'wrench', 'Concierge', 'blue']]
      .map(([v, i, t, c]) => `<button class="qa" data-act="go" data-v="${v}"><span class="ic ${c}">${icon(i)}</span>${t}</button>`).join('')}
  </div>

  <div class="sec"><h3>Adrenaline Trigger</h3><button class="link" data-act="spike">Simulate a jump</button></div>
  <div class="card">
    <div class="hrcard">
      <div><div class="bpm"><span class="js-bpm">${HR.bpm}</span> <small>bpm</small></div><div class="tiny muted">${HR.src === 'ble' ? 'Live: ' + esc(S.watch && S.watch.name) : 'Demo heart rate'}</div></div>
      <canvas class="spark js-spark" width="300" height="70"></canvas>
    </div>
    <div class="zonebar"><u style="left:${zonePct(S.settings.threshold)}%"></u><i class="js-zone" style="left:${zonePct(HR.bpm)}%"></i></div>
    <div class="between tiny muted" style="margin-top:6px"><span>Calm</span><span>Trigger at ${S.settings.threshold} bpm</span><span>Peak</span></div>
    <div class="between" style="margin-top:10px"><span class="pill ${S.settings.trigger ? 'red' : ''}">${icon('zap')}${S.settings.trigger ? 'Armed' : 'Off'}</span>
      <span class="small muted">${S.peaks.length} peaks caught</span></div>
  </div>

  <div class="sec"><h3>My SOAR</h3><button class="link" data-act="preflight">Pre-flight check</button></div>
  <div class="card row">
    <div class="ring" style="--p:${Math.round(Drone.bat)}"><b>${Math.round(Drone.bat)}%</b></div>
    <div class="grow" style="flex:1">
      <b>SOAR #RB-2407</b><div class="tiny muted">249 g nano class, firmware 1.4.2</div>
      <div class="row" style="flex-wrap:wrap;gap:6px;margin-top:8px"><span class="pill">${icon('battery')}30 min flight</span><span class="pill">${icon('folder')}38 GB free</span><span class="pill green">${icon('shield')}Crash cover on</span></div>
    </div>
  </div>

  <div class="banner" style="margin-top:14px">
    <h4>#EarnYourWings</h4><p>Post your highest-heartbeat clip. Top 10 this week shoot with Red Bull athletes.</p>
    <div class="count"><div><b>${d}</b><span>days</span></div><div><b>${h}</b><span>hrs</span></div><div><b>${m}</b><span>min</span></div></div>
    <div class="btnrow" style="width:70%"><button class="btn yellow" data-act="go" data-v="community" data-tab="challenge">Join challenge</button></div>
    <img src="${A}skydiver.jpg" alt="">
  </div>

  <div class="sec"><h3>Trending on the SOAR Wall</h3><button class="link" data-act="go" data-v="community">See all</button></div>
  <div class="hscroll">${SEED_POSTS.map(p => `<button class="tile" data-act="go" data-v="community" style="padding:0;text-align:left"><img src="${A}${p.img}" alt=""><span class="bpmtag">${icon('heart')}${p.bpm}</span><div class="meta"><b>@${p.who}</b><span>${p.loc}</span></div></button>`).join('')}</div>

  <div class="sec"><h3>Fly at a SOAR spot</h3><button class="link" data-act="go" data-v="spots">All spots</button></div>
  <div class="hscroll">${SPOTS.map(s => `<button class="tile" data-act="book" data-id="${s.id}" style="padding:0;text-align:left"><img src="${A}${s.img}" alt=""><div class="meta"><b>${s.name}</b><span>${s.city} · from ${rupee(299)}</span></div></button>`).join('')}</div>
  <div style="height:10px"></div>`;
  drawSparks();
};

RENDER.fly = () => {
  const el = $('#v-fly');
  if (!el.dataset.built) {
    el.dataset.built = 1;
    el.innerHTML = `
    <div class="chips" id="modeChips">${MODES.map(m => `<button class="chip ${m.id === Drone.mode ? 'active' : ''}" data-act="mode" data-id="${m.id}">${m.name}</button>`).join('')}</div>
    <div style="height:10px"></div>
    <div class="fpv grounded" id="fpv">
      <div class="scene" style="background-image:url(${A}rider.jpg)"></div>
      <div class="tele">
        <div><b id="t-bat" style="color:var(--green)">84%</b><span>Battery</span></div>
        <div><b id="t-spd">0</b><span>km/h</span></div>
        <div><b id="t-alt">0 m</b><span>Height</span></div>
        <div><b id="t-dist">0 m</b><span>From you</span></div>
      </div>
      <div class="recdot" id="recdot">REC 00:00</div>
      <div class="fpvhr">${icon('heart')}<span class="js-bpm">${HR.bpm}</span></div>
      <div class="slowtag">PEAK · SLOW MOTION</div>
      <div class="lock" id="lock" data-label="SOAR LOCK · YOU"></div>
      <div class="peakflash"></div>
      <div class="ctrl">
        <div class="side"><button class="mini" data-act="rth" title="Return home">${icon('rth')}</button><button class="mini" data-act="photo" title="Photo">${icon('camera')}</button></div>
        <button class="recbtn" id="recbtn" data-act="rec" aria-label="Record"></button>
        <div class="side r"><button class="mini" data-act="slowmo" id="slowBtn" title="Slow motion">${icon('gauge')}</button><button class="mini" data-act="spike" title="Simulate adrenaline">${icon('zap')}</button></div>
      </div>
    </div>
    <button class="btn red block takeoff" id="takeoffBtn" data-act="takeoff">${icon('up')}Palm take-off</button>
    <div class="grid3" style="margin-top:10px">
      <div class="stat"><b id="t-gps">19</b><span>GPS sats</span></div>
      <div class="stat"><b id="t-wind">9</b><span>Wind km/h</span></div>
      <div class="stat"><b style="color:var(--green)">Green</b><span>Zone, 120 m max</span></div>
    </div>
    <div class="sec"><h3>Flight settings</h3><button class="link" data-act="go" data-v="map">Check zones</button></div>
    <div class="card">
      <label class="field"><span>Max height: <b id="altVal">${S.settings.maxAlt} m</b></span><input type="range" min="10" max="120" value="${S.settings.maxAlt}" data-set="maxAlt"></label>
      <label class="field"><span>Follow distance: <b id="folVal">${S.settings.follow} m</b></span><input type="range" min="3" max="25" value="${S.settings.follow}" data-set="follow"></label>
      <label class="field" style="margin:0"><span>Adrenaline Trigger at: <b id="thVal">${S.settings.threshold} bpm</b></span><input type="range" min="95" max="170" value="${S.settings.threshold}" data-set="threshold"></label>
    </div>
    <div class="card list">
      <div class="li"><span class="ic green">${icon('shield')}</span><div class="grow"><b>Obstacle sensing</b><div class="sub">Sensors on all sides, brakes 2 m before trees</div></div><span class="pill green">On</span></div>
      <div class="li"><span class="ic blue">${icon('rth')}</span><div class="grow"><b>Return home</b><div class="sub">Flies back to your watch at 15% battery or lost signal</div></div><span class="pill green">Armed</span></div>
      <div class="li"><span class="ic yellow">${icon('watch')}</span><div class="grow"><b>Tracking source</b><div class="sub" id="trackSrc">${S.watch ? esc(S.watch.name) : 'Phone GPS + camera (pair a watch for heart rate)'}</div></div><button class="link" data-act="go" data-v="watch">Change</button></div>
    </div>
    <div class="sec"><h3>Peaks this session</h3><button class="link" data-act="go" data-v="library">Library</button></div>
    <div class="card list" id="peakList"></div>`;
    hydrateIcons(el);
  }
  updateFly(); renderPeakList();
};
function renderPeakList() {
  const pl = $('#peakList'); if (!pl) return;
  pl.innerHTML = S.peaks.length ? S.peaks.slice(0, 5).map(p => `<div class="li"><span class="ic red">${icon('heart')}</span><div class="grow"><b>${p.bpm} bpm · ${esc(p.mode)}</b><div class="sub">${timeAgo(p.ts)} · slow motion clip saved</div></div><button class="link" data-act="editpeak" data-id="${p.id}">Edit</button></div>`).join('')
    : `<div class="empty">No peaks yet. Take off and tap ${icon('zap')} to simulate a jump.</div>`;
}
function updateFly() {
  const f = $('#fpv'); if (!f) return;
  f.classList.toggle('flying', Drone.flying); f.classList.toggle('grounded', !Drone.flying); f.classList.toggle('rec', Drone.rec);
  f.classList.toggle('slowmo', Date.now() < Drone.slowUntil);
  $('#t-bat').textContent = Math.round(Drone.bat) + '%'; $('#t-bat').style.color = Drone.bat < 25 ? 'var(--red2)' : 'var(--green)';
  $('#t-spd').textContent = Math.round(Drone.spd); $('#t-alt').textContent = Math.round(Drone.alt) + ' m'; $('#t-dist').textContent = Math.round(Drone.dist) + ' m';
  $('#t-gps').textContent = Drone.sats; $('#t-wind').textContent = Math.round(Drone.wind);
  if (Drone.rec) { const s = Math.floor((Date.now() - Drone.recStart) / 1000); $('#recdot').textContent = 'REC ' + String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }
  $('#recbtn').classList.toggle('on', Drone.rec);
  $('#takeoffBtn').innerHTML = Drone.flying ? icon('hand') + 'Land in my palm' : icon('up') + 'Palm take-off';
  $('#takeoffBtn').className = 'btn block takeoff ' + (Drone.flying ? 'ghost' : 'red');
  const m = MODES.find(x => x.id === Drone.mode); $('#lock').dataset.label = 'SOAR LOCK · ' + m.name.toUpperCase();
  const scenes = { follow: 'rider.jpg', chase: 'bikers.jpg', orbit: 'rider.jpg', reveal: 'sunset.jpg', route: 'bikers.jpg', summit: 'paraglider.jpg' };
  const sc = $('.scene', f); const want = `url("${A}${scenes[Drone.mode]}")`; if (sc.style.backgroundImage !== want) sc.style.backgroundImage = want;
}

RENDER.watch = () => {
  const el = $('#v-watch');
  const brands = [['Any Bluetooth watch', 'BT', 'ble'], ['Garmin', 'G', 'ble'], ['Samsung', 'S', 'ble'], ['boAt', 'b', 'ble'], ['Noise', 'N', 'ble'], ['Apple Watch', '', 'apple'], ['Fitbit', 'F', 'ble'], ['SOAR Tag', 'RB', 'tag'], ['Demo mode', '♥', 'demo']];
  el.innerHTML = `
  <div class="bigheart"><div class="core"><div><b class="js-bpm">${HR.bpm}</b><span>bpm · ${HR.src === 'ble' ? 'live' : 'demo'}</span></div></div></div>
  <div class="zonebar" style="margin:14px 4px 0"><u style="left:${zonePct(S.settings.threshold)}%"></u><i class="js-zone" style="left:${zonePct(HR.bpm)}%"></i></div>
  <div class="between tiny muted" style="margin:6px 4px 0"><span>Calm 60</span><span>Active 110</span><span>Adrenaline 150+</span></div>
  <div class="card" style="margin-top:12px"><div class="between"><b>Last 90 seconds</b><span class="pill red">${icon('zap')}Trigger ${S.settings.threshold}</span></div><canvas class="chart js-chart" width="640" height="260"></canvas></div>
  <div class="card">
    <div class="between"><div><b>${S.watch ? esc(S.watch.name) : 'No watch paired'}</b><div class="tiny muted">${S.watch ? (S.watch.real ? 'Streaming heart rate over Bluetooth' : 'Paired in demo mode') : 'SOAR works with any brand'}</div></div>
    ${S.watch ? `<button class="btn ghost" data-act="unpair">Unpair</button>` : `<button class="btn red" data-act="pairble">${icon('bt')}Pair</button>`}</div>
  </div>
  <div class="sec"><h3>Pick your watch</h3></div>
  <div class="grid3">${brands.map(([n, l, k]) => `<button class="brand ${S.watch && S.watch.brand === n ? 'sel' : ''}" data-act="brand" data-k="${k}" data-n="${n}"><span class="logo2">${l}</span>${n}</button>`).join('')}</div>
  <div class="card" style="margin-top:12px">
    <label class="field"><span>Trigger when heart rate passes: <b id="thVal2">${S.settings.threshold} bpm</b></span><input type="range" min="95" max="170" value="${S.settings.threshold}" data-set="threshold"></label>
    <div class="between"><div><b>Adrenaline Trigger</b><div class="tiny muted">Slow motion, closer framing, peak bookmark</div></div><button class="toggle ${S.settings.trigger ? 'on' : ''}" data-act="toggle" data-k="trigger"></button></div>
    <div class="between" style="margin-top:12px"><div><b>Slow motion at peaks</b><div class="tiny muted">4x slower for 4 seconds</div></div><button class="toggle ${S.settings.slowAtPeak ? 'on' : ''}" data-act="toggle" data-k="slowAtPeak"></button></div>
    <button class="btn yellow block" style="margin-top:12px" data-act="spike">${icon('zap')}Test: simulate a bungee jump</button>
  </div>
  <div class="card list">
    <div class="li"><span class="ic blue">${icon('info')}</span><div class="grow"><b>How pairing works</b><div class="sub">Garmin: turn on "Broadcast heart rate". Samsung, boAt, Noise, Fitbit: keep the watch's Bluetooth on. Chest straps work too. Apple Watch pairs through the SOAR watch app.</div></div></div>
  </div>`;
  hydrateIcons(el); drawSparks();
};

RENDER.library = (opts = {}) => {
  const el = $('#v-library'); const f = opts.filter || el.dataset.f || 'all'; el.dataset.f = f;
  const items = [
    ...S.reels.map(r => ({ id: r.id, title: r.title, key: r.key, dur: r.dur, type: 'reel', when: timeAgo(r.ts), mime: r.mime })),
    ...S.peaks.map(p => ({ id: p.id, title: 'Peak ' + p.bpm + ' bpm · ' + p.mode, img: p.img, dur: '0:08', bpm: p.bpm, type: 'peak', when: timeAgo(p.ts) })),
    ...DEMO_CLIPS];
  const list = items.filter(i => f === 'all' || i.type === f || (f === 'clip' && i.type === 'photo'));
  const used = 22 + S.reels.length * 0.2;
  el.innerHTML = `
  <div class="card"><div class="between small"><b>Storage on SOAR</b><span class="muted">${used.toFixed(1)} of 64 GB</span></div>
    <div class="storage" style="margin-top:8px"><i style="width:${used / 64 * 70}%;background:var(--red)"></i><i style="width:${used / 64 * 30}%;background:var(--yellow)"></i></div>
    <div class="row tiny muted" style="margin-top:6px;gap:14px"><span>● Clips</span><span style="color:var(--yellow)">● Reels</span><span class="between" style="margin-left:auto"><button class="toggle ${S.settings.autoDl ? 'on' : ''}" data-act="toggle" data-k="autoDl" style="transform:scale(.8)"></button>Auto-save to phone</span></div></div>
  <div class="chips" style="margin:12px 0">${[['all', 'All'], ['peak', 'Peaks'], ['reel', 'My reels'], ['clip', 'Clips and photos']].map(([k, t]) => `<button class="chip ${k === f ? 'active' : ''}" data-act="libf" data-f="${k}">${t}</button>`).join('')}</div>
  <button class="btn ghost block" data-act="import">${icon('upload')}Import a video from your phone</button>
  <div class="libgrid" style="margin-top:12px">${list.map(i => `
    <div class="clip">
      ${i.key ? `<video class="thumb" data-key="${i.key}" muted playsinline preload="metadata"></video>` : `<img class="thumb" src="${A}${i.img}" alt="">`}
      ${i.bpm ? `<span class="bpmtag">${icon('heart')}${i.bpm}</span>` : i.type === 'reel' ? '<span class="bpmtag" style="background:var(--yellow);color:#000">REEL</span>' : ''}
      <span class="dur">${i.dur || ''}</span>
      <div class="meta"><b>${esc(i.title)}</b><span class="tiny muted">${i.when}</span></div>
      <div class="acts">
        <button data-act="libedit" data-id="${i.id}" title="Edit">${icon('scissors')}</button>
        <button data-act="libdl" data-id="${i.id}" title="Download">${icon('download')}</button>
        <button data-act="libshare" data-id="${i.id}" title="Share">${icon('share')}</button>
        ${i.type === 'reel' || i.type === 'peak' ? `<button data-act="libdel" data-id="${i.id}" title="Delete">${icon('trash')}</button>` : ''}
      </div>
    </div>`).join('') || '<div class="empty" style="grid-column:1/-1">Nothing here yet</div>'}</div>`;
  el._items = items;
  hydrateMedia(el);
};

RENDER.spots = (opts = {}) => {
  const el = $('#v-spots'); const city = opts.city || el.dataset.city || 'All'; el.dataset.city = city;
  const cities = ['All', ...new Set(SPOTS.map(s => s.city))];
  const mine = S.bookings.slice(0, 3);
  el.innerHTML = `
  <div class="hero" style="min-height:150px;background:linear-gradient(135deg,rgba(11,30,79,.85),rgba(229,22,61,.55)),url(${A}kiosk.jpg) center/cover">
    <div class="kicker">SOAR Experiences</div><h2 style="width:80%">No drone? We film your jump.</h2>
    <p style="width:85%">Book a slot, do your thing, scan the QR and your reel is on your phone in minutes.</p>
  </div>
  ${mine.length ? `<div class="sec"><h3>My bookings</h3></div>${mine.map(b => { const s = SPOTS.find(x => x.id === b.spot); return `<button class="card row" style="width:100%;text-align:left" data-act="ticket" data-id="${b.id}"><span class="ic red">${icon('ticket')}</span><div style="flex:1"><b>${s.name}</b><div class="tiny muted">${b.dateLabel} · ${b.slot} · ${b.pkgName}</div></div><span class="pill">${b.id}</span></button>`; }).join('')}` : ''}
  <div class="sec"><h3>Spots near adventure</h3><button class="link" data-act="go" data-v="map">Map</button></div>
  <div class="chips" style="margin-bottom:12px">${cities.map(c => `<button class="chip ${c === city ? 'active' : ''}" data-act="city" data-c="${c}">${c}</button>`).join('')}</div>
  ${SPOTS.filter(s => city === 'All' || s.city === city).map(s => `
   <div class="spot"><img src="${A}${s.img}" alt="">
    <div class="body"><div class="between"><h4>${s.name}</h4><span class="star">★ ${s.rating}</span></div>
     <div class="tiny muted">${s.city} · ${s.act} · ${s.reviews} reviews · next slot ${s.slots[0]}</div>
     <div class="between" style="margin-top:10px"><span><span class="tiny muted">from</span> <b style="font-size:17px">${rupee(299)}</b></span><button class="btn red" data-act="book" data-id="${s.id}">${icon('calendar')}Book</button></div></div></div>`).join('')}
  <div class="card list">
    <div class="li"><span class="ic yellow">${icon('qr')}</span><div class="grow"><b>Already filmed?</b><div class="sub">Enter your booking code to get your clip</div></div><button class="btn ghost" data-act="claim">Get clip</button></div>
    <div class="li"><span class="ic blue">${icon('users')}</span><div class="grow"><b>Run an adventure spot?</b><div class="sub">Partner with SOAR, earn on every video</div></div><button class="link" data-act="partner">Join</button></div>
  </div>`;
};

function bookingSheet(spotId) {
  const s = SPOTS.find(x => x.id === spotId);
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d; });
  let sel = { pkg: 'reel', day: 0, slot: s.slots[0], people: 1 };
  const draw = () => `
    <h3>${s.name}</h3><div class="tiny muted" style="margin:-8px 0 12px">${s.city} · ${s.act} · ★ ${s.rating}</div>
    ${PKGS.map(p => `<button class="pkg ${sel.pkg === p.id ? 'sel' : ''}" data-p="${p.id}"><div><b>${p.name}</b> ${p.tag ? `<span class="pill red" style="padding:2px 7px">${p.tag}</span>` : ''}<div class="tiny muted">${p.desc}</div></div><strong>${rupee(p.price)}</strong></button>`).join('')}
    <div class="field" style="margin-top:6px"><span>Day</span><div class="chips">${days.map((d, i) => `<button class="chip ${sel.day === i ? 'active' : ''}" data-d="${i}">${i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' })}</button>`).join('')}</div></div>
    <div class="field"><span>Time</span><div class="slots">${s.slots.map(t => `<button class="chip ${sel.slot === t ? 'active' : ''}" data-t="${t}">${t}</button>`).join('')}</div></div>
    <div class="between field"><span style="margin:0">People</span><div class="row"><button class="iconbtn" data-q="-1">-</button><b>${sel.people}</b><button class="iconbtn" data-q="1">+</button></div></div>
    <div class="between" style="margin:6px 0 10px"><span class="muted">Total</span><b style="font-size:22px">${rupee(PKGS.find(p => p.id === sel.pkg).price * sel.people)}</b></div>
    <button class="btn red block" data-confirm>${icon('check')}Confirm booking</button>
    <div class="tiny muted" style="text-align:center;margin-top:8px">Pay at the spot. Free cancellation up to 2 hours before.</div>`;
  openSheet(draw(), body => {
    body.onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.p) sel.pkg = b.dataset.p; else if (b.dataset.d) sel.day = +b.dataset.d; else if (b.dataset.t) sel.slot = b.dataset.t;
      else if (b.dataset.q) sel.people = clamp(sel.people + +b.dataset.q, 1, 6);
      else if ('confirm' in b.dataset) {
        const p = PKGS.find(x => x.id === sel.pkg); const d = days[sel.day];
        const bk = { id: 'SOAR-' + uid(), spot: s.id, pkg: p.id, pkgName: p.name, price: p.price * sel.people, people: sel.people, slot: sel.slot, date: d.toISOString(), dateLabel: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }), ts: Date.now() };
        S.bookings.unshift(bk); save(); notify('Booking confirmed', s.name + ', ' + bk.dateLabel + ' at ' + bk.slot, 'ticket');
        showTicket(bk.id); if (current === 'spots') RENDER.spots(); return;
      } else return;
      body.innerHTML = draw(); hydrateIcons(body);
    };
  });
}
function showTicket(id) {
  const b = S.bookings.find(x => x.id === id); const s = SPOTS.find(x => x.id === b.spot);
  openSheet(`<div class="ticket"><div style="font-weight:900;letter-spacing:1px;font-size:12px">RED BULL SOAR · EXPERIENCE PASS</div>
    <h3 style="margin:8px 0 2px;color:#0b1e4f">${s.name}</h3><div style="font-size:13px">${b.dateLabel} · ${b.slot} · ${b.people} ${b.people > 1 ? 'people' : 'person'}</div>
    <img class="qr" id="tqr" alt="Booking QR"><div class="code">${b.id}</div>
    <div style="font-size:12px;margin-top:6px">${b.pkgName} · ${rupee(b.price)} · show this at the SOAR booth</div></div>
    <div class="btnrow"><button class="btn ghost" data-act="cancelbk" data-id="${b.id}">Cancel</button><button class="btn" data-act="sharebk" data-id="${b.id}">${icon('share')}Share pass</button></div>`,
    () => { $('#tqr').src = qrData(b.id + '|' + s.name + '|' + b.dateLabel + ' ' + b.slot); });
}
function qrData(text, cell = 6) { try { const q = qrcode(0, 'M'); q.addData(text); q.make(); return q.createDataURL(cell, 2); } catch (e) { return ''; } }

let communityTab = 'feed', sportF = 'All';
RENDER.community = (opts = {}) => {
  if (opts.tab) communityTab = opts.tab;
  const el = $('#v-community');
  const posts = [...S.posts, ...SEED_POSTS];
  const seg = `<div class="chips" style="margin-bottom:12px">${[['feed', 'Feed'], ['challenge', '#EarnYourWings'], ['leaders', 'Leaderboard']].map(([k, t]) => `<button class="chip ${communityTab === k ? 'active' : ''}" data-act="ctab" data-t="${k}">${t}</button>`).join('')}</div>`;
  let body = '';
  if (communityTab === 'feed') {
    const list = posts.filter(p => sportF === 'All' || p.sport === sportF);
    body = `
    <button class="composer" data-act="compose"><img class="avatar" src="${A}rider.jpg" alt=""><span class="ph">Share your adventure...</span><span class="ic red">${icon('plus')}</span></button>
    <div class="creators">${Object.entries(PEOPLE).map(([h, p]) => `<div class="creator"><img src="${A}${p.img}" alt=""><div>${p.name.split(' ')[0]}</div><button class="${S.follows[h] ? 'on' : ''}" data-act="follow" data-h="${h}">${S.follows[h] ? 'Following' : 'Follow'}</button></div>`).join('')}</div>
    <div class="chips" style="margin:6px 0 12px">${['All', 'Bike', 'Air', 'Trek', 'Water', 'Snow'].map(s => `<button class="chip ${sportF === s ? 'active' : ''}" data-act="sport" data-s="${s}">${s}</button>`).join('')}</div>
    ${list.map(postHTML).join('') || '<div class="empty">No posts for this sport yet. Be the first.</div>'}`;
  } else if (communityTab === 'challenge') {
    const end = nextSunday(); const left = Math.max(0, end - Date.now());
    body = `
    <div class="banner"><h4>#EarnYourWings</h4><p>Post the clip where your Adrenaline Trigger fired. Highest heartbeat of the week wins.</p>
      <div class="count"><div><b>${Math.floor(left / 864e5)}</b><span>days</span></div><div><b>${Math.floor(left / 36e5) % 24}</b><span>hrs</span></div><div><b>${Math.floor(left / 6e4) % 60}</b><span>min</span></div></div>
      <div class="btnrow" style="width:70%"><button class="btn yellow" data-act="compose" data-challenge="1">${icon('upload')}Post my clip</button></div><img src="${A}paraglider.jpg" alt=""></div>
    <div class="card list" style="margin-top:12px">
      <div class="li"><span class="ic red">${icon('heart')}</span><div class="grow"><b>1. Fly with a watch on</b><div class="sub">Your bpm is stamped on the clip</div></div></div>
      <div class="li"><span class="ic yellow">${icon('film')}</span><div class="grow"><b>2. Edit in SOAR</b><div class="sub">Keep it under 60 seconds</div></div></div>
      <div class="li"><span class="ic blue">${icon('upload')}</span><div class="grow"><b>3. Post with #EarnYourWings</b><div class="sub">Safe flying only: green zones, no crowds</div></div></div>
    </div>
    <div class="sec"><h3>What you can win</h3></div>
    <div class="grid3"><div class="stat"><b>Top 10</b><span>shoot with Red Bull athletes</span></div><div class="stat"><b>Top 3</b><span>Red Bull TV feature</span></div><div class="stat"><b>#1</b><span>Summit Edition</span></div></div>
    <div class="sec"><h3>Entries so far</h3></div>${posts.filter(p => (p.tags || []).some(t => /EarnYourWings|Heartbeat/i.test(t))).map(postHTML).join('')}`;
  } else {
    const lb = [...posts].sort((a, b) => b.bpm - a.bpm).slice(0, 8);
    body = `<div class="card lb list">${lb.map((p, i) => { const who = p.who === 'me' ? { name: S.name, img: 'rider.jpg' } : PEOPLE[p.who]; return `<div class="li"><span class="rank">#${i + 1}</span><img src="${A}${who.img}" alt=""><div class="grow"><b>@${p.who === 'me' ? S.handle.slice(1) : p.who}</b><div class="sub">${esc(p.loc)} · ${fmtK(p.likes + likeDelta(p))} likes</div></div><span class="pill red">${icon('heart')}${p.bpm}</span></div>`; }).join('')}</div>
    <div class="sec"><h3>Top spots this week</h3></div>
    <div class="grid3">${SPOTS.slice(0, 3).map(s => `<div class="stat"><b>${s.city}</b><span>${s.act}</span></div>`).join('')}</div>`;
  }
  el.innerHTML = seg + body; hydrateMedia(el);
};
const likeDelta = p => (S.likes[p.id] ? 1 : 0);
function postHTML(p) {
  const who = p.who === 'me' ? { name: S.name, img: 'rider.jpg' } : PEOPLE[p.who] || { name: p.who, img: 'rider.jpg' };
  const cm = (S.comments[p.id] || []).length + (p.seedComments || 3);
  const media = p.key ? `<video data-key="${p.key}" controls playsinline muted loop></video>` : `<img src="${p.data || A + p.img}" alt="" loading="lazy">`;
  return `<article class="post"><div class="head"><img src="${A}${who.img}" alt=""><div style="flex:1"><b>${esc(who.name)}</b><span class="tiny muted">${esc(p.loc)} · ${timeAgo(p.ts)}</span></div><span class="pill">${p.sport}</span></div>
   <div class="media">${media}<span class="bpmtag" style="top:10px;left:10px">${icon('heart')}${p.bpm} bpm</span></div>
   <div class="acts"><button class="${S.likes[p.id] ? 'liked' : ''}" data-act="like" data-id="${p.id}">${icon('heart')}${fmtK(p.likes + likeDelta(p))}</button>
    <button data-act="comments" data-id="${p.id}">${icon('msg')}${cm}</button><button data-act="sharepost" data-id="${p.id}">${icon('share')}Share</button>
    <span style="flex:1"></span><button class="${S.saves[p.id] ? 'saved' : ''}" data-act="savepost" data-id="${p.id}">${icon('bookmark')}</button></div>
   <div class="cap"><b>@${p.who === 'me' ? S.handle.slice(1) : p.who}</b> ${esc(p.cap)} ${(p.tags || []).map(t => `<span class="tag">#${esc(t)}</span>`).join(' ')}</div></article>`;
}

let pendingPost = null;
function composeSheet(challenge, preset) {
  pendingPost = preset || null;
  const lastPeak = S.peaks[0];
  openSheet(`<h3>Share your adventure</h3>
    <button class="btn ghost block" id="pickMedia">${icon('image')}${pendingPost ? 'Change photo or video' : 'Pick a photo or video'}</button>
    <div id="mediaPrev" style="margin:10px 0"></div>
    <label class="field"><span>Caption</span><textarea id="pCap" placeholder="What happened up there?">${challenge ? '#EarnYourWings ' : ''}</textarea></label>
    <div class="grid2"><label class="field"><span>Sport</span><select id="pSport">${['Bike', 'Air', 'Trek', 'Water', 'Snow'].map(s => `<option>${s}</option>`).join('')}</select></label>
    <label class="field"><span>Place</span><input id="pLoc" value="Spiti Valley"></label></div>
    <label class="field"><span>Heart rate on clip</span><input id="pBpm" type="number" value="${lastPeak ? lastPeak.bpm : HR.bpm}"></label>
    <button class="btn red block" id="doPost">${icon('upload')}Post to SOAR Wall</button>`, body => {
    const prev = () => { const m = $('#mediaPrev'); if (!pendingPost) { m.innerHTML = ''; return; } m.innerHTML = pendingPost.kind === 'image' ? `<img src="${pendingPost.data}" style="width:100%;border-radius:14px">` : `<video src="${pendingPost.url}" style="width:100%;border-radius:14px" controls playsinline muted></video>`; };
    prev();
    $('#pickMedia').onclick = () => { $('#filePost').onchange = async e => { const f = e.target.files[0]; e.target.value = ''; if (!f) return; pendingPost = await readMedia(f); prev(); }; $('#filePost').click(); };
    $('#doPost').onclick = async () => {
      const cap = $('#pCap').value.trim(); if (!pendingPost && !cap) { toast('Add a photo, video or caption'); return; }
      const tags = (cap.match(/#(\w+)/g) || []).map(t => t.slice(1)); const capClean = cap.replace(/#\w+/g, '').trim();
      const post = { id: 'u' + Date.now(), who: 'me', sport: $('#pSport').value, loc: $('#pLoc').value || 'India', bpm: +$('#pBpm').value || HR.bpm, likes: 0, cap: capClean || 'New flight with SOAR', tags: tags.length ? tags : ['SOARWall'], ts: Date.now(), seedComments: 0 };
      if (pendingPost && pendingPost.kind === 'image') post.data = pendingPost.data;
      else if (pendingPost && pendingPost.kind === 'video') { const key = 'post-' + post.id; try { await DB.put(key, pendingPost.blob); post.key = key; } catch (e) { toast('Could not store video on this device'); } }
      else post.img = 'sunset.jpg';
      S.posts.unshift(post); S.stats.reels++; save(); closeSheet(); communityTab = 'feed'; sportF = 'All'; go('community', { force: true }); toast('Posted to the SOAR Wall');
    };
  });
}
async function readMedia(file) {
  if (file.type.startsWith('video')) return { kind: 'video', blob: file, url: URL.createObjectURL(file) };
  const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = URL.createObjectURL(file); });
  const c = document.createElement('canvas'); const sc = Math.min(1, 900 / Math.max(img.width, img.height)); c.width = img.width * sc; c.height = img.height * sc;
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); return { kind: 'image', data: c.toDataURL('image/jpeg', .78) };
}
function commentsSheet(id) {
  const p = [...S.posts, ...SEED_POSTS].find(x => x.id === id);
  const seed = p.who === 'me' ? [] : [['nomad.tara', 'That slow motion is crazy'], ['airdrift', 'Which mode was this?'], ['spiti.line', 'Adding this spot to my list']];
  const draw = () => `<h3>Comments</h3><div class="list">${[...seed, ...(S.comments[id] || []).map(c => ['me', c])].map(([w, c]) => `<div class="li"><img class="avatar" style="width:32px;height:32px" src="${A}${w === 'me' ? 'rider.jpg' : PEOPLE[w].img}" alt=""><div class="grow"><b>@${w === 'me' ? S.handle.slice(1) : w}</b><div class="sub" style="color:#dfe8ff">${esc(c)}</div></div></div>`).join('') || '<div class="empty">No comments yet</div>'}</div>
    <div class="row" style="margin-top:10px"><input id="cIn" placeholder="Add a comment" style="flex:1;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:12px;padding:11px"><button class="btn red" id="cSend">Send</button></div>`;
  openSheet(draw(), function mount(body) {
    $('#cSend').onclick = () => { const v = $('#cIn').value.trim(); if (!v) return; (S.comments[id] = S.comments[id] || []).push(v); save(); body.innerHTML = draw(); hydrateIcons(body); mount(body); if (current === 'community') RENDER.community(); };
  });
}

RENDER.profile = () => {
  const el = $('#v-profile'); const lvlPct = 64;
  el.innerHTML = `
  <div class="prof"><img src="${A}rider.jpg" alt=""><h2>${esc(S.name)}</h2><div class="muted small">${esc(S.handle)} · Bengaluru</div>
    <div class="pill yellow" style="margin-top:8px">${icon('crown')}Wings level 3 · Cloud Chaser</div>
    <div class="lvl"><i style="width:${lvlPct}%"></i></div><div class="tiny muted" style="margin-top:4px">360 XP to Sky Captain</div></div>
  <div class="grid4" style="margin-top:12px">
    <div class="stat"><b>${S.stats.flights}</b><span>flights</span></div><div class="stat"><b>${S.stats.km}</b><span>km flown</span></div>
    <div class="stat"><b style="color:var(--red2)">${S.stats.peak}</b><span>top bpm</span></div><div class="stat"><b>${S.stats.reels + S.reels.length}</b><span>reels</span></div></div>
  <div class="sec"><h3>Badges</h3><span class="small muted">${BADGES.filter(b => b.got).length} of ${BADGES.length}</span></div>
  <div class="grid4">${BADGES.map(b => `<div class="badge ${b.got ? '' : 'locked'}"><span class="ic ${b.c}">${icon(b.i)}</span>${b.n}</div>`).join('')}</div>

  <div class="sec"><h3>My SOAR</h3></div>
  <div class="card list">
    <div class="li"><span class="ic blue">${icon('drone')}</span><div class="grow"><b>SOAR #RB-2407</b><div class="sub">Firmware 1.4.2 · battery health 96%</div></div><button class="link" data-act="fw">Update</button></div>
    <div class="li"><span class="ic green">${icon('shield')}</span><div class="grow"><b>Crash cover</b><div class="sub">Active till Oct 2027 · 1 free replacement left</div></div><span class="pill green">On</span></div>
    <div class="li"><span class="ic yellow">${icon('info')}</span><div class="grow"><b>Rules check</b><div class="sub">Under 250 g nano class: no pilot licence needed in India. Fly in green zones only.</div></div></div>
  </div>

  <div class="sec"><h3>Concierge</h3><span class="pill yellow">Summit</span></div>
  <div class="grid2">
    <button class="btn" data-act="service">${icon('wrench')}Book a repair</button><button class="btn ghost" data-act="lesson">${icon('calendar')}Flying lesson</button>
    <button class="btn ghost" data-act="callus">${icon('phone')}Call Concierge</button><button class="btn ghost" data-act="shop">${icon('cart')}Shop${S.cart.length ? ' (' + S.cart.length + ')' : ''}</button>
  </div>

  <div class="sec"><h3>Settings</h3></div>
  <div class="card list">
    ${[['trigger', 'Adrenaline Trigger', 'Slow motion and bookmark when heart rate jumps'], ['slowAtPeak', 'Slow motion at peaks', '4x slower for 4 seconds'], ['safe', 'Beginner safe mode', 'Lower speed, bigger gap from obstacles'],
       ['autoDl', 'Auto-save to phone', 'Download reels to your gallery after export'], ['notif', 'Notifications', 'Peaks, bookings, challenge results']]
      .map(([k, t, s]) => `<div class="li"><div class="grow"><b>${t}</b><div class="sub">${s}</div></div><button class="toggle ${S.settings[k] ? 'on' : ''}" data-act="toggle" data-k="${k}"></button></div>`).join('')}
    <div class="li"><div class="grow"><b>Name</b><div class="sub">Shown on your posts</div></div><button class="link" data-act="rename">${esc(S.name)}</button></div>
  </div>
  <div class="sec"><h3>Help</h3></div>
  <div class="card faq">
    <details><summary>Do I need a licence to fly SOAR?</summary><p>SOAR weighs under 250 g, the nano class under India's Drone Rules 2021, so you do not need a remote pilot certificate for fun flying. Stay in green zones, under 120 m, and keep it in sight.</p></details>
    <details><summary>Which watches work?</summary><p>Any watch or chest strap that shares heart rate over Bluetooth: Garmin (Broadcast HR), Samsung, boAt, Noise, Fitbit, Polar and more. No watch? Clip on a SOAR Tag.</p></details>
    <details><summary>How does the Adrenaline Trigger work?</summary><p>When your heart rate passes the number you set, SOAR switches to slow motion, moves closer and tags the moment, so the reel builds itself around your peak.</p></details>
    <details><summary>Where do my videos go?</summary><p>Clips sit on SOAR and in your library. Exported reels download straight to your phone, and you choose what to post on the SOAR Wall.</p></details>
  </div>
  <button class="btn ghost block" style="margin-top:12px" id="installBtn">${icon('download')}Install SOAR on this phone</button>
  <button class="btn ghost block" style="margin-top:8px" data-act="reset">${icon('trash')}Reset demo data</button>
  <div class="tiny muted" style="text-align:center;margin:12px 0">Red Bull SOAR concept app · Team Mavericks</div>`;
  hookInstall();
};

let map, mapDone = false;
RENDER.map = () => {
  const el = $('#v-map');
  if (!el.dataset.built) {
    el.dataset.built = 1;
    const items = ['Battery above 50%', 'Props and guards clicked in', 'Watch paired or SOAR Tag on', 'Green zone on the map', 'No crowds or roads below', 'Wind under 30 km/h'];
    el.innerHTML = `
      <div id="map"></div>
      <div class="legend"><span><i style="background:#33d17a"></i>Green: fly up to 120 m</span><span><i style="background:#ffb020"></i>Yellow: needs permission</span><span><i style="background:#e5163d"></i>Red: no fly</span><span><i style="background:#2a5caa"></i>SOAR spots</span></div>
      <div class="btnrow"><button class="btn" data-act="locate">${icon('locate')}Use my location</button><button class="btn ghost" data-act="go" data-v="spots">${icon('pin')}Spots</button></div>
      <div class="tiny muted" style="margin-top:8px">Zones shown here are examples for the demo. Always check the official Digital Sky airspace map before you fly.</div>
      <div class="sec"><h3>Pre-flight checklist</h3><span class="small muted" id="ckCount"></span></div>
      <div class="card" id="checklist">${items.map((t, i) => `<div class="check ${S.checklist[i] ? 'on' : ''}" data-act="check" data-i="${i}"><span class="box">${icon('check')}</span>${t}</div>`).join('')}</div>
      <div class="card list"><div class="li"><span class="ic yellow">${icon('info')}</span><div class="grow"><b>Golden rules</b><div class="sub">Keep SOAR in sight. Stay under 120 m. Not over crowds, airports, borders or military areas. Respect people's privacy.</div></div></div></div>`;
  }
  updateChecklist();
  setTimeout(initMap, 60);
};
function initMap() {
  if (typeof L === 'undefined') { $('#map').innerHTML = '<div class="empty">Map needs an internet connection</div>'; return; }
  if (!map) {
    map = L.map('map', { zoomControl: false, attributionControl: true }).setView([30.0869, 78.2676], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; OpenStreetMap' }).addTo(map);
    drawZones([30.0869, 78.2676]);
    const coords = { s1: [32.04, 76.72], s2: [30.0869, 78.2676], s3: [34.1526, 77.5771], s4: [32.2276, 78.0711], s5: [12.2958, 76.6394], s6: [32.2432, 76.3213] };
    SPOTS.forEach(s => L.circleMarker(coords[s.id], { radius: 8, color: '#fff', weight: 2, fillColor: '#2a5caa', fillOpacity: 1 }).addTo(map).bindPopup(`<b>${s.name}</b><br>${s.city}`));
  }
  setTimeout(() => map.invalidateSize(), 120);
}
function drawZones(c) {
  if (map._zones) map._zones.forEach(z => map.removeLayer(z));
  const [la, lo] = c;
  map._zones = [
    L.circle(c, { radius: 3500, color: '#33d17a', fillColor: '#33d17a', fillOpacity: .18, weight: 2 }).bindPopup('Green zone: fly up to 120 m'),
    L.circle([la + .06, lo + .07], { radius: 4000, color: '#ffb020', fillColor: '#ffb020', fillOpacity: .2, weight: 2 }).bindPopup('Yellow zone: needs permission'),
    L.circle([la - .05, lo + .09], { radius: 2500, color: '#e5163d', fillColor: '#e5163d', fillOpacity: .25, weight: 2 }).bindPopup('Red zone: no flying'),
    L.circleMarker(c, { radius: 9, color: '#fff', weight: 3, fillColor: '#e5163d', fillOpacity: 1 }).bindPopup('You'),
  ];
  map._zones.forEach(z => z.addTo(map));
}
function updateChecklist() { const n = Object.values(S.checklist).filter(Boolean).length; const c = $('#ckCount'); if (c) c.textContent = n + ' of 6 done'; }

RENDER.create = (opts = {}) => { if (window.Editor) Editor.show(opts); };

/* ------------------------------------------------------------------ canvas charts */
function zonePct(b) { return clamp((b - 60) / (180 - 60) * 100, 0, 100); }
function drawSparks() {
  $$('.js-spark').forEach(cv => {
    const c = cv.getContext('2d'), w = cv.width, h = cv.height, d = HR.hist.slice(-45); c.clearRect(0, 0, w, h);
    const y = v => h - 6 - (clamp(v, 60, 180) - 60) / 120 * (h - 12);
    const g = c.createLinearGradient(0, 0, w, 0); g.addColorStop(0, '#2a5caa'); g.addColorStop(1, '#ff3b5c');
    c.strokeStyle = 'rgba(255,59,92,.5)'; c.setLineDash([4, 4]); c.beginPath(); c.moveTo(0, y(S.settings.threshold)); c.lineTo(w, y(S.settings.threshold)); c.stroke(); c.setLineDash([]);
    c.lineWidth = 3; c.strokeStyle = g; c.beginPath(); d.forEach((v, i) => { const x = i / (d.length - 1) * w; i ? c.lineTo(x, y(v)) : c.moveTo(x, y(v)); }); c.stroke();
  });
  $$('.js-chart').forEach(cv => {
    const c = cv.getContext('2d'), w = cv.width, h = cv.height, d = HR.hist; c.clearRect(0, 0, w, h);
    const y = v => h - 20 - (clamp(v, 50, 190) - 50) / 140 * (h - 30);
    c.font = '18px Arial'; c.fillStyle = 'rgba(255,255,255,.35)';
    [60, 100, 140, 180].forEach(v => { c.fillRect(40, y(v), w - 40, 1); c.fillText(v, 0, y(v) + 6); });
    c.strokeStyle = '#ff3b5c'; c.setLineDash([8, 6]); c.lineWidth = 2; c.beginPath(); c.moveTo(40, y(S.settings.threshold)); c.lineTo(w, y(S.settings.threshold)); c.stroke(); c.setLineDash([]);
    const grd = c.createLinearGradient(0, 0, 0, h); grd.addColorStop(0, 'rgba(229,22,61,.45)'); grd.addColorStop(1, 'rgba(229,22,61,0)');
    c.beginPath(); d.forEach((v, i) => { const x = 40 + i / (d.length - 1) * (w - 40); i ? c.lineTo(x, y(v)) : c.moveTo(x, y(v)); });
    c.lineWidth = 4; c.strokeStyle = '#ff3b5c'; c.stroke(); c.lineTo(w, h); c.lineTo(40, h); c.fillStyle = grd; c.fill();
  });
  $$('.js-zone').forEach(z => z.style.left = zonePct(HR.bpm) + '%');
  $$('.js-bpm').forEach(b => b.textContent = HR.bpm);
}
function nextSunday() { const d = new Date(); d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7)); d.setHours(23, 59, 0, 0); return d.getTime(); }

/* ------------------------------------------------------------------ actions */
async function shareThing(title, text, file) {
  try {
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title, text }); return; }
    if (navigator.share) { await navigator.share({ title, text, url: location.href.split('#')[0] }); return; }
    await navigator.clipboard.writeText(text + ' ' + location.href.split('#')[0]); toast('Link copied');
  } catch (e) { if (e.name !== 'AbortError') toast('Sharing is not available here'); }
}
function download(url, name) { const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); }

const ACT = {
  go: b => go(b.dataset.v, { tab: b.dataset.tab }),
  back: () => back(),
  closesheet: () => closeSheet(),
  notifs: () => {
    S.notifs.forEach(n => n.read = true); save(); renderAppbar();
    const base = [{ title: 'Welcome to SOAR', sub: 'Pair a watch to arm the Adrenaline Trigger', ic: 'watch', ts: Date.now() - 864e5 }, { title: '#EarnYourWings is live', sub: 'Top 10 shoot with Red Bull athletes', ic: 'trophy', ts: Date.now() - 2 * 864e5 }];
    openSheet(`<h3>Notifications</h3>${[...S.notifs, ...base].map(n => `<div class="notif"><span class="ic red">${icon(n.ic)}</span><div><b>${esc(n.title)}</b><span>${esc(n.sub)} · ${timeAgo(n.ts)}</span></div></div>`).join('')}`);
  },
  spike: () => { HR.spike = 12; if (HR.src === 'ble') toast('Your real watch is connected: go do something brave'); else toast('Simulating a bungee jump...'); },
  takeoff: () => {
    Drone.flying = !Drone.flying;
    if (Drone.flying) { Drone.alt = 3; S.stats.flights++; save(); toast('SOAR is up. Following you at ' + S.settings.follow + ' m'); }
    else { Drone.rec = false; toast('Landed in your palm'); }
    updateFly();
  },
  rec: () => {
    if (!Drone.flying) { toast('Take off first'); return; }
    Drone.rec = !Drone.rec;
    if (Drone.rec) Drone.recStart = Date.now();
    else { const s = Math.round((Date.now() - Drone.recStart) / 1000); toast('Clip saved: ' + s + ' s in your library'); S.stats.km += 1; save(); }
    updateFly();
  },
  mode: b => { Drone.mode = b.dataset.id; $$('#modeChips .chip').forEach(c => c.classList.toggle('active', c.dataset.id === Drone.mode)); const m = MODES.find(x => x.id === Drone.mode); toast(m.name + ': ' + m.desc); updateFly(); },
  rth: () => { if (!Drone.flying) { toast('SOAR is already home'); return; } toast('Flying back to your watch...'); setTimeout(() => { Drone.flying = false; Drone.rec = false; updateFly(); toast('Home. Hold out your palm.'); }, 2500); },
  photo: () => { if (!Drone.flying) { toast('Take off first'); return; } const f = $('#fpv'); f.style.filter = 'brightness(2.2)'; setTimeout(() => f.style.filter = '', 120); toast('Photo saved, 12 MP'); },
  slowmo: () => { Drone.slowUntil = Date.now() + 4000; toast('Slow motion for 4 seconds'); updateFly(); },
  preflight: () => go('map'),
  pairble: () => pairBluetooth(),
  unpair: () => { if (HR.dev && HR.dev.gatt.connected) HR.dev.gatt.disconnect(); HR.src = 'demo'; S.watch = null; save(); RENDER.watch(); toast('Watch unpaired'); },
  brand: async b => {
    const k = b.dataset.k, n = b.dataset.n;
    if (k === 'ble') { const ok = await pairBluetooth(); if (!ok && !S.watch) { S.watch = { name: n + ' (demo)', brand: n, real: false }; save(); toast(n + ' paired in demo mode'); } }
    else if (k === 'apple') { S.watch = { name: 'Apple Watch (demo)', brand: n, real: false }; save(); toast('Apple Watch links through the SOAR watch app. Demo mode here.'); }
    else if (k === 'tag') { S.watch = { name: 'SOAR Tag', brand: n, real: false }; save(); toast('SOAR Tag paired. Follow works, heart rate needs a watch.'); }
    else { S.watch = null; HR.src = 'demo'; save(); toast('Demo heart rate on'); }
    RENDER.watch();
  },
  toggle: b => { const k = b.dataset.k; S.settings[k] = !S.settings[k]; save(); b.classList.toggle('on', S.settings[k]); toast((S.settings[k] ? 'On: ' : 'Off: ') + k.replace(/([A-Z])/g, ' $1').toLowerCase()); },
  libf: b => RENDER.library({ filter: b.dataset.f }),
  import: () => { go('create'); setTimeout(() => Editor.pickFile(), 100); },
  libedit: b => { const it = $('#v-library')._items.find(i => i.id === b.dataset.id); if (it.key) go('create', { key: it.key }); else go('create', { image: it.img }); },
  libdl: async b => {
    const it = $('#v-library')._items.find(i => i.id === b.dataset.id);
    if (it.key) { const u = await blobURL(it.key); download(u, 'SOAR_' + it.id + (it.mime && it.mime.includes('mp4') ? '.mp4' : '.webm')); }
    else download(A + it.img, 'SOAR_' + it.id + '.jpg');
    toast('Saved to your phone');
  },
  libshare: async b => { const it = $('#v-library')._items.find(i => i.id === b.dataset.id); let file; if (it.key) { const bl = await DB.get(it.key).catch(() => null); if (bl) file = new File([bl], 'SOAR_reel.' + (bl.type.includes('mp4') ? 'mp4' : 'webm'), { type: bl.type }); } shareThing('My SOAR clip', it.title + ' #EarnYourWings', file); },
  libdel: b => { const id = b.dataset.id; const r = S.reels.find(x => x.id === id); if (r) { DB.del(r.key).catch(() => { }); S.reels = S.reels.filter(x => x.id !== id); } S.peaks = S.peaks.filter(x => x.id !== id); save(); RENDER.library(); toast('Deleted'); },
  editpeak: b => { const p = S.peaks.find(x => x.id === b.dataset.id); go('create', { image: p.img, peak: p.bpm }); },
  city: b => RENDER.spots({ city: b.dataset.c }),
  book: b => bookingSheet(b.dataset.id),
  ticket: b => showTicket(b.dataset.id),
  cancelbk: b => { S.bookings = S.bookings.filter(x => x.id !== b.dataset.id); save(); closeSheet(); if (current === 'spots') RENDER.spots(); toast('Booking cancelled'); },
  sharebk: b => { const bk = S.bookings.find(x => x.id === b.dataset.id); shareThing('SOAR Experience', 'I booked a SOAR Experience: ' + SPOTS.find(s => s.id === bk.spot).name + ', ' + bk.dateLabel + ' ' + bk.slot + '. Code ' + bk.id); },
  claim: () => openSheet(`<h3>Get your clip</h3><label class="field"><span>Booking code</span><input id="clCode" placeholder="SOAR-XXXXXX" value="${S.bookings[0] ? S.bookings[0].id : ''}"></label><button class="btn red block" id="clGo">${icon('download')}Fetch my clip</button>`, () => {
    $('#clGo').onclick = () => { const c = $('#clCode').value.trim().toUpperCase(); const bk = S.bookings.find(x => x.id === c); if (!bk) { toast('Code not found. Check the pass.'); return; } const s = SPOTS.find(x => x.id === bk.spot); const p = { id: 'k' + Date.now(), bpm: 140 + Math.round(Math.random() * 20), ts: Date.now(), mode: s.name, img: s.img }; S.peaks.unshift(p); save(); closeSheet(); go('library', { filter: 'peak' }); toast('Your clip from ' + s.city + ' is in your library'); };
  }),
  partner: () => openSheet(`<h3>Partner with SOAR</h3><p class="muted small">We install and maintain SOAR at your site. You sell every Flight Reel and keep ${rupee(200)} of each ${rupee(499)} reel.</p>
    <label class="field"><span>Business name</span><input id="pbn" placeholder="e.g. Ganga Adventure Co."></label><label class="field"><span>City</span><input placeholder="Rishikesh"></label><label class="field"><span>Phone</span><input type="tel" placeholder="+91"></label>
    <button class="btn red block" id="pbGo">Request a call back</button>`, () => { $('#pbGo').onclick = () => { closeSheet(); toast('Thanks. The SOAR partner team will call you.'); }; }),
  ctab: b => { communityTab = b.dataset.t; RENDER.community(); },
  sport: b => { sportF = b.dataset.s; RENDER.community(); },
  follow: b => { const h = b.dataset.h; S.follows[h] = !S.follows[h]; save(); RENDER.community(); },
  compose: b => composeSheet(b.dataset.challenge),
  like: b => { const id = b.dataset.id; S.likes[id] = !S.likes[id]; save(); const p = [...S.posts, ...SEED_POSTS].find(x => x.id === id); b.classList.toggle('liked', S.likes[id]); b.innerHTML = icon('heart') + fmtK(p.likes + likeDelta(p)); if (S.likes[id] && navigator.vibrate) navigator.vibrate(20); },
  savepost: b => { const id = b.dataset.id; S.saves[id] = !S.saves[id]; save(); b.classList.toggle('saved', S.saves[id]); toast(S.saves[id] ? 'Saved' : 'Removed from saved'); },
  comments: b => commentsSheet(b.dataset.id),
  sharepost: b => { const p = [...S.posts, ...SEED_POSTS].find(x => x.id === b.dataset.id); shareThing('SOAR Wall', p.cap + ' (' + p.bpm + ' bpm) #EarnYourWings'); },
  check: b => { const i = b.dataset.i; S.checklist[i] = !S.checklist[i]; save(); b.classList.toggle('on', S.checklist[i]); updateChecklist(); if (Object.values(S.checklist).filter(Boolean).length === 6) toast('All set. Safe flying!'); },
  locate: () => {
    if (!navigator.geolocation) { toast('Location not available'); return; }
    toast('Finding you...');
    navigator.geolocation.getCurrentPosition(p => { const c = [p.coords.latitude, p.coords.longitude]; map.setView(c, 13); drawZones(c); toast('Zones drawn around you (demo)'); }, () => toast('Location permission denied'), { enableHighAccuracy: true, timeout: 8000 });
  },
  fw: () => { toast('Downloading firmware 1.5.0...'); setTimeout(() => toast('SOAR is up to date: 1.5.0'), 2200); },
  service: () => openSheet(`<h3>Book a repair</h3><label class="field"><span>What happened?</span><select><option>Crash or fall</option><option>Camera issue</option><option>Battery issue</option><option>Prop guard broken</option><option>Something else</option></select></label>
    <label class="field"><span>Pick-up address</span><textarea placeholder="Flat, street, city, PIN"></textarea></label><label class="field"><span>Pick-up day</span><input type="date"></label>
    <button class="btn red block" id="svGo">${icon('wrench')}Schedule doorstep pick-up</button><div class="tiny muted" style="text-align:center;margin-top:8px">Covered by crash cover. Loaner SOAR in 48 hours for Summit owners.</div>`,
    () => { $('#svGo').onclick = () => { closeSheet(); notify('Repair booked', 'Pick-up scheduled. Ticket RB-' + uid(), 'wrench'); toast('Pick-up booked. We will call before we come.'); }; }),
  lesson: () => openSheet(`<h3>1-hour flying lesson</h3><p class="muted small">A SOAR coach meets you at a green zone near you and sets up your modes, watch and Route Lock.</p>
    <div class="chips" style="margin-bottom:12px">${['Sat 7 am', 'Sat 5 pm', 'Sun 7 am', 'Sun 5 pm'].map((t, i) => `<button class="chip ${i ? '' : 'active'}">${t}</button>`).join('')}</div>
    <button class="btn red block" id="lsGo">Book free lesson</button>`, b => { b.querySelectorAll('.chip').forEach(c => c.onclick = () => { b.querySelectorAll('.chip').forEach(x => x.classList.remove('active')); c.classList.add('active'); }); $('#lsGo').onclick = () => { closeSheet(); toast('Lesson booked. Coach details sent.'); }; }),
  callus: () => { location.href = 'tel:+911800000000'; },
  shop: () => shopSheet(),
  rename: () => { const n = prompt('Your name', S.name); if (n) { S.name = n.trim().slice(0, 20); S.handle = '@' + S.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.rides'; save(); RENDER.profile(); } },
  reset: () => { if (confirm('Reset all demo data on this device?')) { localStorage.removeItem(KEY); location.reload(); } },
};
function shopSheet() {
  const draw = () => `<h3>Shop</h3>${SHOP.map(p => `<div class="shopitem"><img src="${A}${p.img}" alt=""><div style="flex:1"><b>${p.name}</b><div class="tiny muted">${p.desc}</div><b style="color:var(--yellow)">${rupee(p.price)}</b></div><button class="btn ${S.cart.includes(p.id) ? 'ghost' : 'red'}" data-add="${p.id}">${S.cart.includes(p.id) ? 'Added' : 'Add'}</button></div>`).join('')}
    <div class="between" style="margin:10px 0"><span class="muted">Cart total</span><b style="font-size:20px">${rupee(S.cart.reduce((a, id) => a + SHOP.find(p => p.id === id).price, 0))}</b></div>
    <button class="btn yellow block" data-checkout ${S.cart.length ? '' : 'disabled'}>Reserve with no payment now</button><div class="tiny muted" style="text-align:center;margin-top:6px">No-cost EMI from 6 months. Concierge calls to confirm.</div>`;
  openSheet(draw(), body => { body.onclick = e => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.add) { const id = b.dataset.add; S.cart = S.cart.includes(id) ? S.cart.filter(x => x !== id) : [...S.cart, id]; save(); body.innerHTML = draw(); } else if ('checkout' in b.dataset) { S.cart = []; save(); closeSheet(); toast('Reserved. Concierge will call you today.'); notify('Order reserved', 'Concierge will confirm by phone', 'cart'); if (current === 'profile') RENDER.profile(); } }; });
}

document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const f = ACT[b.dataset.act]; if (f) { e.preventDefault(); f(b); }
});
document.addEventListener('input', e => {
  const k = e.target.dataset.set; if (!k) return;
  S.settings[k] = +e.target.value; save();
  const lab = { maxAlt: ['#altVal', ' m'], follow: ['#folVal', ' m'], threshold: ['#thVal', ' bpm'] }[k];
  if (lab) { $$(lab[0] + ',' + (k === 'threshold' ? '#thVal2' : lab[0])).forEach(x => x.textContent = S.settings[k] + lab[1]); }
  if (k === 'threshold') { $$('.zonebar u').forEach(u => u.style.left = zonePct(S.settings.threshold) + '%'); drawSparks(); }
});
$('#scrim').onclick = closeSheet;
$('#tabbar').addEventListener('click', e => { const t = e.target.closest('.tab'); if (t) go(t.dataset.go); });

/* ------------------------------------------------------------------ onboarding */
function onboarding() {
  const slides = [
    ['paraglider.jpg', 'Your story. <em>With wings.</em>', 'Red Bull SOAR is a 249 g drone that follows you without a remote. No licence, no pilot skills.'],
    ['watch.jpg', 'It feels your <em>adrenaline.</em>', 'Pair any smartwatch. When your heart races, SOAR goes slow motion and tags the moment.'],
    ['creator.jpg', 'Edit. Download. <em>Get discovered.</em>', 'Your reel is ready in a minute. Post it on the SOAR Wall and Red Bull might pick it.'],
  ];
  let i = 0; const o = $('#onb');
  const draw = () => {
    o.innerHTML = slides.map((s, k) => `<div class="slide ${k === i ? 'active' : ''}" style="background-image:url(${A}${s[0]})"><h2>${s[1]}</h2><p>${s[2]}</p>
      <div class="dots">${slides.map((_, j) => `<i class="${j === i ? 'on' : ''}"></i>`).join('')}</div>
      <div class="btnrow"><button class="btn ghost" data-skip>Skip</button><button class="btn red" data-next>${k === slides.length - 1 ? 'Get started' : 'Next'}</button></div></div>`).join('');
  };
  draw(); o.classList.add('show');
  o.onclick = e => { if (e.target.closest('[data-skip]') || (e.target.closest('[data-next]') && i === slides.length - 1)) { o.classList.remove('show'); S.onboarded = true; save(); toast('Tip: tap the heart to pair your watch'); return; } if (e.target.closest('[data-next]')) { i++; draw(); } };
}

/* ------------------------------------------------------------------ desktop boards + PWA */
function boards() {
  const feats = [['zap', 'Adrenaline Trigger', 'Heart rate from any watch starts slow motion'], ['drone', 'Live flight', 'Modes, telemetry, return home, safe zones'], ['film', 'Reel editor', 'Trim, slow-mo, filters, text, music, export'],
    ['download', 'Straight to your phone', 'Download or share reels in one tap'], ['users', 'SOAR Wall', 'Post, like, comment, weekly challenge'], ['ticket', 'Experiences', 'Book filming at adventure spots, QR pass']];
  const bf = $('#boardFeats'); if (bf) bf.innerHTML = feats.map(([i, t, s]) => `<div class="feat">${icon(i)}<div><b>${t}</b><span>${s}</span></div></div>`).join('');
  const steps = [['watch', 'Pair a watch (or demo)'], ['fly', 'Take off and record'], ['spike', 'Simulate a bungee jump'], ['create', 'Edit and export a reel'], ['community', 'Post to the SOAR Wall'], ['spots', 'Book a SOAR Experience'], ['map', 'Check safe zones']];
  const ds = $('#demoSteps'); if (ds) ds.innerHTML = steps.map(([v, t], k) => `<button class="step" data-step="${v}"><i>${k + 1}</i>${t}</button>`).join('');
  ds && ds.addEventListener('click', e => { const b = e.target.closest('[data-step]'); if (!b) return; const v = b.dataset.step; if (v === 'spike') { go('fly'); if (!Drone.flying) ACT.takeoff(); setTimeout(() => ACT.spike(), 400); } else go(v); });
  const q = $('#siteQr'); if (q && typeof qrcode !== 'undefined') q.innerHTML = `<img src="${qrData(location.href.split('#')[0], 4)}" alt="QR to open on phone">`;
}
let deferredPrompt;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; const b2 = $('#installBtn2'); if (b2) b2.style.display = 'flex'; });
function hookInstall() {
  [$('#installBtn'), $('#installBtn2')].forEach(b => b && (b.onclick = async () => {
    if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; }
    else if (/iphone|ipad/i.test(navigator.userAgent)) toast('On iPhone: tap Share, then Add to Home Screen');
    else toast('Use your browser menu: Install app / Add to Home Screen');
  }));
}
if ('serviceWorker' in navigator && location.protocol !== 'file:') window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { }));

/* ------------------------------------------------------------------ loops + boot */
setInterval(() => {
  HR.tickDemo(); Drone.tick();
  if (current === 'fly') updateFly();
  if (['home', 'watch'].includes(current)) drawSparks(); else $$('.js-bpm').forEach(b => b.textContent = HR.bpm);
  if (current === 'fly' && S.peaks.length !== renderPeakList._n) { renderPeakList._n = S.peaks.length; renderPeakList(); }
  const ck = $('#clock'); if (ck) ck.textContent = new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: false });
}, 1000);

window.icon = icon; window.__S = S; window.__save = save;
hydrateIcons();
boards(); hookInstall();
const start = (location.hash || '#home').slice(1);
current = ''; go(Object.keys(RENDER).includes(start) ? start : 'home');
if (!S.onboarded) onboarding();

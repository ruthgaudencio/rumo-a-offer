/* Service worker — Rumo à Offer
   Cache do app shell para funcionar offline e permitir instalação como app. */
const CACHE = "rumo-offer-v14";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./favicon-32.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // App shell / mesmos assets: cache-first, com atualização em segundo plano.
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(req).then(cached => {
        const network = fetch(req).then(res => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
          }
          return res;
        }).catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // Google Fonts + SDK do Firebase (gstatic): stale-while-revalidate para cachear após 1º uso online.
  if (url.hostname.includes("fonts.googleapis.com") || url.hostname.includes("gstatic.com")) {
    e.respondWith(
      caches.open(CACHE).then(c =>
        c.match(req).then(cached => {
          const net = fetch(req).then(res => { c.put(req, res.clone()); return res; }).catch(() => cached);
          return cached || net;
        })
      )
    );
  }
});

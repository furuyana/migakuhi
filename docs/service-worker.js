const CACHE_NAME = "migaki-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./main.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    return cache.addAll(urlsToCache);
  }));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then((response) => {
    return response || fetch(event.request);
  }));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((cacheNames) => {
    return Promise.all(cacheNames.map((cacheName) => {
      if (cacheName !== CACHE_NAME) {
        return caches.delete(cacheName);
      }
    }));
  }));
});

self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  self.registration.showNotification(data.title || "ミガクヒからのお知らせ", {
    body: data.body || "今日の美習慣を始めましょう！",
    icon: "./icons/icon-192.png",
  });
});
'use strict';
console.debug('SW loaded');
self.addEventListener('message', (event) => {
  if (event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('install', (event) => {
  console.debug('SW install event');
});
self.addEventListener('activate', function (event) {
  console.debug('SW activate event, claiming control');
  return self.clients.claim();
});
self.addEventListener('message', (event) => {
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
    caches.delete('roberts-employees');
    caches.delete('roberts-images');
  }
});
// Caching Section
import { precacheAndRoute } from 'workbox-precaching';
precacheAndRoute(self.__WB_MANIFEST);

import { registerRoute, Route } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

const cardsRoute = new Route(
  ({ url }) => url.pathname === '/cards',
  new NetworkFirst({
    cacheName: 'rate-me-cards',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 1,
      }),
    ],
    cacheableResponse: {
      statuses: [0, 200],
    },
  }),
);
registerRoute(cardsRoute);

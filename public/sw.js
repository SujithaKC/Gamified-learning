// Service Worker for offline functionality
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';

// Clean up old precaches
cleanupOutdatedCaches();

// Precache and route static assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache strategy for API calls (in this case, local IndexedDB doesn't need caching)
// But we cache any external resources like images
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [{
      cacheKeyWillBeUsed: async ({ request }) => {
        return `${request.url}?timestamp=${Date.now()}`;
      },
    }],
  })
);

// Cache HTML pages with Stale While Revalidate
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new StaleWhileRevalidate({
    cacheName: 'pages',
  })
);

// Cache CSS and JS files
registerRoute(
  ({ request }) =>
    request.destination === 'style' || request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// Handle offline notifications
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Show offline notification
self.addEventListener('fetch', (event) => {
  if (!navigator.onLine) {
    console.log('Application is running offline');
  }
});
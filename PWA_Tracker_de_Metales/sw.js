const CACHE_NAME = 'gold-silver-cache-v2'; // Увеличиваем версию при изменениях
const API_CACHE_NAME = 'api-cache-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/popup.js',
  '/icon-192x192.png', // Обязательные иконки для PWA
  '/icon-512x512.png'
];

// ===== Установка =====
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кеширование статических ресурсов');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// ===== Активация =====
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.map(key => {
          if (![CACHE_NAME, API_CACHE_NAME].includes(key)) {
            console.log('Удаление старого кеша:', key);
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

// ===== Стратегия кеширования =====
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Пропускаем неподдерживаемые запросы
  if (request.method !== 'GET') return;

  // Для API данных
  if (url.hostname.includes('api.gold-api.com')) {
    event.respondWith(
      fetchAndCache(request, API_CACHE_NAME)
        .catch(() => caches.match(request))
    );
  } 
  // Для статики
  else {
    event.respondWith(
      caches.match(request)
        .then(cached => cached || fetchAndCache(request, CACHE_NAME))
    );
  }
});

// ===== Вспомогательные функции =====
async function fetchAndCache(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    throw err;
  }
}

// ===== Фоновое обновление =====
async function updatePrices() {
  const cache = await caches.open(API_CACHE_NAME);
  const urls = [
    'https://api.gold-api.com/price/XAU',
    'https://api.gold-api.com/price/XAG'
  ];

  try {
    const responses = await Promise.all(
      urls.map(url => fetch(url).then(res => res.clone()))
    );

    await Promise.all(
      urls.map((url, i) => cache.put(url, responses[i]))
    );

    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'PRICE_UPDATE',
        timestamp: new Date().toISOString()
      });
    });
  } catch (err) {
    console.error('Ошибка фонового обновления:', err);
  }
}

// ===== Периодическая синхронизация =====
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-prices') {
    event.waitUntil(updatePrices());
  }
});

// ===== Push-уведомления =====
self.addEventListener('push', (event) => {
  const payload = event.data?.json() || {
    title: 'Обновление цен',
    body: 'Курс золота и серебра обновлен'
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: '/icon-192x192.png',
      vibrate: [200, 100, 200]
    })
  );
});

// ===== Обработка кликов по уведомлениям =====
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
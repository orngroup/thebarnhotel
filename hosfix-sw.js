// HosFIX Service Worker — The Barn Hotel (Ruislip)
// Firebase Cloud Messaging background handler  (v2026-11-06a)
// Same HosPRO Firebase project as the push Cloud Function; all URLs are
// resolved against this worker's own scope so taps open The Barn's HosFix.

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDnPWrPGInDRTCF1Go710XC_8_77l_72i0",
  authDomain: "brandonhall-7bdef.firebaseapp.com",
  projectId: "brandonhall-7bdef",
  storageBucket: "brandonhall-7bdef.firebasestorage.app",
  messagingSenderId: "391317900568",
  appId: "1:391317900568:web:643c9d6691f7f16d65226d"
});

const messaging = firebase.messaging();
const SCOPE = self.registration.scope;                 // e.g. https://thebarnhotel.hospro.co.uk/
const ICON  = SCOPE + 'assets/icon-192.png';
const APP   = SCOPE + 'hosfix.html';

messaging.onBackgroundMessage(payload => {
  const d     = payload.data || {};
  const title = d.title || 'HosFIX';
  const kind  = d.kind  || 'info';
  const jobId = d.jobId || '';
  const loud  = kind === 'assigned' || kind === 'urgent' || kind === 'test' || d.urgent === 'true';
  return self.registration.showNotification(title, {
    body:               d.body || '',
    icon:               ICON,
    badge:              ICON,
    tag:                kind + '-' + (jobId || Date.now()),
    renotify:           true,
    requireInteraction: loud,
    silent:             false,
    vibrate:            loud ? [600, 200, 600, 200, 900] : [300, 150, 300],
    timestamp:          Date.now(),
    data:               { url: APP + (jobId ? '#job=' + jobId : ''), jobId }
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url   = (e.notification.data && e.notification.data.url) || APP;
  const jobId = (e.notification.data && e.notification.data.jobId) || '';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url.includes('hosfix'));
      if (existing) { existing.postMessage({ type: 'hf-open-job', jobId }); return existing.focus(); }
      return clients.openWindow(url);
    })
  );
});

self.addEventListener('install',  () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

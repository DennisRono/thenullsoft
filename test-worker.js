"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var workbox_cacheable_response_1 = require("workbox-cacheable-response");
var workbox_expiration_1 = require("workbox-expiration");
var workbox_precaching_1 = require("workbox-precaching");
var workbox_routing_1 = require("workbox-routing");
var workbox_strategies_1 = require("workbox-strategies");
var componentName = "Service Worker";
// Enable debug mode during development
var DEBUG_MODE = location.hostname.endsWith(".app.local") || location.hostname === "localhost";
var DAY_IN_SECONDS = 24 * 60 * 60;
var MONTH_IN_SECONDS = DAY_IN_SECONDS * 30;
var YEAR_IN_SECONDS = DAY_IN_SECONDS * 365;
/**
 * The current version of the service worker.
 */
var SERVICE_WORKER_VERSION = "1.0.0";
if (DEBUG_MODE) {
    console.debug("Service worker version ".concat(SERVICE_WORKER_VERSION, " loading..."));
}
// ------------------------------------------------------------------------------------------
// Precaching configuration
// ------------------------------------------------------------------------------------------
(0, workbox_precaching_1.cleanupOutdatedCaches)();
// Precaching
// Make sure that all the assets passed in the array below are fetched and cached
// The empty array below is replaced at build time with the full list of assets to cache
// This is done by workbox-build-inject.js for the production build
var assetsToCache = self.__WB_MANIFEST;
// To customize the assets afterwards:
//assetsToCache = [...assetsToCache, ???];
if (DEBUG_MODE) {
    console.trace("".concat(componentName, ":: Assets that will be cached: "), assetsToCache);
}
(0, workbox_precaching_1.precacheAndRoute)(assetsToCache);
// ------------------------------------------------------------------------------------------
// Routes
// ------------------------------------------------------------------------------------------
// Default page handler for offline usage,
// where the browser does not how to handle deep links
// it's a SPA, so each path that is a navigation should default to index.html
var defaultRouteHandler = (0, workbox_precaching_1.createHandlerBoundToURL)("/index.html");
var defaultNavigationRoute = new workbox_routing_1.NavigationRoute(defaultRouteHandler, {
//allowlist: [],
//denylist: [],
});
(0, workbox_routing_1.registerRoute)(defaultNavigationRoute);
// Cache the Google Fonts stylesheets with a stale while revalidate strategy.
(0, workbox_routing_1.registerRoute)(/^https:\/\/fonts\.googleapis\.com/, new workbox_strategies_1.StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
}));
// Cache the Google Fonts webfont files with a cache first strategy for 1 year.
(0, workbox_routing_1.registerRoute)(/^https:\/\/fonts\.gstatic\.com/, new workbox_strategies_1.CacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
        new workbox_cacheable_response_1.CacheableResponsePlugin({
            statuses: [0, 200],
        }),
        new workbox_expiration_1.ExpirationPlugin({
            maxAgeSeconds: YEAR_IN_SECONDS,
            maxEntries: 30,
            purgeOnQuotaError: true, // Automatically cleanup if quota is exceeded.
        }),
    ],
}));
// Make JS/CSS fast by returning assets from the cache
// But make sure they're updating in the background for next use
(0, workbox_routing_1.registerRoute)(/\.(?:js|css)$/, new workbox_strategies_1.StaleWhileRevalidate());
// Cache images
// But clean up after a while
(0, workbox_routing_1.registerRoute)(/\.(?:png|gif|jpg|jpeg|svg)$/, new workbox_strategies_1.CacheFirst({
    cacheName: "images",
    plugins: [
        new workbox_expiration_1.ExpirationPlugin({
            maxEntries: 250,
            maxAgeSeconds: MONTH_IN_SECONDS,
            purgeOnQuotaError: true, // Automatically cleanup if quota is exceeded.
        }),
    ],
}));
// Anything authentication related MUST be performed online
(0, workbox_routing_1.registerRoute)(/(https:\/\/)?([^\/\s]+\/)api\/v1\/auth\/.*/, new workbox_strategies_1.NetworkOnly());
// Database access is only supported while online
(0, workbox_routing_1.registerRoute)(/(https:\/\/)?([^\/\s]+\/)database\/.*/, new workbox_strategies_1.NetworkOnly());
// ------------------------------------------------------------------------------------------
// Messages
// ------------------------------------------------------------------------------------------
self.addEventListener("message", function (event) {
    // TODO define/use correct data type
    if (event && event.data && event.data.type) {
        // return the version of this service worker
        if ("GET_VERSION" === event.data.type) {
            if (DEBUG_MODE) {
                console.debug("".concat(componentName, ":: Returning the service worker version: ").concat(SERVICE_WORKER_VERSION));
            }
            event.ports[0].postMessage(SERVICE_WORKER_VERSION);
        }
        // When this message is received, we can skip waiting and become active
        // (i.e., this version of the service worker becomes active)
        // Reference about why we wait: https://stackoverflow.com/questions/51715127/what-are-the-downsides-to-using-skipwaiting-and-clientsclaim-with-workbox
        if ("SKIP_WAITING" === event.data.type) {
            if (DEBUG_MODE) {
                console.debug("".concat(componentName, ":: Skipping waiting..."));
            }
            self.skipWaiting();
        }
        // When this message is received, we can take control of the clients with this version
        // of the service worker
        if ("CLIENTS_CLAIM" === event.data.type) {
            if (DEBUG_MODE) {
                console.debug("".concat(componentName, ":: Claiming clients and cleaning old caches"));
            }
            self.clients.claim();
        }
    }
});

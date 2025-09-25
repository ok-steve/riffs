import { HTMLRewriter } from "https://cdn.skypack.dev/@worker-tools/html-rewriter/base64";

/**
 * Constants
 */

const CACHE_NAME = "buildless-v1";

/**
 * Rewriter
 */

class IncludeElementHandler {
  async element(element) {
    if (!element.hasAttribute("src")) return;

    try {
      const src = element.getAttribute("src");
      const request = new URL(src, import.meta.url).toString();
      const response = await fetch(request);
      const content = await response.text();

      if (content) {
        element.replace(content, { html: true });
      }
    } catch (err) {
      console.error("could not replace element", err);
    }
  }
}

const rewriter = new HTMLRewriter().on(
  "html-include",
  new IncludeElementHandler()
);

/**
 * Utilities
 */

function shouldHandleFetch(request) {
  const url = new URL(request.url);

  const criteria = [
    // Is GET request
    request.method === "GET",
    // Request is to the same origin
    url.origin === self.location.origin,
    // An HTML document is requested
    request.headers.get("Accept").startsWith("text/html"),
  ];

  return criteria.every((bool) => bool);
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  const fetchedResponse = fetch(request).then((networkResponse) => {
    const rewrittenResponse = rewriter.transform(networkResponse);

    cache.put(request, rewrittenResponse.clone());

    return rewrittenResponse;
  });

  return cachedResponse || fetchedResponse;
}

/**
 * Event listeners
 */

self.addEventListener("install", (e) => self.skipWaiting());

self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (e) => {
  if (!shouldHandleFetch(e.request)) return;
  e.respondWith(staleWhileRevalidate(e.request));
});

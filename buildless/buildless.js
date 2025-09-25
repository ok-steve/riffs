import "html-element-include";

const base = new URL("./", import.meta.url);

navigator.serviceWorker.register(`${base.pathname}sw.js`, {
  scope: base.pathname,
  type: "module",
});

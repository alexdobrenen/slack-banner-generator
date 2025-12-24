// Single-page app routing fix for GitHub Pages
(function() {
  // Only run on GitHub Pages domain
  if (!window.location.hostname.includes('github.io')) return;

  // Get the base path from the script tag
  const scriptTag = document.querySelector('script[src$="/spa-redirect.js"]');
  const basePath = scriptTag ? scriptTag.getAttribute('data-base') || '/slack-banner-generator/' : '/slack-banner-generator/';

  // Don't redirect direct file requests or the root path
  if (window.location.pathname === basePath ||
      window.location.pathname.includes('.')) return;

  // If route doesn't include the base path, redirect
  if (!window.location.pathname.includes(basePath)) {
    window.location.replace(basePath);
  }

  // Log for debugging
  console.log('SPA routing script loaded with base:', basePath);
  console.log('Current path:', window.location.pathname);
})();
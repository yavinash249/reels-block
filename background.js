chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    try {
      if (!details.url) return {cancel: false};
      // Use regex for precise matching
      const reelPattern = /\/reel(s)?\/[A-Za-z0-9_-]+\/?$/;
      const apiPattern = /\/api\/v1\/clips\/[^\/]+\/?$/;
      if (reelPattern.test(details.url) || apiPattern.test(details.url)) {
        return {cancel: true};
      }
      return {cancel: false};
    } catch (e) {
      console.error('Error in webRequest handler:', e);
      return {cancel: false};
    }
  },
  {urls: ["*://*.instagram.com/*"]},
  ["blocking"]
);
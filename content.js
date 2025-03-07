function hideShorts() {
  const shortsSelectors = [
    'ytd-rich-section-renderer',  // shorts section on the homepage
    'ytd-reel-shelf-renderer',    // shorts shelf
    'ytd-grid-video-renderer',    // shorts in grid layout
    'ytd-rich-grid-media',        // shorts in rich media grid
    'ytd-compact-video-renderer'  // shorts in sidebar
  ];

  document.querySelectorAll(shortsSelectors.join(', ')).forEach(el => {
    let link = el.querySelector('a');
    if (!link || link.href.includes("shorts/")) {
      el.style.display = "none";
    }
  });
}

const observer = new MutationObserver(mutations => {
  let shouldRun = false;

  observer.disconnect();

  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === 1 && node.matches?.('ytd-rich-section-renderer, ytd-reel-shelf-renderer, ytd-grid-video-renderer, ytd-rich-grid-media, ytd-compact-video-renderer')) {
        shouldRun = true;
      }
    });
  });

  if (shouldRun) hideShorts();

  observer.observe(document.body, { childList: true, subtree: true });
});

// youtube dynamic reload handler
function startObserver() {
  let targetNode = document.querySelector('ytd-app');
  if (targetNode) {
    observer.observe(targetNode, { childList: true, subtree: true });
    hideShorts(); // run on startup
  } else {
    setTimeout(startObserver, 1000);
  }
}

startObserver();
chrome.runtime.onInstalled.addListener(() => {
    updateBlockedSites();
  });
  
  function updateBlockedSites() {
    chrome.storage.sync.get("blockedSites", (data) => {
      const blockedSites = data.blockedSites || [];
  
      const rules = blockedSites.map((site, index) => ({
        id: index + 1,
        priority: 1,
        action: { type: "block" },
        condition: { urlFilter: `*://${site}/*` }
      }));
  
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: rules.map(rule => rule.id),
        addRules: rules
      });
    });
  }
  
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "sync" && changes.blockedSites) {
      updateBlockedSites();
    }
  });
  
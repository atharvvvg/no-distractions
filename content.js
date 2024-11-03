chrome.storage.sync.get("blockedSites", (data) => {
    const blockedSites = data.blockedSites || [];
    const currentSite = window.location.hostname;
  
    if (blockedSites.some(site => currentSite.includes(site))) {
      document.body.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; overflow: hidden;">
          <div style="text-align:center; padding: 50px; font-size: 0.9em;">
            <img src="${chrome.runtime.getURL("error.png")}" style="width: 30%;" alt="Error">
            <h1>Cannot connect to webpage</h1>
            <p>ERR_CONNECTION_FAILED</p>
          </div>
        </div>
      `;      
      document.title = "Error - Cannot Connect";
  
      const favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.href = chrome.runtime.getURL("error.png");
      document.head.appendChild(favicon);
    }
  });
  
//Error icons created by Ainul Muttakin - Flaticon
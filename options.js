document.getElementById("addWebsite").onclick = function() {
    const website = document.getElementById("website").value.trim();
    if (website) {
      chrome.storage.sync.get("blockedSites", (data) => {
        const blockedSites = data.blockedSites || [];
        if (!blockedSites.includes(website)) {
          blockedSites.push(website);
          chrome.storage.sync.set({ blockedSites }, displayBlockedSites);
        }
        document.getElementById("website").value = "";
      });
    }
  };
  
  function displayBlockedSites() {
    chrome.storage.sync.get("blockedSites", (data) => {
      const blockedSites = data.blockedSites || [];
      const blockedList = document.getElementById("blockedList");
      blockedList.innerHTML = "";
  
      if (blockedSites.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "No blocked websites.";
        emptyMessage.style.textAlign = "center";
        emptyMessage.style.color = "#888";
        blockedList.appendChild(emptyMessage);
      } else {
        blockedSites.forEach((site, index) => {
          const li = document.createElement("li");
          li.className = "site-item";
          
          const siteText = document.createElement("span");
          siteText.className = "site-text";
          siteText.textContent = site;

          const removeButton = document.createElement("button");
          removeButton.textContent = "Remove";
          removeButton.className = "remove-button";
          removeButton.onclick = () => removeSite(index);

          li.appendChild(siteText);
          li.appendChild(removeButton);
          blockedList.appendChild(li);
        });
      }
    });
  }
  
  function removeSite(index) {
    chrome.storage.sync.get("blockedSites", (data) => {
      const blockedSites = data.blockedSites || [];
      if (index >= 0 && index < blockedSites.length) {
        blockedSites.splice(index, 1);
        chrome.storage.sync.set({ blockedSites }, displayBlockedSites);
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", displayBlockedSites);

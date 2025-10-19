function formatTime(seconds) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

const timeDisplay = document.getElementById('time-display');

// Pede o tempo para a aba atual assim que o popup é aberto
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentTab = tabs[0];
  if (currentTab && currentTab.url) {
    chrome.runtime.sendMessage({ type: 'GET_TIME', url: currentTab.url }, (response) => {
      if (response && response.time !== undefined) {
        timeDisplay.textContent = formatTime(response.time);
      } else {
        timeDisplay.textContent = "N/A";
      }
    });
  }
});
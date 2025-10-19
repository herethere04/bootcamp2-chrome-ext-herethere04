// Inicia o cronômetro quando a extensão é instalada
chrome.runtime.onInstalled.addListener(() => {
  console.log('Site Time Tracker instalado.');
  // Cria um alarme que dispara a cada segundo
  chrome.alarms.create('timeTracker', { periodInMinutes: 1 / 60 });
});

// Função para obter o domínio de uma URL
function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch (e) {
    return null;
  }
}

// Ouve o alarme e atualiza o tempo
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'timeTracker') {
    // Pega a aba ativa e na janela atual
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (activeTab && activeTab.url) {
      const domain = getDomain(activeTab.url);
      if (domain) {
        // Pega os dados salvos
        chrome.storage.local.get([domain], (result) => {
          const timeSpent = result[domain] ? result[domain] + 1 : 1;
          // Salva o novo tempo
          chrome.storage.local.set({ [domain]: timeSpent });
        });
      }
    }
  }
});

// Ouve mensagens do content script ou popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_TIME') {
    const domain = getDomain(request.url);
    if (domain) {
      chrome.storage.local.get([domain], (result) => {
        sendResponse({ time: result[domain] || 0 });
      });
      return true; // Mantém a porta de mensagem aberta para resposta assíncrona
    }
  }
});
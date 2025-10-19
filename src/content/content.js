// Cria o elemento visual do cronômetro
const timerContainer = document.createElement('div');
timerContainer.id = 'time-tracker-unique-id'; // Evita conflitos
timerContainer.className = 'time-tracker-container';
document.body.appendChild(timerContainer);

// Função para formatar segundos em HH:MM:SS
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

// Atualiza o cronômetro a cada segundo
setInterval(() => {
  chrome.runtime.sendMessage({ type: 'GET_TIME', url: window.location.href }, (response) => {
    if (chrome.runtime.lastError) {
        // Se o background não estiver pronto, ignora
        console.log(chrome.runtime.lastError.message);
        timerContainer.textContent = 'Carregando...';
    } else if (response && response.time !== undefined) {
        timerContainer.textContent = `Tempo no site: ${formatTime(response.time)}`;
    }
  });
}, 1000);
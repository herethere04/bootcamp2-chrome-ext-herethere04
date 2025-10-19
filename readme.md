# Site Time Tracker ⏱️

Uma extensão para Google Chrome (Manifest V3) que monitora e exibe o tempo gasto em cada site, ajudando você a ter mais consciência sobre seus hábitos de navegação.

📖 Sobre o Projeto

Em um mundo digital onde é fácil perder a noção do tempo, o Site Time Tracker oferece uma solução simples e não intrusiva. Ele adiciona um pequeno cronômetro flutuante em cada página, mostrando em tempo real quanto tempo você permaneceu naquele domínio. O objetivo é fornecer um feedback visual imediato sobre sua navegação, sem a necessidade de relatórios complexos.

Este projeto foi construído seguindo as diretrizes mais recentes do Google para extensões, utilizando o Manifest V3, que garante mais segurança e performance.

📸 Screenshots

Timer flutuante na página:

![Screenshot do cronômetro flutuante](icons/time%20tracker%202.png)


Popup com o resumo do tempo:

![Screenshot do cronômetro flutuante](icons/time%20tracker.png)



✨ Funcionalidades Principais
Monitoramento em Tempo Real: O tempo é contado por segundo enquanto a aba do site estiver ativa.

Interface Flutuante: Um timer discreto fica visível no canto da tela, sem atrapalhar a navegação.

Resumo no Popup: Clique no ícone da extensão para ver o tempo total gasto no domínio atual.

Persistência de Dados: O tempo registrado é salvo localmente no seu navegador, então a contagem continua de onde parou, mesmo após fechar e reabrir o Chrome.

Construído com Manifest V3: Utiliza a arquitetura mais moderna e segura para extensões do Chrome, com service workers.

🚀 Instalação (Modo Desenvolvedor)
Como esta extensão não está na Chrome Web Store, ela pode ser instalada localmente seguindo os passos abaixo:

Baixe o código:

Clone este repositório: git clone https://github.com/herethere04/bootcamp2-chrome-ext-herethere04/tree/main

Ou baixe o arquivo .zip pela página de Releases.

Descompacte o arquivo, caso tenha baixado o .zip.

Abra o Google Chrome e navegue até a página de extensões: chrome://extensions.

Ative o Modo de Desenvolvedor (Developer mode) no canto superior direito da página.

Clique em "Carregar sem compactação" (Load unpacked) e selecione a pasta raiz do projeto que você baixou.

Pronto! A extensão estará instalada e ativa no seu navegador.

🛠️ Tecnologias Utilizadas

HTML5

CSS3

JavaScript (ES6+)

Chrome Extension API (Manifest V3)

📄 Licença
Este projeto está distribuído sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
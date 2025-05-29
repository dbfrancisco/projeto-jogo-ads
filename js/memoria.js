// memoria.js
async function carregarDadosMemoria(tipo) {
    const response = await fetch('data/jogos.json');
    const dados = await response.json();
    return dados.memoria[tipo];
  }
  
  function exibirCartas(cartas) {
    const container = document.getElementById('jogo-container');
    container.innerHTML = '';
    cartas.forEach(carta => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<div class="frente">${carta.frente}</div><div class="verso">${carta.verso}</div>`;
      container.appendChild(div);
    });
  }
  
  async function iniciarJogo(tipo) {
    const cartas = await carregarDadosMemoria(tipo);
    exibirCartas(cartas);
  }
  
  // Para inicializar com um tipo padrão, ex:
  window.onload = () => iniciarJogo('xadrez');
  
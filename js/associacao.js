// associacao.js
async function carregarDadosAssociacao(tipo) {
    const response = await fetch('data/jogos.json');
    const dados = await response.json();
    return dados.associacao[tipo];
  }
  
  function exibirPerguntasAssociacao(perguntas) {
    const container = document.getElementById('jogo-container');
    container.innerHTML = '';
    perguntas.forEach(item => {
      const div = document.createElement('div');
      div.className = 'questao';
      div.innerHTML = `<p>${item.pergunta}</p><input type="text" placeholder="Resposta">`;
      container.appendChild(div);
    });
  }
  
  async function iniciarJogoAssociacao(tipo) {
    const perguntas = await carregarDadosAssociacao(tipo);
    exibirPerguntasAssociacao(perguntas);
  }
  
  window.onload = () => iniciarJogoAssociacao('xadrez');
  
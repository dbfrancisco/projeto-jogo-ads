// quiz.js
async function carregarDadosQuiz(tipo) {
    const response = await fetch('data/jogos.json');
    const dados = await response.json();
    return dados.quiz[tipo];
  }
  
  function exibirQuiz(perguntas) {
    const container = document.getElementById('jogo-container');
    container.innerHTML = '';
    perguntas.forEach((q, i) => {
      const div = document.createElement('div');
      div.className = 'pergunta';
      const opcoes = q.opcoes.map(op => `<label><input type="radio" name="pergunta${i}" value="${op}"> ${op}</label>`).join('<br>');
      div.innerHTML = `<p>${q.pergunta}</p>${opcoes}`;
      container.appendChild(div);
    });
  }
  
  async function iniciarQuiz(tipo) {
    const perguntas = await carregarDadosQuiz(tipo);
    exibirQuiz(perguntas);
  }
  
  window.onload = () => iniciarQuiz('xadrez');
  
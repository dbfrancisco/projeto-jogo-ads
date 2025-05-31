function mostrarSubmenu(tipo) {
  document.getElementById("submenu").style.display = "block";
  let titulo = "";

  switch (tipo) {
    case "memoria": titulo = "Jogo da Memória"; break;
    case "associacao": titulo = "Jogo de Associação"; break;
    case "quiz": titulo = "Quiz"; break;
  }

  document.getElementById("submenu-title").innerText = titulo;
}

function voltar() {
  document.getElementById("submenu").style.display = "none";
  document.getElementById("submenu-title").innerText = "";
}

function iniciarJogo(tipo) {
  const rotas = {
    xadrez: "jogos/xadrez.html",
    cartas: "jogos/cartas.html",
    geografia: "jogos/quiz-geografia.html",
    historia: "jogos/quiz-historia.html",
    animais: "jogos/associacao-animais.html",
    cores: "jogos/associacao-cores.html"
  };

  if (rotas[tipo]) {
    window.location.href = rotas[tipo];
  } else {
    alert("Jogo ainda não implementado.");
  }
}

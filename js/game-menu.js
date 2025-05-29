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
    alert("Carregar: " + tipo + " (iremos usar JSON ou lógica própria)");
    // Aqui futuramente você pode redirecionar ou carregar a lógica dos jogos
  }
  
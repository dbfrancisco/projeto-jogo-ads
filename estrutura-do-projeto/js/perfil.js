const usuariosURL = "http://localhost:3000/usuarios";
const jogosURL = "http://localhost:3000/jogos";

async function carregarPerfil() {
  const user = JSON.parse(localStorage.getItem("usuarioLogado"));
  const infoDiv = document.getElementById("info");

  if (!user) {
    infoDiv.innerHTML = "<p>Você precisa estar logado.</p>";
    return;
  }

  try {
    // Buscar jogos detalhados
    const jogosRes = await fetch(jogosURL);
    const jogos = await jogosRes.json();

    let html = `<p><strong>Usuário:</strong> ${user.user}</p>`;
    html += "<h3>Jogos Criados:</h3><ul>";

    if (!user.jogosCriados || user.jogosCriados.length === 0) {
      html += "<li>Nenhum jogo criado ainda.</li>";
    } else {
      user.jogosCriados.forEach((jogoId) => {
        const j = jogos.find((j) => j.id === jogoId);
        if (j) {
          html += `<li><strong>${j.titulo}</strong>: ${j.descricao}</li>`;
        }
      });
    }

    html += "</ul>";
    infoDiv.innerHTML = html;
  } catch (error) {
    infoDiv.innerHTML = "<p>Erro ao carregar perfil.</p>";
  }
}

window.onload = carregarPerfil;

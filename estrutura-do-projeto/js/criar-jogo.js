const jogosURL = "http://localhost:3000/jogos";
const usuariosURL = "http://localhost:3000/usuarios";

document.getElementById("criarJogoForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const jogo = { titulo, descricao };

  let user = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!user) {
    alert("Usuário não logado.");
    return;
  }

  try {
    // 1. Salvar jogo na coleção geral "jogos"
    const resJogo = await fetch(jogosURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...jogo, criadorId: user.id }),
    });

    if (!resJogo.ok) throw new Error("Erro ao salvar o jogo");

    const novoJogo = await resJogo.json();

    // 2. Atualizar usuário com novo jogo criado (jogosCriados)
    user.jogosCriados = user.jogosCriados || [];
    user.jogosCriados.push(novoJogo.id);

    const resUser = await fetch(`${usuariosURL}/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!resUser.ok) throw new Error("Erro ao atualizar usuário");

    // Atualiza localStorage com usuário atualizado
    localStorage.setItem("usuarioLogado", JSON.stringify(user));

    alert("Jogo criado com sucesso!");
    window.location.href = "perfil.html";
  } catch (error) {
    alert(error.message);
  }
});

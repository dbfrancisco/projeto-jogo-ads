const baseURL = "http://localhost:3000/users";


// Cadastro
document.getElementById("cadastroForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = document.getElementById("usuario").value.trim();
  const pass = document.getElementById("senha").value;

  try {
    const res = await fetch(`${baseURL}?user=${encodeURIComponent(user)}`);
    const data = await res.json();

    if (data.length > 0) {
      alert("Usuário já cadastrado!");
      return;
    }

    const resPost = await fetch(baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, pass, jogosCriados: [] }),
    });

    if (resPost.ok) {
      alert("Cadastro realizado!");
      window.location.href = "login.html";
    } else {
      alert("Erro ao cadastrar usuário.");
    }
  } catch (error) {
    alert("Erro na conexão com o servidor.");
    console.error(error);
  }
});

// Login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = document.getElementById("usuarioLogin").value.trim();
  const pass = document.getElementById("senhaLogin").value;

  try {
    const res = await fetch(`${baseURL}?user=${encodeURIComponent(user)}&pass=${encodeURIComponent(pass)}`);
    const data = await res.json();

    if (data.length === 1) {
      localStorage.setItem("usuarioLogado", JSON.stringify(data[0]));
      alert("Login bem-sucedido!");
      window.location.href = "game-menu.html";
    } else {
      alert("Usuário ou senha inválidos");
    }
  } catch (error) {
    alert("Erro na conexão com o servidor.");
    console.error(error);
  }
});

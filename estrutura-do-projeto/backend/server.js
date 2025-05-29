const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DB_PATH = './backend/db.json';

app.use(cors());
app.use(bodyParser.json());

// Função para ler dados do db.json
function readDB() {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

// Função para salvar dados no db.json
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Rota para cadastro de usuário
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
  }

  const db = readDB();
  const userExists = db.users.find(u => u.username === username);
  if (userExists) {
    return res.status(400).json({ error: 'Usuário já existe.' });
  }

  db.users.push({ id: Date.now(), username, password, jogosCriados: [] });
  writeDB(db);
  res.json({ message: 'Usuário cadastrado com sucesso!' });
});

// Rota para login simples (sem token, só exemplo)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
  }
  res.json({ message: 'Login feito com sucesso!', userId: user.id, username: user.username });
});

// Rota para salvar jogo criado por usuário
app.post('/api/jogos', (req, res) => {
  const { userId, jogo } = req.body;
  if (!userId || !jogo) {
    return res.status(400).json({ error: 'Dados incompletos.' });
  }

  const db = readDB();
  const user = db.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado.' });
  }

  // Adiciona o jogo na lista do usuário
  user.jogosCriados.push(jogo);

  // Também adiciona o jogo na lista global
  db.jogos.push(jogo);

  writeDB(db);
  res.json({ message: 'Jogo criado e salvo com sucesso!' });
});

// Rota para pegar ranking (simples)
app.get('/api/ranking', (req, res) => {
  const db = readDB();
  // Aqui pode ordenar por pontuação, só exemplo simples
  const ranking = db.ranking || [];
  res.json(ranking);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

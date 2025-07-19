const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

// Banco de dados
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Cadastro
app.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)', [nome, email, senha]);
    res.send('Usuário cadastrado!');
  } catch (err) {
    res.status(400).send('Erro ao cadastrar: ' + err.message);
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const result = await pool.query('SELECT * FROM usuarios WHERE email = $1 AND senha = $2', [email, senha]);
  if (result.rows.length > 0) res.send('Login bem-sucedido!');
  else res.status(401).send('Credenciais inválidas.');
});

// Produtos
app.get('/produtos', async (req, res) => {
  const result = await pool.query('SELECT * FROM produtos');
  res.json(result.rows);
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome TEXT,
  email TEXT UNIQUE,
  senha TEXT
);

CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  nome TEXT,
  preco NUMERIC,
  imagem TEXT
);

INSERT INTO produtos (nome, preco, imagem) VALUES
('Celular Samsung Galaxy', 1200.00, 'https://example.com/celular.jpg'),
('Notebook Lenovo', 2800.00, 'https://example.com/notebook.jpg'),
('Fone Bluetooth JBL', 300.00, 'https://example.com/fone.jpg');

const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});


let produtos = JSON.parse(fs.readFileSync('produtos.json', 'utf8'));


app.get('/produtos', (req, res) => {
  res.json(produtos);
});


app.post('/produtos', (req, res) => {
  const novoProduto = { id: produtos.length + 1, ...req.body };
  produtos.push(novoProduto);

 
  fs.writeFileSync('produtos.json', JSON.stringify(produtos, null, 2));

  res.status(201).json(novoProduto);
});
app.delete("/produtos", (req, res) => {
  const { id } = req.body;
  produtos = produtos.filter((produto) => produto.id !== id);
  fs.writeFileSync("produtos.json", JSON.stringify(produtos, null, 2));
  res.json({ mensagem: `Produto com id ${id} removido com sucesso!` });
});
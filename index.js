const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());

const lerProdutos = () => {
  try {
    const dado = fs.readFileSync("produtos.json", "utf8");
    return JSON.parse(dado);
  } catch (err) {
    return [];
  }
};
let produtos = lerProdutos();

app.get("/produtos", (req, res) => {
  res.json(produtos);
});
app.get('/produtos/:id', (req, res) => {
  const produtos = lerProdutos();
  const produto = produtos.find(p => p.id === Number(req.params.id));
  if (!produto) return res.status(404).json({ mensagem: "Não encontrado" });
  res.json(produto);
});
app.post("/produtos", (req, res) => {
  produtos = lerProdutos();
  const novoProduto = { id: produtos.length + 1, ...req.body };
  produtos.push(novoProduto);

  fs.writeFileSync("produtos.json", JSON.stringify(produtos, null, 2));

  res.status(201).json(novoProduto);
});

app.delete("/produtos/:id", (req, res) => {
  const { id } = req.params;
  produtos = lerProdutos();

  const existe = produtos.some((p) => p.id === Number(id));

  if (!existe) {
    return res.status(404).json({
      mensagem: `Produto com id ${id} não encontrado`,
    });
  }

  produtos = produtos.filter((p) => p.id !== Number(id));

  fs.writeFileSync("produtos.json", JSON.stringify(produtos, null, 2));

  return res.status(204).send();
});
module.exports = app;

if (require.main === module) {
  app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
  });
}

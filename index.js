const express=require('express');
const app = express();
app.use(express.json());
app.listen(8080,()=>{
    console.log('Servidor rodando na porta 8080');
})
let produtos = [
  { id: 1, nome: 'Gel de Limpeza Facial', preco: 35 },
  { id: 2, nome: 'Tônico Facial', preco: 40 },
  { id: 3, nome: 'Hidratante Facial', preco: 50 },
  { id: 4, nome: 'Protetor Solar FPS 50', preco: 60 },
  { id: 5, nome: 'Sérum de Vitamina C', preco: 80 },
  { id: 6, nome: 'Água Micelar', preco: 30 },
  { id: 7, nome: 'Esfoliante Facial', preco: 45 },
  { id: 8, nome: 'Máscara Facial Hidratante', preco: 25 },
  { id: 9, nome: 'Creme para Área dos Olhos', preco: 70 },
  { id: 10, nome: 'Óleo Facial', preco: 55 }
];
app.get('/produtos',(req,res)=>{
    res.json(produtos);
})
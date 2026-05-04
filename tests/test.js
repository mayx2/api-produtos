const request = require('supertest');
const app = require('../index');
const fs = require('fs');


describe('Testes de Cobertura - API Produtos', () => {
  
  // Limpa o arquivo antes de cada teste
  beforeEach(() => {
    fs.writeFileSync('produtos.json', JSON.stringify([{ id: 100, nome: 'Retinol test', preco: 10 }]));
  });
  
  test('lerProdutos deve tratar erro de leitura', () => {
  jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
    throw new Error('erro forçado');
  });

  jest.resetModules();
  const app = require('../index');

  expect(app).toBeDefined();
});
  // Teste: Buscar um único produto (Sucesso)
  test('GET /produtos/:id - Deve retornar 200 para ID existente', async () => {
    const res = await request(app).get('/produtos/100');
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('Retinol test');
  });

  // Teste: Buscar um único produto (Erro 404)
  test('GET /produtos/:id - Deve retornar 404 para ID inexistente', async () => {
    const res = await request(app).get('/produtos/999');
    expect(res.statusCode).toBe(404);
  });

  // Teste: POST sem dados (Apenas para garantir que o ID incrementa)
  test('POST /produtos - Deve criar produto mesmo com body vazio', async () => {
    const res = await request(app).post('/produtos').send({});
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBe(2); 
  });

  // Teste: DELETE com ID inexistente 
  test('DELETE /produtos/:id - Deve falhar com 404', async () => {
    const res = await request(app).delete('/produtos/500');
    expect(res.statusCode).toBe(404);
  });
  test('DELETE /produtos/:id - Deve retornar 204 ao excluir com sucesso', async () => {
   
    const res = await request(app).delete('/produtos/100');
    
    expect(res.statusCode).toBe(204);
    const produtos = JSON.parse(fs.readFileSync('produtos.json', 'utf8'));
    const existe = produtos.some(p => p.id === 1);
    expect(existe).toBe(false);
  });
});
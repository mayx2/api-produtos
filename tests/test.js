const request = require('supertest');
const app = require('../index');

test('GET /produtos', async () => {
  const res = await request(app).get('/produtos');
  expect(res.statusCode).toBe(200);
});

test('POST /produtos', async () => {
  const res = await request(app)
    .post('/produtos')
    .send({ nome: 'Teste', preco: 10 });

  expect(res.statusCode).toBe(201);
});

test('DELETE /produtos', async () => {
  const res = await request(app)
    .delete('/produtos')
    .send({ id: 1 });

  expect(res.statusCode).toBe(200);
});
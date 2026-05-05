const request = require("supertest");
const app = require("../index");
const fs = require("fs");

describe("Testes de Cobertura Total - API Produtos", () => {
  const FILE_PATH = "produtos.json";

  beforeEach(() => {
    const inicial = [{ id: 1, nome: "Item Teste", preco: 10 }];
    fs.writeFileSync(FILE_PATH, JSON.stringify(inicial));
  });

  test("GET /produtos", async () => {
    const res = await request(app).get("/produtos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /produtos/:id - Sucesso", async () => {
    const res = await request(app).get("/produtos/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe("Item Teste");
  });

  test("GET /produtos/:id - 404", async () => {
    const res = await request(app).get("/produtos/999");
    expect(res.statusCode).toBe(404);
  });

  test("POST /produtos", async () => {
    const res = await request(app).post("/produtos").send({ nome: "Novo", preco: 20 });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBe(2);
  });

  test("DELETE /produtos/:id - Sucesso", async () => {
    const res = await request(app).delete("/produtos/1");
    expect(res.statusCode).toBe(204);
  });

  test("DELETE /produtos/:id - 404", async () => {
    const res = await request(app).delete("/produtos/999");
    expect(res.statusCode).toBe(404);
  });

  test("Catch - JSON Inválido", async () => {
    fs.writeFileSync(FILE_PATH, "invalid");
    const res = await request(app).get("/produtos");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test("Catch - Arquivo Inexistente", async () => {
    if (fs.existsSync(FILE_PATH)) fs.unlinkSync(FILE_PATH);
    const res = await request(app).get("/produtos");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
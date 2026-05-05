
# API de Produtos

API simples desenvolvida com Node.js e Express para listar produtos.

## Como executar a API

1. Instale as dependências:
npm install

2. Execute o servidor:
node index.js

3. Acesse no navegador:
http://localhost:8080/produtos

## Rota disponível

GET /produtos

Retorna a lista de produtos em formato JSON.

POST /produtos

Adiciona um prodduto à lista de produtos.

**DELETE /produtos/:id**

Remove um produto através do seu ID. Caso o produto não exista, retorna 404; caso exista, remove-o e retorna 204.

## Workflow utilizado

Usei o GitHub Flow.

Funciona assim:

Crio uma branch separada a partir da main para fazer a funcionalidade ou correção.
Trabalho nessa branch e faço commits nela, mantendo a main sempre estável.
Quando termino, abro um Pull Request para revisar o código.
Depois que está tudo certo, faço merge para a main.

O bom desse modelo é que a main fica sempre atualizada e estável, e você consegue revisar o código antes de ir pra produção. No geral, é parecido com o que eu já fazia antes, mas agora de forma mais organizada.

No geral, é bem parecido com o que  já fazia, só que agora de forma mais organizada, criando a branch, fazendo tudo nela e só depois passando pra main quando estiver funcionando.

Adicionamos automação de testes de rotas que é executada automaticamente pelo Jenkins.

## Atualizações e Requisitos do Projeto

Seguindo as novas definições do projeto, foram implementados:

*   **Nova Funcionalidade:** Adicionada a rota de remoção de produtos via DELETE.
*   **Testes e Cobertura:** Foram adicionados testes automatizados garantindo que a cobertura de código seja de, no mínimo, **90%**.
*   **GitHub Actions:** Configuração de um workflow para verificação de estilo de codificação (Lint) e verificação de cobertura de testes em cada Pull Request.
*   **Segurança e Padronização:** Todos os commits realizados são **semânticos** e **assinados digitalmente**. A branch principal (baseline) está protegida.
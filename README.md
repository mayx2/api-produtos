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

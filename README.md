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

Usei o Git Feature Branch Workflow.

Escolhi esse modelo porque ele é mais simples e foi o que eu mais entendi, além de ser bem parecido com a forma que eu já estava acostumada a trabalhar.

Nesse modelo, a gente trabalha a partir da main, então os dados estão sempre atualizados, mas em uma branch separada. Isso é bom porque não corre o risco de dar erro direto na main.

Também tem a parte do Pull Request, onde dá pra pedir uma revisão do código. Então o código só vai pra main depois que estiver tudo certo.

No geral, é bem parecido com o que  já fazia, só que agora de forma mais organizada, criando a branch, fazendo tudo nela e só depois passando pra main quando estiver funcionando.
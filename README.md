

# API de Produtos

API simples desenvolvida com Node.js e Express para listar produtos.

## Como executar a API

1. Instale as dependências:

```bash
npm install

```

2. Execute o servidor:

```bash
node index.js

```

3. Acesse no navegador:
http://localhost:8080/produtos

## Rota disponível

**GET /produtos**

Retorna a lista de produtos em formato JSON.

**POST /produtos**

Adiciona um produto à lista de produtos.

**DELETE /produtos/:id**

Remove um produto através do seu ID. Caso o produto não exista, retorna 404; caso exista, remove-o e retorna 204.

## Workflow utilizado

Usei o GitHub Flow.

Funciona assim:

Crio uma branch separada a partir da main para fazer a funcionalidade ou correção.
Trabalho nessa branch e faço commits nela, mantendo a main sempre estável.
Quando termino, abro um Pull Request para revisar o código.
Depois que está tudo certo, faço merge para a main.

O bom desse modelo é que a main fica sempre atualizada e estável, permitindo revisar o código antes de ir para a produção. No geral, é bem parecido com o que eu já fazia, só que agora de forma muito mais organizada, criando a branch, desenvolvendo nela e só passando para a main quando tudo estiver funcionando.



## Atualizações e Requisitos do Projeto

Seguindo as novas definições do projeto, foram implementados:

* **Nova Funcionalidade:** Adicionada a rota de remoção de produtos via DELETE.
* **Testes e Cobertura:** Foram adicionados testes automatizados garantindo que a cobertura de código seja de, no mínimo, **90%**.
* **Segurança e Padronização:** Todos os commits realizados são **semânticos** e **assinados digitalmente**. A branch principal (baseline) está protegida.
* **Workflow de Verificação (Lint e Testes):** Integração automatizada configurada no arquivo `pull-request.yml` do GitHub Actions, disparada a cada Pull Request para validar a formatação do código (Lint) e certificar que as alterações mantêm a cobertura mínima exigida de **90%**.
* **Esteira CI/CD com Docker:** Configuração de uma pipeline automatizada via GitHub Actions com 3 jobs encadeados: `executar-projeto` (inicializa o servidor por 10 segundos em todas as branches), `build-image` (gera o build de teste local da imagem Docker em todas as branches) e `publish-image` (realiza o login seguro e publica a imagem oficial no Docker Hub com as tags `:latest` e SHA do commit exclusivamente após o merge na branch `main`).


## ![Docker Stars](https://img.shields.io/docker/stars/mayramaria/api-produtos?logo=docker&logoColor=white&color=yellow) Link do Repositório Docker Hub 

A imagem oficial desta aplicação gerada automaticamente pela esteira de CI/CD pode ser encontrada em:

* **Docker Hub:** [mayramaria/api-produtos](https://hub.docker.com/repositories/mayramaria)
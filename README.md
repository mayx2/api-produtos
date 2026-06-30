
![Vagrant](https://img.shields.io/badge/Vagrant-1868F2?logo=vagrant&logoColor=white)
![VirtualBox](https://img.shields.io/badge/VirtualBox-183A61?logo=virtualbox&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Docker Stars](https://img.shields.io/docker/stars/mayramaria/api-produtos?logo=docker&logoColor=white&color=yellow)

# API de Produtos

API simples desenvolvida com Node.js e Express para listar produtos.

## Como executar a API

1. Instale as dependências:

```bash
npm install
````

2. Execute o servidor:

```bash
node index.js
```

3. Acesse no navegador:
   [http://localhost:8080/produtos](http://localhost:8080/produtos)

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

O bom desse modelo é que a main fica sempre atualizada e estável, permitindo revisão antes de produção.

---
## Atualizações e Requisitos do Projeto

Seguindo as novas definições do projeto, foram implementados:

* **Nova Funcionalidade:** Adicionada a rota de remoção de produtos via DELETE.
* **Testes e Cobertura:** Foram adicionados testes automatizados garantindo que a cobertura de código seja de, no mínimo, **90%**.
* **Segurança e Padronização:** Todos os commits realizados são **semânticos** e **assinados digitalmente**. A branch principal (baseline) está protegida.
* **Workflow de Verificação (Lint e Testes):** Integração automatizada configurada no arquivo `pull-request.yml` do GitHub Actions, disparada a cada Pull Request para validar a formatação do código (Lint) e certificar que as alterações mantêm a cobertura mínima exigida de **90%**.
* **Esteira CI/CD com Docker:** Configuração de uma pipeline automatizada via GitHub Actions com 3 jobs encadeados: `executar-projeto` (inicializa o servidor por 10 segundos em todas as branches), `build-image` (gera o build de teste local da imagem Docker em todas as branches) e `publish-image` (realiza o login seguro e publica a imagem oficial no Docker Hub com as tags `:latest` e SHA do commit exclusivamente após o merge na branch `main`).

---

## ![Docker Stars](https://img.shields.io/docker/stars/mayramaria/api-produtos?logo=docker\&logoColor=white\&color=yellow) Link do Repositório Docker Hub

A imagem oficial desta aplicação gerada automaticamente pela esteira de CI/CD pode ser encontrada em:

* **Docker Hub:** [mayramaria/api-produtos](https://hub.docker.com/repositories/mayramaria)

---

# Infraestrutura com Vagrant

## Requisitos

Antes de executar a infraestrutura é necessário instalar:

* VirtualBox
* Vagrant

---

## Executando a infraestrutura

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Entrar na pasta do projeto

```bash
cd api-produtos
```

### 3. Executar as máquinas virtuais

```bash
vagrant up
```

Esse comando irá:

* Criar a VM1 e VM2;
* Configurar os endereços IP privados;
* Instalar o Node.js na VM2;
* Instalar as dependências do backend;
* Sincronizar a pasta do projeto com a pasta vagrant_data.

---

# Acessando as máquinas virtuais

## VM1

```bash
vagrant ssh vm1
```

## VM2

```bash
vagrant ssh vm2
```

---

# Executando o backend na VM2

Entrar na VM2:

```bash
vagrant ssh vm2
```

Ir para a pasta sincronizada:

```bash
cd /home/vagrant/vagrant_data
```

Executar o backend:

```bash
node index.js
```

---

# Testando a rota GET na VM1

Abrir outro terminal e acessar a VM1:

```bash
vagrant ssh vm1
```

Executar o comando:

```bash
curl http://192.168.33.11:3000/produtos
```


---

# Monitoramento com Netdata

## O que o playbook faz

O playbook `configurar-monitoramento.yaml` executa automaticamente os seguintes passos na VM2:
```
1. Instala ferramentas (curl, wget, stress-ng, msmtp, msmtp-mta)
        ↓
2. Instala o Netdata
        ↓
3. Configura envio de e-mail via Gmail (SMTP)
        ↓
4. Define limites de alerta de CPU:
   CPU > 80% → aviso (warn)
   CPU > 90% → crítico (crit)
        ↓
5. Reinicia o Netdata com todas as configurações aplicadas
```


---

## Como rodar o playbook

### 1. Crie o arquivo de segredos

Na pasta `data`, copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp data/secrets.yml data/secrets.yml
```

Edite o `secrets.yml`:

```yaml
netdata_email: "seu-email@gmail.com"
netdata_smtp_password: "sua-senha-de-app-do-google"
```

> O arquivo `secrets.yml` está no `.gitignore` 
> Para gerar a senha de app acesse: `myaccount.google.com/apppasswords`

### 2. Entre na VM1

```bash
vagrant ssh vm1
```

### 3. Vá até a pasta do playbook

```bash
cd /home/vagrant/vagrant_data/data
```

### 4. Execute o playbook

```bash
ansible-playbook -i inventory configurar-monitoramento.yaml -e @secrets.yml -v
```

---

## Como visualizar os dados coletados

Após rodar o playbook, acesse no navegador:
http://192.168.33.11:19999

Clique em **"Skip and use the dashboard anonymously"** para ver os gráficos em tempo real de CPU, memória e rede.

---

## Como testar o alerta de CPU

Abra um novo terminal e entre na VM2:

```bash
vagrant ssh vm2
```

Execute o stress por 5 minutos forçando 95% de uso da CPU:

```bash
stress-ng --cpu 2 --cpu-load 95 --timeout 300s
```

Acompanhe a CPU subindo no dashboard. Quando ultrapassar **80%** o alerta será disparado e o e-mail chegará automaticamente.


---
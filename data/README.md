
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
cp data/secrets.yml.example data/secrets.yml
```

Edite o `secrets.yml`:

```yaml
netdata_email: "seu-email@gmail.com"
netdata_smtp_password: "sua-senha-de-app-do-google"
```

> O arquivo `secrets.yml` está no `.gitignore`.
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

```
http://192.168.33.11:19999
```

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


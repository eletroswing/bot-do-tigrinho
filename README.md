# 🤖 Bot do Discord - Sistema Acadêmico

## 📌 Descrição

Este projeto consiste em um bot desenvolvido para a plataforma Discord utilizando Node.js.
O objetivo é simular um sistema de gerenciamento de interações e comandos, podendo ser utilizado como base para estudos de:

* Sistemas distribuídos
* Integração com APIs
* Automação de tarefas
* Desenvolvimento de bots

---

## 🚀 Tecnologias Utilizadas

* Node.js
* JavaScript
* discord.js
* dotenv
* nodemon

---

## 📂 Estrutura do Projeto

```
bot-do-tigrinho/
│
├── src/
│   ├── commands/        # Comandos do bot
│   ├── utils/           # Utilidades
│   ├── index.js         # Arquivo principal
│
├── infra/               # Logger e configurações
├── models/              # Modelos (ex: pagamento)
├── .env                 # Variáveis de ambiente
├── package.json         # Dependências do projeto
```

---

## ⚙️ Pré-requisitos

Antes de começar, você precisa ter instalado:

* Node.js (versão 18 ou superior)
* npm (gerenciador de pacotes)

---

## 🔧 Instalação

1. Clone o repositório ou extraia o projeto:

```bash
git clone https://github.com/seu-usuario/bot-do-tigrinho.git
cd bot-do-tigrinho
```

2. Instale as dependências:

```bash
npm install
```

---

## 🔑 Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
TOKEN=SEU_TOKEN_DO_DISCORD
```

---

## 🤖 Criando o Bot no Discord

1. Acesse o painel de desenvolvedores:
   https://discord.com/developers/applications

2. Clique em **New Application**

3. Vá até a aba **Bot**

4. Clique em **Add Bot**

5. Copie o **Token** e cole no `.env`

---

## ▶️ Execução

Para rodar o projeto em modo desenvolvimento:

```bash
npm run dev
```

Ou em modo normal:

```bash
npm start
```

---

## 🧪 Funcionalidades

* Registro automático de comandos (slash commands)
* Sistema modular de comandos
* Estrutura escalável para novos recursos
* Integração com eventos do Discord

---

## ❌ Funcionalidades Desativadas

Para simplificação acadêmica:

* Integração com PIX
* Integração com API de pagamentos (Asaas)

---

## 🛠️ Possíveis Melhorias

* Adicionar banco de dados
* Criar sistema de autenticação
* Implementar dashboard web
* Criar novos comandos personalizados

---

## 🐛 Problemas Comuns

### ❌ Token inválido

Verifique se o token no `.env` está correto e sem espaços.

---

### ❌ npm não funciona no PowerShell

Execute:

```powershell
Set-ExecutionPolicy RemoteSigned
```

---

### ❌ Bot não responde

Verifique:

* Se o bot foi adicionado ao servidor
* Se os comandos foram registrados

---

## 📚 Uso Acadêmico

Este projeto pode ser utilizado para:

* Trabalhos acadêmicos
* Demonstração de arquitetura de software
* Estudos de integração com APIs
* Práticas de desenvolvimento backend

---

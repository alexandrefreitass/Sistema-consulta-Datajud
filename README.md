# Sistema de Consulta - Datajud

<div align="center">
  <img src="https://github.com/user-attachments/assets/b464a97a-b174-4a17-a9f6-fec1bab55424" alt="Logo do projeto Datajud" width="600">
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Angular-20-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular 20">
  <img src="https://img.shields.io/badge/Node.js-Express-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js + Express">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="MIT License">
</div>

## 📜 Visão Geral
Aplicação web moderna desenvolvida em **Angular** para consumir e exibir dados da API pública do **Datajud**. A interface permite a consulta de informações de processos judiciais de forma simples, rápida e eficiente.

Para garantir a segurança da chave de API e evitar sua exposição no frontend, a aplicação utiliza um **servidor proxy local em Node.js com Express**, que intermedia a comunicação com a API do Datajud, adicionando a chave de autenticação a cada requisição.

---

## ✨ Tecnologias Utilizadas
- **Frontend:**
  - Angular 20
  - TypeScript
  - RxJS para programação reativa
  - Sass para estilização
  - Angular Material para componentes de UI

- **Backend (Proxy Local):**
  - Node.js
  - Express.js
  - Dotenv para gerenciamento seguro de variáveis de ambiente

---

## 🚀 Como Executar Localmente

Siga os passos abaixo para rodar o projeto na sua máquina.

**Pré-requisitos:**
* Node.js (versão 18 ou superior)
* NPM ou outro gerenciador de pacotes

### 1 · Clone o Repositório
```
git clone https://github.com/alexandrefreitass/Sistema-consulta-Datajud.git
cd Sistema-consulta-Datajud
```
### 2 · Crie o Arquivo de Variáveis de Ambiente
Crie um arquivo chamado `.env` na raiz do projeto e adicione sua chave da API do Datajud:
```
DATAJUD_API_KEY=SUA_CHAVE_DE_API_AQUI
```
### 3 · Instale as Dependências
Este comando irá baixar todas as bibliotecas necessárias para o frontend e para o servidor proxy:
```
npm install
```
### 4 · Execute a Aplicação
Como o projeto possui um frontend (Angular) e um backend (servidor proxy), você precisará de **dois terminais abertos** na pasta do projeto.

* **No primeiro terminal, inicie o servidor proxy:**
    ```
    npm run start:proxy
    ```
    *Aguarde a mensagem: `Servidor proxy local rodando em http://localhost:3000`*

* **No segundo terminal, inicie a aplicação Angular:**
    ```
    npm start
    ```

### 5 · Acesse no Navegador
Após a compilação, a aplicação estará disponível em **[http://localhost:4200/](http://localhost:4200/)**.

---

## 📄 Licença

Distribuído sob a licença **MIT**. Consulte o arquivo [LICENSE](https://github.com/alexandrefreitass/sistema-consulta-datajud/blob/main/LICENSE) para obter mais detalhes.
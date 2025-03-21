# Desafio de Desenvolvimento Evoé API

Este projeto foi criado como parte do **processo seletivo da EVOÉ**. Ele serve como uma API RESTful para cadastro de usuários/apoiadores e manipulação de dados com a utilização do **NestJS**, **Prisma** e **MySQL**.

O projeto já está **em produção**, facilitando o processo de integração. Você pode acessar a documentação completa da API, incluindo as rotas, diretamente pelo [**Swagger**](https://desafio-evoe-api-production.up.railway.app/docs). A documentação pode ser utilizada para testar todas as rotas da API de forma simples e interativa.

## Link da API em Produção

A API está disponível em produção através do link:

[https://desafio-evoe-api-production.up.railway.app](https://desafio-evoe-api-production.up.railway.app)

#### **Acesse a documentação da API em: [Documentação da API (Swagger)](https://desafio-evoe-api-production.up.railway.app/docs).**

## Requisitos

Para rodar este projeto localmente, você precisará de:

- **Node.js** (versão 20.11 ou superior)
- **Yarn** (gerenciador de pacotes)

**Nota**: Não é recomendado manter as variáveis de ambiente diretamente no projeto. Mas elas foram deixadas para facilitar o processo e o acesso ao banco de dados caso seja necessario executar locamente, mas é uma prática recomendada mantê-las separadas para segurança.

## Instalação

### Passo 1: Instalar as dependências

Clone o repositório:

```bash
git clone <repo-url>
cd <repo-folder>
```

Instale as dependências usando Yarn:

```bash
yarn install
```

## Executar projeto

Utilize o comando:

```bash
yarn start
```

Após a execução o server vai ser executado na porta `🚀 Server running at: ` [http://localhost:8000/docs](http://localhost:8000/docs),

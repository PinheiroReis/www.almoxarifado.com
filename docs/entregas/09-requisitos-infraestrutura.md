# ENTREGA 09 – Lista de Requisitos de Infraestrutura

## Sistema de Controle de Estoque para Equipamentos Eletrônicos

### 9.1.1 - Sistema Gerenciador de Banco de Dados (SGBD)

**SGBD Utilizado:** SQLite

**Versão:** 3.43+

**Justificativa:**
- SQLite é um banco de dados embutido, leve e autossuficiente
- Ideal para aplicações de pequeno a médio porte
- Não requer servidor separado
- Facilita deploy e manutenção
- Compatível com Django nativamente

**Nome do Banco de Dados:** saep_db.sqlite3

**Localização:** `/api/saep_db.sqlite3`

**Características:**
- Banco de dados relacional
- Suporte completo a ACID (Atomicidade, Consistência, Isolamento, Durabilidade)
- Suporte a chaves estrangeiras e constraints
- Transações
- Índices para otimização de queries

**Alternativas para Produção:**
- PostgreSQL 15+ (recomendado para produção)
- MySQL 8.0+
- MariaDB 10.11+

### 9.1.2 - Linguagens de Programação

#### Backend

**Linguagem:** Python

**Versão:** 3.11.7

**Frameworks e Bibliotecas:**
- Django 5.2.8 - Framework web principal
- Django REST Framework 3.16.1 - API RESTful
- Django REST Framework SimpleJWT 5.5.1+ - Autenticação JWT
- Django CORS Headers 4.9.0+ - Gerenciamento de CORS
- Django Filter 25.2 - Filtragem de queries
- Markdown 3.10 - Suporte a markdown

**Justificativa:**
- Python é uma linguagem de alto nível, legível e produtiva
- Django é um framework maduro e completo com ORM poderoso
- Vasta documentação e comunidade ativa
- Facilita desenvolvimento rápido e seguro

#### Frontend

**Linguagem:** TypeScript

**Versão:** 5.5+

**Frameworks e Bibliotecas:**
- React 18.3.1 - Biblioteca para UI
- TypeScript 5.5+ - Superset tipado de JavaScript
- Vite 5.4+ - Build tool e dev server
- Material-UI (MUI) 6.3+ - Componentes de UI
- TanStack Query 5.62+ - Gerenciamento de estado e cache
- React Router 7.2+ - Roteamento
- Axios 1.7+ - Cliente HTTP
- js-cookie 3.0+ - Gerenciamento de cookies

**Runtime:** Node.js 20+

**Package Manager:** pnpm 9+

**Justificativa:**
- TypeScript adiciona tipagem estática ao JavaScript, reduzindo erros
- React é líder em desenvolvimento de interfaces modernas
- Material-UI fornece componentes prontos e profissionais
- Vite oferece desenvolvimento rápido com hot-reload
- Stack moderna e amplamente adotada

#### Scripts e Automação

**Linguagem:** Bash Shell Script

**Versão:** 5.0+

**Arquivos:**
- `ctl.sh` - Script principal de controle
- `scripts/start.sh` - Iniciar serviços
- `scripts/stop.sh` - Parar serviços
- `scripts/restart.sh` - Reiniciar serviços
- `scripts/genenvs.sh` - Gerar arquivos de ambiente
- `scripts/createsuperuser.sh` - Criar superusuário

### 9.1.3 - Sistema Operacional

#### Desenvolvimento

**Sistema Operacional Principal:** Linux Ubuntu

**Versão:** 22.04 LTS (Jammy Jellyfish)

**Kernel:** 5.15+

**Justificativa:**
- Ubuntu LTS oferece estabilidade e suporte de longo prazo
- Compatibilidade excelente com ferramentas de desenvolvimento
- Sistema de pacotes APT facilita instalação de dependências
- Amplamente utilizado em ambientes de produção

#### Sistemas Compatíveis

**Linux:**
- Debian 11+
- Fedora 38+
- Arch Linux (rolling)
- CentOS Stream 9+

**macOS:**
- macOS Ventura (13.0+)
- macOS Sonoma (14.0+)

**Windows:**
- Windows 10 (build 19041+)
- Windows 11
- Com WSL2 (Windows Subsystem for Linux) recomendado

### 9.2 - Requisitos de Hardware

#### Mínimo

**Processador:** 
- x86_64 (64-bit)
- 2 núcleos, 2.0 GHz

**Memória RAM:** 4 GB

**Armazenamento:** 
- 10 GB de espaço livre
- SSD recomendado

**Rede:** Conexão de internet para instalação de dependências

#### Recomendado

**Processador:**
- x86_64 (64-bit)
- 4 núcleos, 2.5 GHz ou superior

**Memória RAM:** 8 GB ou superior

**Armazenamento:**
- 20 GB de espaço livre
- SSD

**Rede:** Conexão de banda larga

### 9.3 - Software Adicional

#### Containerização (Opcional)

**Docker:**
- Versão: 24.0+
- Docker Compose: 2.20+

**Justificativa:**
- Facilita deploy e isolamento de ambiente
- Garante consistência entre ambientes
- Simplifica distribuição

#### Ferramentas de Desenvolvimento

**Git:**
- Versão: 2.40+
- Controle de versão

**mise (opcional):**
- Gerenciador de versões de runtime
- Gerencia versões de Python e Node.js

**Editor/IDE (sugeridos):**
- Visual Studio Code
- PyCharm
- WebStorm

### 9.4 - Dependências de Sistema

#### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install -y \
    python3.11 \
    python3.11-venv \
    python3-pip \
    nodejs \
    npm \
    git \
    curl \
    sqlite3 \
    build-essential
```

#### Instalação do pnpm

```bash
npm install -g pnpm
```

### 9.5 - Configuração de Rede

**Portas Utilizadas:**
- 8000: API Django (Backend)
- 8080: Aplicação React (Frontend)
- 5173: Servidor de desenvolvimento Vite (alternativo)

**Protocolos:**
- HTTP para desenvolvimento
- HTTPS recomendado para produção

**CORS:**
- Configurado para permitir comunicação entre frontend e backend
- Em produção, deve ser restrito aos domínios específicos

### 9.6 - Segurança

**Autenticação:**
- JWT (JSON Web Tokens)
- Tokens de acesso com expiração de 1 dia
- Tokens de refresh com expiração de 7 dias

**Senhas:**
- Hash usando algoritmo PBKDF2-SHA256 (padrão Django)
- Salt automático por usuário

**HTTPS:**
- Recomendado para produção
- Certificado SSL/TLS necessário

### 9.7 - Backup e Manutenção

**Backup do Banco de Dados:**
- Arquivo SQLite pode ser copiado diretamente
- Recomendado backup diário do arquivo `saep_db.sqlite3`
- SQL dump disponível em `saep_db.sql`

**Logs:**
- Django mantém logs de aplicação
- Nginx/Apache (em produção) mantém logs de acesso
- Rotação de logs recomendada

### 9.8 - Performance

**Otimizações Implementadas:**
- Índices de banco de dados em campos frequentemente consultados
- Paginação em listagens grandes
- Cache de queries com TanStack Query
- Compressão de assets em produção

**Escalabilidade:**
- Arquitetura permite separação de frontend e backend
- API RESTful permite múltiplos clientes
- Banco de dados pode ser migrado para PostgreSQL para maior capacidade

### 9.9 - Monitoramento (Recomendado para Produção)

**Ferramentas Sugeridas:**
- Sentry - Monitoramento de erros
- Prometheus + Grafana - Métricas de sistema
- Uptime Robot - Monitoramento de disponibilidade
- New Relic - APM (Application Performance Monitoring)

### 9.10 - Deploy em Produção

**Servidores Web Recomendados:**
- Nginx 1.24+ (recomendado)
- Apache 2.4+

**WSGI Server:**
- Gunicorn 21.0+
- uWSGI 2.0+

**Process Manager:**
- Systemd (Linux)
- PM2 (Node.js apps)
- Supervisor

**Provedores Cloud Compatíveis:**
- AWS (Amazon Web Services)
- Google Cloud Platform
- Microsoft Azure
- DigitalOcean
- Heroku
- Railway
- Render

### Resumo Executivo

| Componente | Tecnologia | Versão |
|------------|-----------|--------|
| **SGBD** | SQLite | 3.43+ |
| **Backend Language** | Python | 3.11.7 |
| **Backend Framework** | Django | 5.2.8 |
| **Frontend Language** | TypeScript | 5.5+ |
| **Frontend Framework** | React | 18.3.1 |
| **Runtime** | Node.js | 20+ |
| **OS Desenvolvimento** | Ubuntu Linux | 22.04 LTS |
| **Containerização** | Docker | 24.0+ (opcional) |
| **Controle de Versão** | Git | 2.40+ |

---

**Data:** Novembro de 2024

**Sistema:** Sistema de Controle de Estoque para Equipamentos Eletrônicos

**Banco de Dados:** saep_db

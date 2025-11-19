# Entregas - Sistema de Controle de Estoque

Este diretório contém todas as entregas documentais do projeto conforme especificado no guia.

## Estrutura de Entregas

### ✅ ENTREGA 01 - Requisitos Funcionais
**Arquivo:** `01-requisitos-funcionais.md`

Documento completo com 23 requisitos funcionais identificados e descritos, incluindo:
- Autenticação e autorização
- Cadastro, edição e exclusão de produtos
- Gestão de estoque com movimentações
- Alertas de estoque baixo
- Validações de dados
- Interface de usuário

### ✅ ENTREGA 02 - Diagrama Entidade Relacionamento (DER)
**Arquivos:** 
- `02-der.txt` - Diagrama em formato texto ASCII
- `02-der-description.md` - Descrição detalhada do modelo

Modelo de dados completo com 4 entidades principais:
- User (Usuário)
- Category (Categoria)
- Item (Produto)
- StockMovement (Movimentação de Estoque)

### ✅ ENTREGA 03 - Script de Criação e População do Banco
**Arquivo:** `/api/saep_db.sql`

Script SQL completo com:
- Nome do banco: saep_db
- 15 produtos de exemplo (3+ por categoria)
- 6 categorias
- 3+ movimentações de estoque
- 1 superusuário (admin/admin123)
- Todas as tabelas populadas com dados de teste

**Banco de dados:** `/api/saep_db.sqlite3`

### ✅ ENTREGA 04 - Interface de Autenticação
**Arquivo:** `/app/src/pages/Login.tsx`

Interface de login com:
- Campos de usuário e senha
- Validação de campos obrigatórios
- Mensagens de erro em caso de falha
- Redirecionamento após falha ou sucesso
- Design responsivo com Material-UI

**Credenciais de teste:** admin / admin123

### ✅ ENTREGA 05 - Interface Principal
**Arquivo:** `/app/src/pages/Home.tsx`

Interface principal com:
- Exibição do nome do usuário logado
- Botão de logout funcional
- Acesso ao Cadastro de Produtos
- Acesso à Gestão de Estoque
- Design intuitivo e profissional

### ✅ ENTREGA 06 - Interface Cadastro de Produto
**Arquivo:** `/app/src/pages/Products.tsx`

Interface completa com:
- Listagem automática de produtos em tabela
- Campo de busca com filtro em tempo real
- Botão para inserir novos produtos
- Botão para editar produtos existentes
- Botão para excluir produtos (com confirmação)
- Validação de campos obrigatórios e tipos de dados
- Mensagens de alerta para dados inválidos
- Botão de retorno à interface principal
- Formulário completo com todos os campos necessários:
  - Informações básicas (nome, código, fabricante, preço)
  - Estoque (quantidade, mínimo)
  - Especificações técnicas (processador, RAM, storage, tela, câmera, OS, cor)
  - Conectividade (voltagem, conectividade, portas, peso)

### ✅ ENTREGA 07 - Interface Gestão de Estoque
**Arquivo:** `/app/src/pages/StockManagement.tsx`

Interface completa com:
- Listagem de produtos em ordem alfabética (algoritmo de ordenação JS sort)
- Seleção de produto para movimentação
- Opção de escolha entre "Entrada" ou "Saída"
- Campo de data com date picker
- Verificação automática de estoque baixo após saídas
- Alertas visuais para produtos com estoque abaixo do mínimo
- Histórico de últimas movimentações
- Validação de quantidade disponível para saídas
- Indicadores visuais (chips) para status de estoque
- Botão de retorno à interface principal

### ✅ ENTREGA 08 - Descritivo de Casos de Teste
**Arquivo:** `08-casos-de-teste.md`

Documentação completa com:
- 18 casos de teste detalhados
- Descrição de ferramentas e ambientes
- Cobertura de todos os requisitos funcionais
- Pré-condições, passos e resultados esperados
- Ambiente de desenvolvimento e teste
- Tecnologias utilizadas

### ✅ ENTREGA 09 - Lista de Requisitos de Infraestrutura
**Arquivo:** `09-requisitos-infraestrutura.md`

Documentação técnica completa:
- SGBD: SQLite 3.43+
- Linguagem Backend: Python 3.11.7
- Framework Backend: Django 5.2.8
- Linguagem Frontend: TypeScript 5.5+
- Framework Frontend: React 18.3.1
- Sistema Operacional: Ubuntu 22.04 LTS
- Requisitos de hardware
- Dependências e configurações
- Considerações de segurança e deploy

## Estrutura do Código-Fonte

### Backend (API)
```
api/
├── core/               # Configurações Django
├── accounts/           # Autenticação
├── categories/         # Categorias de produtos
├── items/             # Produtos e movimentações
│   ├── models.py      # Modelos Item e StockMovement
│   ├── serializers.py # Serializers DRF
│   ├── views.py       # ViewSets e lógica de negócio
│   ├── admin.py       # Admin Django customizado
│   └── management/    # Comando para popular DB
├── saep_db.sqlite3    # Banco de dados
└── saep_db.sql        # Dump SQL
```

### Frontend (App)
```
app/
├── src/
│   ├── pages/
│   │   ├── Login.tsx           # ENTREGA 04
│   │   ├── Home.tsx            # ENTREGA 05
│   │   ├── Products.tsx        # ENTREGA 06
│   │   └── StockManagement.tsx # ENTREGA 07
│   ├── types/          # Definições TypeScript
│   ├── hooks/          # React Hooks customizados
│   ├── utils/          # Utilitários (API, Auth)
│   └── routes.tsx      # Configuração de rotas
```

## Como Executar o Sistema

### Pré-requisitos
- Python 3.11+
- Node.js 20+
- pnpm 9+

### Backend
```bash
cd api
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers django-filter
python manage.py migrate
python manage.py populate_db  # Popular banco com dados de teste
python manage.py runserver
```

### Frontend
```bash
cd app
pnpm install
pnpm dev
```

### Acessos
- **Frontend:** http://localhost:8080
- **API:** http://localhost:8000
- **Admin Django:** http://localhost:8000/admin
- **Credenciais:** admin / admin123

## Checklist de Entregas

- [x] 01 - Requisitos Funcionais ✅
- [x] 02 - DER ✅
- [x] 03 - Script de banco (saep_db) ✅
- [x] 04 - Interface de Login ✅
- [x] 05 - Interface Principal ✅
- [x] 06 - Interface Cadastro de Produto ✅
- [x] 07 - Interface Gestão de Estoque ✅
- [x] 08 - Casos de Teste ✅
- [x] 09 - Requisitos de Infraestrutura ✅

## Requisitos Atendidos do Guia

### Interface de Login (Item 4)
✅ Autenticação de usuários  
✅ Mensagem de erro em caso de falha  
✅ Redirecionamento após falha  
✅ Design customizado

### Interface Principal (Item 5)
✅ Exibe nome do usuário logado  
✅ Botão de logout funcional  
✅ Acesso ao Cadastro de Produtos  
✅ Acesso à Gestão de Estoque  
✅ Design customizado

### Cadastro de Produtos (Item 6)
✅ Listagem em tabela com carregamento automático  
✅ Campo de busca com atualização dinâmica  
✅ Inserção de novos produtos  
✅ Edição de produtos existentes  
✅ Exclusão de produtos  
✅ Validações com alertas  
✅ Retorno à interface principal  
✅ Design customizado

### Gestão de Estoque (Item 7)
✅ Listagem alfabética (algoritmo sort JavaScript)  
✅ Seleção de produto para movimentação  
✅ Escolha entre entrada/saída  
✅ Inserção de data  
✅ Verificação automática de estoque baixo  
✅ Alertas configurados individualmente por produto  
✅ Design customizado

## Observações Importantes

1. **Banco de Dados:** O nome do banco é `saep_db.sqlite3` conforme especificado no guia (item 3.1)

2. **Dados de Teste:** O banco contém 3+ registros em todas as tabelas relevantes (item 3.2):
   - 15 produtos
   - 6 categorias
   - 3+ movimentações
   - 1 superusuário

3. **Ordenação:** A interface de gestão de estoque usa o algoritmo de ordenação `Array.sort()` do JavaScript com `localeCompare` para ordenação alfabética sensível ao idioma

4. **Estoque Baixo:** Cada produto tem configuração individual de estoque mínimo (padrão: 5 unidades)

5. **Validações:** Todas as interfaces possuem validações adequadas com mensagens de erro claras

## Conformidade com Requisitos do Cliente

✅ Sistema para loja de eletrônicos  
✅ Produtos: smartphones, tablets, notebooks, smart TVs, acessórios  
✅ Campos específicos: código, fabricante, preço  
✅ Especificações técnicas: processador, RAM, storage, tela, câmera, OS, cor  
✅ Atributos comuns: voltagem, dimensões, resolução, conectividade, portas, material, peso  
✅ Alertas de estoque baixo configuráveis por produto  
✅ Interface intuitiva e fácil de usar  
✅ Visibilidade completa do estoque em tempo real

## Tecnologias e Padrões Utilizados

- **Arquitetura:** REST API + SPA (Single Page Application)
- **Backend:** Django + Django REST Framework
- **Frontend:** React + TypeScript + Material-UI
- **Banco de Dados:** SQLite (saep_db)
- **Autenticação:** JWT (JSON Web Tokens)
- **Validações:** Cliente e servidor
- **Responsividade:** Mobile-first design
- **Acessibilidade:** Componentes Material-UI acessíveis

---

**Sistema desenvolvido conforme especificações do guia e requisitos do cliente.**

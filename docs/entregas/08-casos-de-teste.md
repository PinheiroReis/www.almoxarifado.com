# ENTREGA 08 – Casos de Teste de Software

## 8.1 - Casos de Teste

### CT01 - Login com Credenciais Válidas
**Requisito:** RF01 - Autenticação de Usuários

**Pré-condições:**
- Sistema em execução
- Usuário cadastrado no banco (admin/admin123)

**Passos:**
1. Acessar a página de login
2. Digitar username: "admin"
3. Digitar password: "admin123"
4. Clicar no botão "Entrar"

**Resultado Esperado:**
- Usuário é autenticado com sucesso
- Redirecionamento para a interface principal
- Nome do usuário exibido no cabeçalho

### CT02 - Login com Credenciais Inválidas
**Requisito:** RF01 - Autenticação de Usuários

**Pré-condições:**
- Sistema em execução

**Passos:**
1. Acessar a página de login
2. Digitar username: "usuario_invalido"
3. Digitar password: "senha_errada"
4. Clicar no botão "Entrar"

**Resultado Esperado:**
- Mensagem de erro é exibida: "Falha na autenticação. Verifique suas credenciais e tente novamente."
- Usuário permanece na página de login
- Campos do formulário permanecem acessíveis

### CT03 - Login com Campos Vazios
**Requisito:** RF01, RF11 - Validação de Dados

**Pré-condições:**
- Sistema em execução

**Passos:**
1. Acessar a página de login
2. Deixar campos vazios
3. Clicar no botão "Entrar"

**Resultado Esperado:**
- Mensagem de erro é exibida: "Por favor, preencha todos os campos."
- Formulário não é submetido
- Usuário permanece na página de login

### CT04 - Logout do Sistema
**Requisito:** RF03 - Logout de Usuário

**Pré-condições:**
- Usuário autenticado e na interface principal

**Passos:**
1. Clicar no ícone de logout no cabeçalho
2. Confirmar ação

**Resultado Esperado:**
- Usuário é deslogado
- Redirecionamento para página de login
- Cookies de autenticação são removidos

### CT05 - Listagem de Produtos
**Requisito:** RF06 - Listagem de Produtos

**Pré-condições:**
- Usuário autenticado
- Produtos cadastrados no banco

**Passos:**
1. Acessar "Cadastro de Produtos" no menu principal
2. Observar a tabela de produtos

**Resultado Esperado:**
- Tabela é exibida com todos os produtos
- Colunas visíveis: Código, Nome, Fabricante, Preço, Quantidade, Status, Ações
- Produtos são carregados automaticamente

### CT06 - Busca de Produtos por Nome
**Requisito:** RF07 - Busca de Produtos

**Pré-condições:**
- Usuário na tela de cadastro de produtos
- Produtos cadastrados

**Passos:**
1. Digitar "iPhone" no campo de busca
2. Observar atualização da tabela

**Resultado Esperado:**
- Tabela atualiza em tempo real
- Apenas produtos com "iPhone" no nome são exibidos
- Outros produtos são filtrados

### CT07 - Cadastro de Novo Produto
**Requisito:** RF08 - Cadastro de Produto

**Pré-condições:**
- Usuário na tela de cadastro de produtos

**Passos:**
1. Clicar no botão "Novo Produto"
2. Preencher campos obrigatórios:
   - Nome: "Teste Produto"
   - Código: "TEST-001"
   - Fabricante: "Teste Inc"
   - Preço: "999.99"
   - Quantidade: "10"
   - Estoque Mínimo: "5"
3. Clicar em "Salvar"

**Resultado Esperado:**
- Diálogo fecha automaticamente
- Novo produto aparece na listagem
- Produto é salvo no banco de dados

### CT08 - Validação de Campos Obrigatórios
**Requisito:** RF11 - Validação de Dados

**Pré-condições:**
- Diálogo de novo produto aberto

**Passos:**
1. Deixar campo "Nome" vazio
2. Preencher outros campos obrigatórios
3. Clicar em "Salvar"

**Resultado Esperado:**
- Mensagem de erro é exibida: "Nome é obrigatório"
- Formulário não é submetido
- Diálogo permanece aberto

### CT09 - Edição de Produto Existente
**Requisito:** RF09 - Edição de Produto

**Pré-condições:**
- Produto cadastrado na listagem

**Passos:**
1. Clicar no ícone de edição do produto
2. Modificar o campo "Preço" para "1299.99"
3. Clicar em "Salvar"

**Resultado Esperado:**
- Diálogo fecha
- Produto atualizado na listagem com novo preço
- Alterações salvas no banco

### CT10 - Exclusão de Produto
**Requisito:** RF10 - Exclusão de Produto

**Pré-condições:**
- Produto cadastrado na listagem

**Passos:**
1. Clicar no ícone de exclusão
2. Confirmar exclusão na mensagem

**Resultado Esperado:**
- Produto removido da listagem
- Produto excluído do banco de dados
- Listagem atualiza automaticamente

### CT11 - Listagem Alfabética de Produtos (Estoque)
**Requisito:** RF13 - Listagem Alfabética

**Pré-condições:**
- Usuário autenticado
- Múltiplos produtos cadastrados

**Passos:**
1. Acessar "Gestão de Estoque" no menu principal
2. Observar ordem da listagem

**Resultado Esperado:**
- Produtos exibidos em ordem alfabética por nome
- Primeiro produto começa com "A" (se existir)
- Último produto começa com "Z" (se existir)

### CT12 - Movimentação de Entrada
**Requisito:** RF14, RF15, RF16, RF17 - Movimentação de Estoque

**Pré-condições:**
- Usuário na tela de gestão de estoque
- Produto com quantidade inicial de 10 unidades

**Passos:**
1. Clicar em "Movimentar" no produto
2. Selecionar tipo: "Entrada"
3. Digitar quantidade: "5"
4. Selecionar data atual
5. Clicar em "Confirmar"

**Resultado Esperado:**
- Diálogo fecha
- Quantidade do produto atualizada para 15
- Movimentação registrada no histórico
- Tabela de produtos atualiza automaticamente

### CT13 - Movimentação de Saída
**Requisito:** RF14, RF15, RF16, RF17 - Movimentação de Estoque

**Pré-condições:**
- Usuário na tela de gestão de estoque
- Produto com quantidade de 15 unidades

**Passos:**
1. Clicar em "Movimentar" no produto
2. Selecionar tipo: "Saída"
3. Digitar quantidade: "3"
4. Selecionar data atual
5. Clicar em "Confirmar"

**Resultado Esperado:**
- Diálogo fecha
- Quantidade do produto atualizada para 12
- Movimentação registrada no histórico
- Tabela atualiza automaticamente

### CT14 - Alerta de Estoque Baixo
**Requisito:** RF18, RF19 - Verificação de Estoque Baixo

**Pré-condições:**
- Produto com quantidade = 6 e mínimo = 5

**Passos:**
1. Fazer movimentação de saída de 2 unidades
2. Observar alertas

**Resultado Esperado:**
- Alerta é exibido com mensagem: "ALERTA: O estoque de [produto] está abaixo do mínimo!"
- Produto marcado visualmente com indicador de estoque baixo
- Produto aparece na lista de alertas

### CT15 - Validação de Saída Maior que Estoque
**Requisito:** RF22 - Validação de Quantidade

**Pré-condições:**
- Produto com quantidade de 5 unidades

**Passos:**
1. Tentar movimentação de saída de 10 unidades
2. Clicar em "Confirmar"

**Resultado Esperado:**
- Mensagem de erro é exibida: "Quantidade insuficiente em estoque. Disponível: 5"
- Movimentação não é registrada
- Quantidade permanece inalterada

### CT16 - Histórico de Movimentações
**Requisito:** RF20 - Histórico de Movimentações

**Pré-condições:**
- Múltiplas movimentações registradas

**Passos:**
1. Acessar tela de gestão de estoque
2. Rolar até seção "Últimas Movimentações"

**Resultado Esperado:**
- Tabela com movimentações é exibida
- Colunas: Data, Produto, Tipo, Quantidade, Observações
- Movimentações ordenadas da mais recente para mais antiga

### CT17 - Navegação entre Telas
**Requisito:** RF04, RF05, RF12, RF21 - Navegação

**Pré-condições:**
- Usuário autenticado

**Passos:**
1. Da tela principal, clicar em "Cadastro de Produtos"
2. Clicar em botão voltar
3. Clicar em "Gestão de Estoque"
4. Clicar em botão voltar

**Resultado Esperado:**
- Transições entre telas funcionam corretamente
- Usuário sempre retorna à interface principal ao clicar em voltar
- Nenhum erro de navegação

### CT18 - Exibição de Indicadores de Estoque
**Requisito:** RF19 - Exibição de Produtos com Estoque Baixo

**Pré-condições:**
- Produtos com estoque baixo e normal

**Passos:**
1. Acessar gestão de estoque
2. Observar área de alertas

**Resultado Esperado:**
- Produtos com estoque baixo têm chip "BAIXO" amarelo
- Produtos com estoque OK têm chip "OK" verde
- Lista de produtos com estoque baixo é exibida no topo

## 8.2 - Ferramentas e Ambientes de Teste

### Ferramentas Utilizadas

#### Frontend
- **Framework:** React 18 com TypeScript
- **UI Library:** Material-UI (MUI) v5
- **State Management:** TanStack Query (React Query)
- **HTTP Client:** Axios
- **Build Tool:** Vite
- **Package Manager:** pnpm
- **Navegadores de Teste:** 
  - Chrome 120+
  - Firefox 121+
  - Edge 120+

#### Backend
- **Framework:** Django 5.2.8
- **API:** Django REST Framework 3.16.1
- **Autenticação:** Django REST Framework SimpleJWT
- **SGBD:** SQLite 3 (saep_db.sqlite3)
- **Python:** 3.11+

#### Infraestrutura
- **Containerização:** Docker + Docker Compose
- **Gerenciador de Versões:** mise
- **Scripts:** Bash shell scripts
- **CI/CD:** GitHub Actions (se configurado)

### Ambiente de Desenvolvimento

#### Sistema Operacional
- **Principal:** Linux (Ubuntu 22.04 LTS)
- **Compatível:** Windows 10/11, macOS 13+

#### Configuração do Ambiente
```bash
# Backend
- Python 3.11+
- Django 5.2.8
- SQLite3

# Frontend
- Node.js 20+
- pnpm 8+
- TypeScript 5+
```

#### Portas Utilizadas
- **Backend API:** 8000
- **Frontend App:** 8080

### Ambiente de Teste

#### Dados de Teste
- **Superusuário:** admin / admin123
- **Categorias:** 6 categorias (Smartphones, Notebooks, Tablets, Smart TVs, Smartwatches, Acessórios)
- **Produtos:** 15 produtos de exemplo com dados completos
- **Movimentações:** 3 movimentações de exemplo

#### Execução dos Testes

**Preparação:**
```bash
# Iniciar API
cd api
python manage.py runserver

# Iniciar Frontend (em outro terminal)
cd app
pnpm dev
```

**Acesso:**
- Frontend: http://localhost:8080
- API: http://localhost:8000
- Admin Django: http://localhost:8000/admin

#### Tipos de Teste Realizados

1. **Testes Funcionais:** Validação de todos os requisitos funcionais
2. **Testes de Interface:** Validação de elementos visuais e usabilidade
3. **Testes de Integração:** Comunicação entre frontend e backend
4. **Testes de Validação:** Validação de formulários e dados
5. **Testes de Navegação:** Fluxos completos entre telas
6. **Testes de Banco de Dados:** Operações CRUD e integridade

#### Critérios de Aceitação

- ✅ Todos os requisitos funcionais implementados
- ✅ Interface intuitiva e responsiva
- ✅ Validações de dados funcionando
- ✅ Alertas de estoque baixo operacionais
- ✅ Movimentações de estoque registrando corretamente
- ✅ Busca e ordenação funcionando
- ✅ CRUD completo de produtos
- ✅ Autenticação e autorização funcionando

### Observações

- Os testes foram realizados de forma manual seguindo os casos de teste descritos
- Cada funcionalidade foi testada individualmente e em fluxos completos
- Não foram identificados bugs críticos durante os testes
- O sistema atende todos os requisitos especificados no guia

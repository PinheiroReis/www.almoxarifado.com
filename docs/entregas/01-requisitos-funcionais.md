# ENTREGA 01 – Requisitos Funcionais

## Sistema de Controle de Estoque para Equipamentos Eletrônicos

### 1. Requisitos Funcionais

#### RF01 - Autenticação de Usuários
**Descrição:** O sistema deve permitir que usuários façam login com credenciais (usuário e senha).

**Critérios de Aceitação:**
- O sistema deve validar as credenciais fornecidas
- Em caso de falha na autenticação, o sistema deve exibir mensagem de erro clara
- Após falha, o usuário deve ser redirecionado à tela de login
- Após sucesso, o usuário deve ser redirecionado à interface principal

#### RF02 - Exibição de Informações do Usuário
**Descrição:** O sistema deve exibir o nome do usuário logado na interface principal.

**Critérios de Aceitação:**
- O nome do usuário deve estar visível em todas as telas após o login
- O nome deve ser exibido na barra superior da aplicação

#### RF03 - Logout de Usuário
**Descrição:** O sistema deve permitir que o usuário faça logout.

**Critérios de Aceitação:**
- Deve haver um botão de logout visível na interface
- Ao clicar em logout, o usuário deve ser deslogado e redirecionado à tela de login
- As credenciais de autenticação devem ser removidas

#### RF04 - Navegação para Cadastro de Produtos
**Descrição:** O sistema deve fornecer acesso à interface de cadastro de produtos.

**Critérios de Aceitação:**
- Deve haver um botão/link na interface principal para acessar o cadastro de produtos
- Ao clicar, o usuário deve ser direcionado à tela de cadastro de produtos

#### RF05 - Navegação para Gestão de Estoque
**Descrição:** O sistema deve fornecer acesso à interface de gestão de estoque.

**Critérios de Aceitação:**
- Deve haver um botão/link na interface principal para acessar a gestão de estoque
- Ao clicar, o usuário deve ser direcionado à tela de gestão de estoque

#### RF06 - Listagem de Produtos
**Descrição:** O sistema deve listar todos os produtos cadastrados no banco de dados.

**Critérios de Aceitação:**
- Os produtos devem ser exibidos em formato de tabela
- A listagem deve ser carregada automaticamente ao acessar a interface
- Devem ser exibidos: código, nome, fabricante, preço, quantidade, status

#### RF07 - Busca de Produtos
**Descrição:** O sistema deve permitir buscar produtos por termo de pesquisa.

**Critérios de Aceitação:**
- Deve haver um campo de busca visível
- A busca deve funcionar por: nome, código ou fabricante
- A tabela deve atualizar automaticamente com os resultados

#### RF08 - Cadastro de Produto
**Descrição:** O sistema deve permitir o cadastro de novos produtos.

**Critérios de Aceitação:**
- Deve haver um botão "Novo Produto"
- Ao clicar, deve abrir um formulário com os seguintes campos obrigatórios:
  - Nome
  - Código (único)
  - Fabricante
  - Preço
  - Quantidade
  - Estoque Mínimo
- Campos opcionais para especificações técnicas:
  - Processador, RAM, Armazenamento
  - Tamanho da tela, Câmera, Sistema Operacional
  - Cor, Voltagem, Peso
  - Conectividade, Portas
- O sistema deve salvar o produto no banco de dados

#### RF09 - Edição de Produto
**Descrição:** O sistema deve permitir editar produtos existentes.

**Critérios de Aceitação:**
- Deve haver um botão de edição para cada produto na listagem
- Ao clicar, deve abrir o formulário preenchido com os dados atuais
- O usuário deve poder modificar qualquer campo
- As alterações devem ser salvas no banco de dados

#### RF10 - Exclusão de Produto
**Descrição:** O sistema deve permitir excluir produtos.

**Critérios de Aceitação:**
- Deve haver um botão de exclusão para cada produto
- Antes de excluir, deve solicitar confirmação do usuário
- Após confirmar, o produto deve ser removido do banco de dados
- A listagem deve atualizar automaticamente

#### RF11 - Validação de Dados de Produto
**Descrição:** O sistema deve validar os dados inseridos no cadastro/edição de produtos.

**Critérios de Aceitação:**
- Campos obrigatórios devem ser preenchidos
- O preço deve ser um valor numérico positivo
- A quantidade e estoque mínimo devem ser números inteiros
- Mensagens de erro devem ser exibidas para campos inválidos
- O formulário não deve ser submetido se houver erros

#### RF12 - Retorno à Interface Principal (Produtos)
**Descrição:** O sistema deve permitir retornar à interface principal a partir do cadastro de produtos.

**Critérios de Aceitação:**
- Deve haver um botão de voltar visível
- Ao clicar, o usuário deve retornar à interface principal

#### RF13 - Listagem Alfabética de Produtos (Estoque)
**Descrição:** Na interface de gestão de estoque, os produtos devem ser listados em ordem alfabética.

**Critérios de Aceitação:**
- Os produtos devem ser ordenados alfabeticamente por nome
- A ordenação deve usar um algoritmo de ordenação adequado

#### RF14 - Seleção de Produto para Movimentação
**Descrição:** O sistema deve permitir selecionar um produto para movimentação de estoque.

**Critérios de Aceitação:**
- Cada produto deve ter um botão "Movimentar"
- Ao clicar, deve abrir um formulário de movimentação

#### RF15 - Escolha do Tipo de Movimentação
**Descrição:** O sistema deve permitir escolher entre entrada ou saída de estoque.

**Critérios de Aceitação:**
- Deve haver opção para selecionar "Entrada" ou "Saída"
- Apenas uma opção pode ser selecionada por vez
- O campo é obrigatório

#### RF16 - Inserção da Data de Movimentação
**Descrição:** O sistema deve permitir inserir a data da movimentação.

**Critérios de Aceitação:**
- Deve haver um campo de data
- O campo deve ser do tipo date picker
- A data padrão deve ser a data atual
- O campo é obrigatório

#### RF17 - Registro de Movimentação
**Descrição:** O sistema deve registrar a movimentação de estoque.

**Critérios de Aceitação:**
- Ao confirmar a movimentação:
  - Para "Entrada": adicionar quantidade ao estoque
  - Para "Saída": subtrair quantidade do estoque
- A movimentação deve ser salva no histórico
- A quantidade do produto deve ser atualizada no banco

#### RF18 - Verificação de Estoque Baixo
**Descrição:** O sistema deve verificar automaticamente se o estoque está abaixo do mínimo após movimentações de saída.

**Critérios de Aceitação:**
- Após cada saída, o sistema deve comparar quantidade atual com mínimo configurado
- Se quantidade <= mínimo, deve exibir alerta
- O alerta deve informar: nome do produto, quantidade atual e estoque mínimo

#### RF19 - Exibição de Produtos com Estoque Baixo
**Descrição:** O sistema deve exibir visualmente produtos com estoque abaixo do mínimo.

**Critérios de Aceitação:**
- Produtos com estoque baixo devem ter indicação visual (chip/badge)
- Deve haver uma área destacada listando produtos com estoque baixo
- A lista deve incluir: nome, código, quantidade atual e mínimo

#### RF20 - Histórico de Movimentações
**Descrição:** O sistema deve exibir o histórico de movimentações de estoque.

**Critérios de Aceitação:**
- Deve exibir tabela com últimas movimentações
- Informações: data, produto, tipo (entrada/saída), quantidade, observações
- As movimentações devem estar ordenadas por data (mais recentes primeiro)

#### RF21 - Retorno à Interface Principal (Estoque)
**Descrição:** O sistema deve permitir retornar à interface principal a partir da gestão de estoque.

**Critérios de Aceitação:**
- Deve haver um botão de voltar visível
- Ao clicar, o usuário deve retornar à interface principal

#### RF22 - Validação de Quantidade em Movimentação
**Descrição:** O sistema deve validar a quantidade na movimentação de estoque.

**Critérios de Aceitação:**
- A quantidade deve ser maior que zero
- Para saídas, a quantidade não pode exceder o estoque disponível
- Mensagens de erro devem ser exibidas para valores inválidos

#### RF23 - Configuração Individual de Estoque Mínimo
**Descrição:** O sistema deve permitir configurar estoque mínimo individualmente para cada produto.

**Critérios de Aceitação:**
- No cadastro/edição do produto, deve haver campo "Estoque Mínimo"
- O valor padrão deve ser 5
- Pode ser ajustado conforme necessidade de cada produto

### 2. Requisitos Não-Funcionais

#### RNF01 - Usabilidade
O sistema deve ser intuitivo e fácil de usar, mesmo para usuários sem experiência em informática.

#### RNF02 - Performance
As listagens e buscas devem responder em menos de 2 segundos.

#### RNF03 - Responsividade
A interface deve ser funcional em diferentes tamanhos de tela.

#### RNF04 - Disponibilidade
O sistema deve estar disponível 24/7 com mínimo de downtime.

#### RNF05 - Segurança
As credenciais devem ser armazenadas de forma segura e as sessões devem expirar adequadamente.

# ENTREGA 02 – Diagrama Entidade Relacionamento (DER)

## Descrição do Modelo de Dados

### Entidades

#### 1. User (Usuário)
Tabela padrão do Django para autenticação.
- **Atributos:**
  - id (PK)
  - username (único)
  - password (hash)
  - email
  - first_name
  - last_name
  - is_active
  - date_joined

#### 2. Category (Categoria)
Categorias de produtos eletrônicos.
- **Atributos:**
  - id (PK)
  - name (único) - Nome da categoria
  - created_at - Data de criação

#### 3. Item (Produto)
Produtos eletrônicos do estoque.
- **Atributos Principais:**
  - id (PK)
  - name - Nome do produto
  - code (único) - Código único do produto
  - manufacturer - Fabricante
  - price - Preço
  - description - Descrição
  
- **Atributos de Estoque:**
  - quantity - Quantidade em estoque
  - minimum_stock - Estoque mínimo configurado
  - status - Status do produto (IN_USE, MAINTENANCE, AVAILABLE, BROKEN)
  
- **Especificações Técnicas:**
  - processor - Processador
  - ram - Memória RAM
  - storage - Armazenamento
  - screen_size - Tamanho da tela
  - camera_resolution - Resolução da câmera
  - operating_system - Sistema operacional
  - color - Cor
  
- **Atributos Comuns:**
  - voltage - Voltagem
  - dimensions - Dimensões
  - resolution - Resolução
  - connectivity - Conectividade (Wi-Fi, Bluetooth, etc.)
  - ports - Portas (USB, HDMI, etc.)
  - material - Material de construção
  - weight - Peso
  
- **Metadados:**
  - created_at - Data de criação
  - updated_at - Data de última atualização

#### 4. StockMovement (Movimentação de Estoque)
Histórico de movimentações de entrada e saída.
- **Atributos:**
  - id (PK)
  - item_id (FK) - Referência ao produto
  - movement_type - Tipo (ENTRADA ou SAIDA)
  - quantity - Quantidade movimentada
  - date - Data da movimentação
  - notes - Observações
  - created_at - Data de registro

### Relacionamentos

1. **Category ↔ Item (N:N)**
   - Um produto pode pertencer a múltiplas categorias
   - Uma categoria pode conter múltiplos produtos
   - Implementado através de tabela intermediária items_item_categories

2. **Item ↔ StockMovement (1:N)**
   - Um produto pode ter múltiplas movimentações
   - Uma movimentação pertence a apenas um produto
   - Chave estrangeira: StockMovement.item_id → Item.id
   - Deleção em cascata

### Regras de Negócio

1. O código do produto deve ser único no sistema
2. O nome da categoria deve ser único
3. Movimentações de saída não podem exceder a quantidade disponível
4. Após cada movimentação, a quantidade do produto é automaticamente atualizada:
   - ENTRADA: quantity += movimento.quantity
   - SAIDA: quantity -= movimento.quantity
5. Alertas de estoque baixo são acionados quando: quantity <= minimum_stock
6. Todos os campos numéricos de quantidade devem ser não-negativos

### Índices e Otimizações

- Índice único em Item.code
- Índice único em Category.name
- Índice em Item.name para buscas
- Índice em StockMovement.date para ordenação
- Ordenação padrão de Item por nome (alfabético)
- Ordenação padrão de StockMovement por data decrescente

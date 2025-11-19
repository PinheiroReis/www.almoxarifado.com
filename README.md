# www.almoxarifado.com

Este é um projeto básico para gestão de diferentes items em estoque. Ele entende os items como modelos do Django, que é responsável por dizer quantas unidades estão disponíveis de cada coisa, além de fornecer o painel de administração built-in dele, por onde os dados são inseridos. No frontend, os dados são apenas exibidos, além de haver links para acessar/editar/criar objetos por meio do painel Django (não do `restframework`, mas do próprio Django). Tudo é feito visando que o site pode ser executado por uma máquina com Windows ou Linux.

O design é simples, intuitivo e belo, com algumas cores para dar contraste e evitar uma interface monótona.

Ele respeita o que está contido em [docs/](./docs/), onde estão os requisitos pedidos.

Sendo assim esse é um projeto com Docker, Docker Compose, Django, Django REST Framework, NodeJS, Typescript, TanstackQuery, Axios (por meio de instância `api`), Material UI, pnpm (com scripts), diversos scripts `.sh`, mise (para gerenciar versões) e alguns outros utilitários.

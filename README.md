# Rede (de alguns) Usuários do GitHub

**Número da Lista**: 19

**Conteúdo da Disciplina**: Grafos1

## Alunos

| Matrícula  | Aluno                     |
| ---------- | ------------------------- |
| 16/0127912 | João Vitor Ferreira Alves |
| 16/0149410 | Yudi Yamane de Azevedo    |

## Sobre

Esse app monta um grafo com os usuários membros da organização
[Projetos de Algoritmos](https://github.com/projeto-de-algoritmos) no GitHub.
Cada círculo é um usuário e as linhas representam as relações de seguidos e
seguidores.

> As linhas não possuem direção visualmente, mas as arestas no
> grafo **são** direcionadas.

Você pode escolher dois usuários e o app vai te mostrar o menor caminho que liga
os dois de acordo com os seus seguidores.

## Screenshots

<img src="./docs/deafult.png" width="400" alt="Screenshot da tela padrão.">

Screenshot da tela padrão.

<img src="./docs/input-unfiltered.png" width="400" alt="Input não filtrado">

Você pode selecionar um usuário clicando no select.

<img src="./docs/input-filtered.png" width="400" alt="Input filtrado">

Você pode filtrar os usuário no campo de texto.

<img src="./docs/path.png" width="400" alt="Mostra o caminho entre dois usuários">

Mostra o caminho entre dois usuários.

## Instalação

**Linguagem**: TypeScript

**Framework**: Svelte

Você precisa do [Node.js](https://nodejs.org/en) versão 16+.

## Uso

Escolha nas caixas de seleção o par de usuário para que você
descubra o caminho de seguidores entre eles.

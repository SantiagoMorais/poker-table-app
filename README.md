# MesaPokerApp

Sistema para gerenciamento de mesas de poker presenciais, com administração de fichas e regras, criado com Fastify e arquitetura SOLID.

## Sumário
- [Stack](#-stack)
- [Funcionalidades](#-funcionalidades)
    - [Fluxo Geral](#fluxo-geral)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Instalação](#-instalação-em-breve)
- [Notas](#-notas)
- [Autor](#autor)

## 📦 Stack

- Fastify
- Socket.io (comunicação em tempo real)
- Zod (validações)
- TypeScript
- Arquitetura SOLID (Use Cases, Repositories, Controllers, Errors)

## ✅ Funcionalidades

### Fluxo geral

1. Jogador pode:
   - Criar uma mesa (nome + nome do jogador)
   - Buscar uma mesa por token
2. Mesa retorna QR Code + token de acesso.
3. Jogadores entram apenas com token.
4. Dono da mesa aprova manualmente quem entra.
5. Máximo de 8 jogadores por mesa.
6. Dono decide quando iniciar a partida.
7. Após início, ninguém entra nem sai.
8. Dono pode expulsar antes de começar.
9. Mesa entra em pausa com permissão do dono.
10. Jogadores têm 60s por jogada.
11. Apostas automáticas (small/big blinds).
12. Carteiras atualizadas em tempo real.
13. Empates e potes respeitam regras do poker.
14. Jogadores zerados continuam apenas como espectadores.

---

## 📁 Estrutura de pastas

```
src/
├── core/ # Entidades e lógica principal
├── use-cases/ # Casos de uso
├── repositories/ # Interfaces e implementações de acesso a dados
├── controllers/ # Lógica HTTP
├── routes/ # Registro de rotas
├── errors/ # Classes de erros personalizados
├── utils/ # Funções auxiliares
└── server.ts # Instância Fastify
```

## ⚙️ Instalação (em breve)

```bash
git clone https://github.com/SantiagoMoras/poker-table-app
cd mesa-poker-app
npm install
npm run server
```

## 📝 Notas

- As mesas não são públicas.
- Tokens são únicos e servem para entrar.
- Dados armazenados em memória por enquanto.
- Futuramente podemos integrar Redis ou banco.

## Autor

- GitHub - [Felipe Santiago Morais](https://github.com/SantiagoMorais)
- Linkedin - [Felipe Santiago](https://www.linkedin.com/in/felipe-santiago-873025288/)
- Instagram - [@felipe.santiago.morais](https://www.instagram.com/felipe.santiago.morais)
- Email - <a href="mailto:contatofelipesantiago@gmail.com" target="blank">contatofelipesantiago@gmail.com</a>
- <a href="https://api.whatsapp.com/send?phone=5531996951033&text=Hi%2C%20Felipe%21%20I%20got%20your%20contact%20from%20your%20github.">Whatsapp</a>



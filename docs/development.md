# Trenzora Development Documentation

## Table of Contents
1. [Project Structure](#project-structure)
2. [Setup Instructions](#setup-instructions)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Environment Configuration](#environment-configuration)
6. [Testing](#testing)
7. [Debugging](#debugging)
8. [Deployment](#deployment)
9. [Contribution Guidelines](#contribution-guidelines)

---

## 1. Project Structure

```plaintext
trenzora/
├── src/
│   ├── app/                # Next.js frontend (UI, pages, components)
│   ├── components/         # Shared React components
│   └── utils/              # Frontend utilities
├── telegram-trading-bot/   # Telegram bot backend
│   ├── agent/              # Market intelligence & alert agent
│   ├── src/
│   │   ├── commands/       # Telegram bot commands
│   │   ├── lib/            # Core logic (swap, db, encryption, etc.)
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Helpers, constants, formatters
│   ├── index.ts            # Bot entry point
│   └── README.md           # Bot-specific documentation
├── public/                 # Static assets (images, fonts)
├── docs/                   # Project documentation
├── package.json            # Project dependencies and scripts
├── README.md               # Main project documentation
└── ...
```

---

## 2. Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Telegram account (for bot testing)

### Installation
```bash
# Clone the repository
$ git clone https://github.com/MakindeAhmed2110/trenzora.git
$ cd trenzora

# Install dependencies (root)
$ npm install

# Install dependencies for the Telegram bot
$ cd telegram-trading-bot
$ npm install
```

### Environment Variables
- Copy `.env.example` to `.env` in both the root and `telegram-trading-bot/` directories.
- Fill in the required API keys and secrets (see [Environment Configuration](#environment-configuration)).

---

## 3. Development Workflow

### Frontend (Next.js)
- Start the development server:
  ```bash
  $ npm run dev
  ```
- Access the app at [http://localhost:3000](http://localhost:3000)
- Edit files in `src/app/` or `src/components/` for UI changes. Hot reloading is enabled.

### Telegram Trading Bot
- In a new terminal:
  ```bash
  $ cd telegram-trading-bot
  $ npm run start
  ```
- The bot will connect to Telegram and listen for commands.
- Edit files in `telegram-trading-bot/src/` for backend changes.

### Agent/AI
- The agent runs as part of the bot. Modify logic in `telegram-trading-bot/agent/` for market intelligence and alerts.

---

## 4. Coding Standards
- **Language:** TypeScript (strict mode recommended)
- **Linting:** Use ESLint and Prettier for code formatting and style consistency.
- **Naming:** Use descriptive, camelCase for variables/functions, PascalCase for components/classes.
- **Comments:** Write clear, concise comments for complex logic and public APIs.
- **Commits:** Use meaningful commit messages (e.g., `feat: add trending coins page`, `fix: handle swap errors`).
- **Testing:** Write unit and integration tests for critical logic.

---

## 5. Environment Configuration

### Main App (`.env`)
```
NEXT_PUBLIC_ZORA_API_KEY=your_zora_api_key
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
```

### Telegram Bot (`telegram-trading-bot/.env`)
```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
ZORA_API_KEY=your_zora_api_key
QUICKNODE_RPC=your_quicknode_rpc_url
WALLET_ENCRYPTION_KEY=your_encryption_key
DB_PATH=./database.sqlite
```

> Never commit real API keys or secrets to the repository.

---

## 6. Testing

### Frontend
- Use Jest and React Testing Library for unit and integration tests.
- Place tests in `__tests__/` or alongside components as `*.test.tsx`.
- Run tests with:
  ```bash
  $ npm run test
  ```

### Telegram Bot
- Use Jest for backend logic tests.
- Mock external APIs and Telegram interactions where possible.
- Place tests in `telegram-trading-bot/__tests__/` or as `*.test.ts` files.

---

## 7. Debugging

- **Frontend:**
  - Use browser dev tools and React DevTools for UI/state debugging.
  - Check network requests for API errors.
- **Bot/Agent:**
  - Use `console.log` or a logger for backend debugging.
  - Monitor Telegram bot logs for errors and command handling issues.
  - Use breakpoints in VSCode for step-through debugging.
- **Common Issues:**
  - Invalid or missing environment variables
  - API rate limits or network errors
  - Telegram bot not responding (check token and permissions)

---

## 8. Deployment

### Frontend
- Build for production:
  ```bash
  $ npm run build
  $ npm run start
  ```
- Deploy to Vercel, Netlify, or your preferred platform.

### Telegram Bot
- Deploy on a VPS, cloud VM, or serverless platform (e.g., Railway, Render).
- Use a process manager (e.g., PM2) for reliability.
- Ensure environment variables are set securely in production.

---

## 9. Contribution Guidelines

- Fork the repository and create a new branch for your feature or fix.
- Write clear, descriptive PR titles and descriptions.
- Ensure your code passes all tests and lint checks before submitting a PR.
- Add or update documentation as needed.
- Be respectful and constructive in code reviews and discussions.

---

For questions or help, see the main README or contact the maintainers (https://t.me/thatweb3gee).

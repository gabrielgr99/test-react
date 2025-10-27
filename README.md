# Teste React!

Projeto **React + TypeScript** configurado com **Parcel, TailwindCSS, React Router v7 e React Query**, e suporte completo a testes com **Jest e Testing Library**.

[Veja funcionando](https://test-react-peach-two.vercel.app/)

## Requisitos

- Node.js: ^20.19.0 || >=22.12.0
- npm: 10.5.0

## Principais Tecnologias

| Categoria           | Pacote                        | Versão   |
| ------------------- | ----------------------------- | -------- |
| **Frontend**        | react                       | ^19.1.1  |
|                     | react-dom                   | ^19.1.1  |
|                     | react-router                | ^7.9.2   |
|                     | @tanstack/react-query       | ^5.90.5  |
|                     | tailwindcss                 | ^4.1.15  |
|                     | @radix-ui/react-select      | ^2.2.6   |
|                     | lucide-react                | ^0.545.0 |
| **Utilitários**     | axios                       | ^1.12.2  |
|                     | clsx                        | ^2.1.1   |
|                     | class-variance-authority    | ^0.7.1   |
|                     | tailwind-merge              | ^3.3.1   |
|                     | isbot                       | ^5.1.31  |
| **Build e Tooling** | parcel                      | ^2.16.0  |
|                     | typescript                  | ^5.9.2   |
|                     | @babel/core                 | ^7.28.4  |
|                     | postcss                     | ^8.5.6   |
|                     | autoprefixer                | ^10.4.21 |
| **Testes**          | jest                        | ^30.2.0  |
|                     | babel-jest                  | ^30.2.0  |
|                     | jest-environment-jsdom      | ^30.2.0  |
|                     | @testing-library/react      | ^16.3.0  |
|                     | @testing-library/jest-dom   | ^6.9.1   |
|                     | @testing-library/user-event | ^14.6.1  |
|                     | axios-mock-adapter          | ^2.1.0   |


## Vamos começar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

### Testando

```bash
npm test
```

Sua aplicação estará disponível em `http://localhost:1234`.

## Buildando para produção

```bash
npm run build
```

Os arquivos compilados ficarão disponíveis em `dist/`

### Estrutura de pastas

```
├── public
├── src/
│   ├── api/
│   ├── components/
│   │   ├── ui/
│   │   └── features/
│   ├── constants/
│   ├── contexts/
│   ├── hooks/
│   ├── lib/
│   ├── mappers/
│   ├── routes/
│   ├── test/
│   ├── views/
│   ├── app.css
│   ├── index.html
│   ├── main.tsx
│   └── routes.tsx
├── .env
├── .gitignore
├── postcssrc.json
├── babel.config.js
├── components.json
├── jest.config.ts
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

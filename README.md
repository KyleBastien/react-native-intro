# Introduction to React Native with TypeScript

Teaching materials for an introductory lesson on React Native with TypeScript (~1 hour 45 minutes). Covers core concepts, then walks through building a todo list app with AI-powered todo generation.

## Contents

- **`lesson-plan.md`** — Full lesson plan covering React Native concepts and a guided hands-on project
- **`slides/`** — Reveal.js presentation slides
- **`todo-app/`** — Hands-on demo app: a React Native + TypeScript todo list with AI-powered todo generation via Groq

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- A physical device with [Expo Go](https://expo.dev/go) installed, or an iOS/Android emulator
- A [Groq API key](https://console.groq.com/) (for the AI todos feature)

### Todo App

```bash
cd todo-app
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS) to preview on a device. You can also run with a specific platform:

```bash
npx expo start --ios      # iOS simulator
npx expo start --android  # Android emulator
npx expo start --web      # Web browser
```

#### Environment Setup

Create a `todo-app/.env` file with your Groq API key:

```
GROQ_API_KEY=your_key_here
```

### Slides

```bash
cd slides
npm install
npm start       # Local dev server
npm run build   # Production build
```

## Todo App Architecture

Built with **Expo SDK 54** and **React Native 0.81**.

- **Navigation** — Bottom tab navigator with two screens: "My Todos" (manual CRUD) and "AI Todos" (Groq-powered generation)
- **State management** — React Context (`TodoProvider` + `useTodos()` hook) shared across both screens
- **AI integration** — Groq SDK using `llama-3.3-70b-versatile` to generate todo suggestions from natural language prompts

### Key Files

```
todo-app/
├── index.ts                       # Entry point
├── App.tsx                        # Root component with navigation
├── context/TodoContext.tsx         # Shared state provider
├── screens/ManualTodoScreen.tsx   # Manual todo CRUD
├── screens/AiTodoScreen.tsx       # AI-powered todo generation
├── services/groqService.ts        # Groq API client
└── types/Todo.ts                  # Todo interface
```

## Lesson Plan Overview

1. **Part 1: Concepts & Foundations** (~55 min) — What is React Native, development environment, core React concepts (JSX, components, props, state), React Native building blocks and styling
2. **Part 2: Hands-On Mini-Project** (~45 min) — Build a todo list app step by step
3. **Part 3: Wrap-Up & Next Steps** (~5 min) — Review and resources for further learning

## Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [React Native Express](https://www.reactnative.express/)

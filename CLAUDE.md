# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Teaching materials for an "Introduction to React Native with TypeScript" lesson. Contains three parts:

- `lesson-plan.md` — Full lesson plan (~1h45m) covering React Native concepts and a guided hands-on project
- `slides/` — Reveal.js presentation slides
- `todo-app/` — The hands-on demo app: a React Native + TypeScript todo list with AI-powered todo generation

## Commands

### todo-app (Expo SDK 54, React Native 0.81)

```bash
cd todo-app
npm install
npx expo start          # Start Expo dev server
npx expo start --ios    # Start with iOS simulator
npx expo start --android # Start with Android emulator
npx expo start --web    # Start web version
```

No test runner or linter is configured for the todo-app.

### slides (Reveal.js)

```bash
cd slides
npm install
npm start       # gulp serve — local dev server
npm run build   # gulp build
npm test        # gulp test (QUnit + Puppeteer)
```

## todo-app Architecture

**Entry point:** `index.ts` → `App.tsx`

**Navigation:** Bottom tab navigator (`@react-navigation/bottom-tabs`) with two screens — "My Todos" (manual CRUD) and "AI Todos" (Groq-powered generation). Both tabs share state through React Context.

**State management:** `context/TodoContext.tsx` exports a `TodoProvider` wrapper and `useTodos()` hook. All todo operations (add, addMultiple, toggle, delete) live here. Both screens consume this shared context — AI-generated todos appear in the manual screen's list.

**Key files:**
- `types/Todo.ts` — `Todo` interface with `source: 'manual' | 'ai'` discriminator
- `screens/ManualTodoScreen.tsx` — Manual todo input, toggle, and delete via FlatList
- `screens/AiTodoScreen.tsx` — Prompt input → Groq API call → preview list → bulk add to shared state
- `services/groqService.ts` — Groq SDK client using `llama-3.3-70b-versatile`; sends system prompt requesting JSON array of strings, parses/validates the response

**Environment variables:** Requires a `todo-app/.env` file with `GROQ_API_KEY=<key>`. Loaded via `react-native-dotenv` (configured in `babel.config.js`), imported from the `@env` module. TypeScript declarations in `env.d.ts`.

**Styling:** Inline `StyleSheet.create()` per screen, no shared theme system. Primary green: `#4CAF50`, AI blue: `#42A5F5`.

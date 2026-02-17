# To-Do List App — React Native with TypeScript

A To-Do List app built with React Native, TypeScript, and Expo. Features both manual todo entry and an **AI-powered todo generator** using the Groq API. This project accompanies the **Introduction to React Native with TypeScript** lesson.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- A code editor ([VS Code](https://code.visualstudio.com/) recommended)
- A physical device with [Expo Go](https://expo.dev/client) installed, *or* an iOS/Android emulator
- A [Groq API key](https://console.groq.com/) (free tier available)

## Getting Started

```bash
cd todo-app
npm install
```

Create a `.env` file in the `todo-app` root with your Groq API key:

```
GROQ_API_KEY=your_groq_api_key_here
```

Then start the app:

```bash
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS) to preview the app.

---

## Step-by-Step Build Guide

This guide mirrors the hands-on portion of the lesson. Each step builds on the previous one.

---

### Step 1: Project Setup & Cleanup

The project was scaffolded with:

```bash
npx create-expo-app@latest todo-app --template blank-typescript
```

Start by replacing the boilerplate in `App.tsx` with a minimal shell:

```tsx
import { StyleSheet, View, Text } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My To-Do List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
```

You should see "My To-Do List" at the top of the screen.

---

### Step 2: Define the Data Model

Add a TypeScript interface to describe a to-do item, and two pieces of state to drive the app.

```tsx
import { useState } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
```

Inside the `App` function, add:

```tsx
const [todos, setTodos] = useState<Todo[]>([]);
const [inputText, setInputText] = useState<string>('');
```

- `todos` — the array of to-do items
- `inputText` — what the user is currently typing in the input field

---

### Step 3: Build the Input Section

Import `TextInput` and `TouchableOpacity`, then add the input row inside the `<View>` container (below the title):

```tsx
import { TextInput, TouchableOpacity } from 'react-native';
```

```tsx
<View style={styles.inputRow}>
  <TextInput
    style={styles.input}
    placeholder="Add a new task..."
    value={inputText}
    onChangeText={setInputText}
  />
  <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
    <Text style={styles.addButtonText}>+</Text>
  </TouchableOpacity>
</View>
```

Write the `handleAddTodo` function inside the `App` component:

```tsx
const handleAddTodo = () => {
  if (inputText.trim() === '') return;
  const newTodo: Todo = {
    id: Date.now().toString(),
    text: inputText.trim(),
    completed: false,
  };
  setTodos([...todos, newTodo]);
  setInputText('');
};
```

**Key concepts:**
- The **spread operator** (`...todos`) creates a new array (immutability)
- A guard clause prevents adding empty items
- `Date.now().toString()` serves as a simple unique ID

Add the input styles:

```tsx
inputRow: {
  flexDirection: 'row',
  marginBottom: 20,
},
input: {
  flex: 1,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 12,
  fontSize: 16,
  backgroundColor: '#fff',
},
addButton: {
  backgroundColor: '#4CAF50',
  width: 50,
  marginLeft: 10,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
},
addButtonText: {
  color: '#fff',
  fontSize: 24,
  fontWeight: 'bold',
},
```

---

### Step 4: Render the To-Do List

Import `FlatList` and add it below the input row:

```tsx
import { FlatList } from 'react-native';
```

```tsx
<FlatList
  data={todos}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.todoItem}>
      <Text style={[
        styles.todoText,
        item.completed && styles.completedText,
      ]}>
        {item.text}
      </Text>
    </View>
  )}
/>
```

**Key concepts:**
- `keyExtractor` — uniquely identifies each item (important for performance)
- `renderItem` — a function that returns JSX for each item
- Conditional styling with array syntax: `[style1, condition && style2]`

Add the list item styles:

```tsx
todoItem: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: 16,
  borderRadius: 8,
  marginBottom: 10,
},
todoText: {
  flex: 1,
  fontSize: 16,
},
completedText: {
  textDecorationLine: 'line-through',
  color: '#999',
},
```

---

### Step 5: Add Toggle & Delete Functionality

Add two handler functions inside the `App` component:

```tsx
const handleToggleTodo = (id: string) => {
  setTodos(
    todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
};

const handleDeleteTodo = (id: string) => {
  setTodos(todos.filter((todo) => todo.id !== id));
};
```

Update the `renderItem` to wire up the buttons:

```tsx
renderItem={({ item }) => (
  <View style={styles.todoItem}>
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => handleToggleTodo(item.id)}
    >
      <Text style={[
        styles.todoText,
        item.completed && styles.completedText,
      ]}>
        {item.text}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
      <Text style={styles.deleteButton}>✕</Text>
    </TouchableOpacity>
  </View>
)}
```

**Key concepts:**
- `.map()` transforms one item in the array without mutating the original
- `.filter()` removes an item without mutating the original
- Arrow functions in `onPress` pass the `id` argument

Add the delete button style:

```tsx
deleteButton: {
  color: '#ff3b30',
  fontSize: 18,
  fontWeight: 'bold',
  paddingLeft: 16,
},
```

---

### Step 6: Test the Basic App

Walk through the complete app flow:

1. **Type a task** → press **+** → item appears in the list
2. **Tap an item** → text gets a strikethrough (toggled complete)
3. **Tap ✕** → item is removed

---

## Part 3: Adding AI Todos with Groq

Now we'll expand the app with a second tab that uses AI to generate todos automatically.

---

### Step 7: Install New Dependencies

```bash
npm install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context groq-sdk react-native-dotenv
```

- **React Navigation** — provides tab-based navigation between screens
- **groq-sdk** — official Groq client for calling AI models
- **react-native-dotenv** — loads environment variables from a `.env` file

---

### Step 8: Configure Environment Variables

Create a `.env` file in the project root:

```
GROQ_API_KEY=your_groq_api_key_here
```

Create `babel.config.js` to load the env vars:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
      }],
    ],
  };
};
```

Create `env.d.ts` for TypeScript support:

```ts
declare module '@env' {
  export const GROQ_API_KEY: string;
}
```

---

### Step 9: Extract Shared Types & Context

Move the `Todo` interface to `types/Todo.ts` and add a `source` field:

```tsx
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  source: 'manual' | 'ai';
}
```

Create `context/TodoContext.tsx` to share state between screens:

```tsx
import { createContext, useContext, useState } from 'react';
import type { Todo } from '../types/Todo';

interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string, source?: 'manual' | 'ai') => void;
  addMultipleTodos: (texts: string[], source?: 'manual' | 'ai') => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string, source: 'manual' | 'ai' = 'manual') => {
    if (text.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      text: text.trim(),
      completed: false,
      source,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const addMultipleTodos = (texts: string[], source: 'manual' | 'ai' = 'ai') => {
    const newTodos: Todo[] = texts
      .filter((t) => t.trim() !== '')
      .map((text, index) => ({
        id: Date.now().toString() + index.toString() + Math.random().toString(36).slice(2),
        text: text.trim(),
        completed: false,
        source,
      }));
    setTodos((prev) => [...prev, ...newTodos]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, addMultipleTodos, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}
```

**Key concepts:**
- **React Context** allows sharing state across components without passing props through every level
- The `TodoProvider` wraps the app and makes todo state available to all screens
- The `useTodos()` hook provides a clean API for accessing the shared state

---

### Step 10: Create the Groq API Service

Create `services/groqService.ts`:

```tsx
import { GROQ_API_KEY } from '@env';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: GROQ_API_KEY, dangerouslyAllowBrowser: true });

export async function generateTodos(prompt: string): Promise<string[]> {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant that generates actionable to-do items. ' +
          'Given a user\'s goal or task, respond with a JSON array of short, ' +
          'actionable to-do item strings. Return ONLY the JSON array, no other text. ' +
          'Example: ["Review chapter 1 notes","Practice problem set 1","Create flashcards"]',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 1024,
  });

  const content = chatCompletion.choices[0]?.message?.content ?? '[]';
  const match = content.match(/\[[\s\S]*\]/);
  if (!match) {
    throw new Error('Failed to parse AI response');
  }

  const parsed = JSON.parse(match[0]);
  if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === 'string')) {
    throw new Error('AI response was not an array of strings');
  }

  return parsed;
}
```

**Key concepts:**
- A **system prompt** instructs the AI to return only a JSON array of todo strings
- We parse the response and validate it's the expected format
- Error handling catches network failures or unexpected responses

---

### Step 11: Create the Screen Components

Extract the existing todo UI into `screens/ManualTodoScreen.tsx` (uses `useTodos()` from context instead of local state).

Create `screens/AiTodoScreen.tsx` with:
- A multiline text input for the AI prompt
- A "Generate Todos" button with loading spinner
- A preview list of generated items
- An "Add All to My List" button to merge them into the shared todo list

---

### Step 12: Set Up Tab Navigation

Replace `App.tsx` with a bottom tab navigator:

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { TodoProvider } from './context/TodoContext';
import ManualTodoScreen from './screens/ManualTodoScreen';
import AiTodoScreen from './screens/AiTodoScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TodoProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#4CAF50',
            tabBarInactiveTintColor: '#999',
            tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' },
            tabBarStyle: { paddingBottom: 6, paddingTop: 6, height: 60 },
          }}
        >
          <Tab.Screen
            name="My Todos"
            component={ManualTodoScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 22, color }}>📝</Text>
              ),
            }}
          />
          <Tab.Screen
            name="AI Todos"
            component={AiTodoScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 22, color }}>🤖</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TodoProvider>
  );
}
```

**Key concepts:**
- `NavigationContainer` wraps the entire navigation tree
- `createBottomTabNavigator` creates a tab bar at the bottom of the screen
- `TodoProvider` wraps everything so both screens share the same todo state
- Each tab has an icon and label

---

### Step 13: Test the Complete App

1. **My Todos tab** — manually add, toggle, and delete todos (same as before)
2. **AI Todos tab** — enter a prompt like "I need to study for Calculus" → tap "Generate Todos" → preview the AI-generated items → tap "Add All to My List"
3. **Switch back to My Todos** — see the AI-generated items (marked with 🤖) merged into your list

---

## Concepts Used

| Concept | How It's Used |
|---|---|
| **Components & JSX** | Building the UI with `View`, `Text`, etc. |
| **Props** | Passing data into `renderItem` |
| **State (`useState`)** | Managing the to-do list and input field |
| **Context (`useContext`)** | Sharing todo state across screens |
| **TypeScript interfaces** | Defining the shape of a `Todo` item |
| **Core components** | `View`, `Text`, `TextInput`, `FlatList`, `TouchableOpacity` |
| **Flexbox & StyleSheet** | Layout and styling |
| **React Navigation** | Bottom tab navigator for multi-screen app |
| **Groq API** | AI-powered todo generation |
| **Environment variables** | Secure API key management with `.env` |

## Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started)
- [Groq API Documentation](https://console.groq.com/docs)
- [React Native Express](https://www.reactnative.express/) — a walkthrough-style learning guide

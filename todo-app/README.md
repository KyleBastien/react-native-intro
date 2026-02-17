# To-Do List App — React Native with TypeScript

A simple To-Do List app built with React Native, TypeScript, and Expo. This project accompanies the **Introduction to React Native with TypeScript** lesson and walks through building the app step by step.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- A code editor ([VS Code](https://code.visualstudio.com/) recommended)
- A physical device with [Expo Go](https://expo.dev/client) installed, *or* an iOS/Android emulator

## Getting Started

```bash
cd todo-app
npm install
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

### Step 6: Test the App

Walk through the complete app flow:

1. **Type a task** → press **+** → item appears in the list
2. **Tap an item** → text gets a strikethrough (toggled complete)
3. **Tap ✕** → item is removed

---

## Concepts Used

| Concept | How It's Used |
|---|---|
| **Components & JSX** | Building the UI with `View`, `Text`, etc. |
| **Props** | Passing data into `renderItem` |
| **State (`useState`)** | Managing the to-do list and input field |
| **TypeScript interfaces** | Defining the shape of a `Todo` item |
| **Core components** | `View`, `Text`, `TextInput`, `FlatList`, `TouchableOpacity` |
| **Flexbox & StyleSheet** | Layout and styling |

## Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [React Native Express](https://www.reactnative.express/) — a walkthrough-style learning guide

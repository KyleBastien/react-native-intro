# Introduction to React Native with TypeScript

**Duration:** ~1 hour 45 minutes  
**Audience:** College-level students with basic JavaScript, some web experience, some Java experience, but no React experience  
**Tools:** Expo, TypeScript  
**Format:** Concepts first, then a guided hands-on mini-project (To-Do List App)

---

## Part 1: Concepts & Foundations (~55 minutes)

---

### 1.1 — What is React Native? (10 min)

- **The problem it solves**
  - Traditional mobile development requires separate codebases — Swift/Obj-C for iOS, Kotlin/Java for Android
  - React Native lets you write one codebase in JavaScript/TypeScript that runs on both platforms
- **How it works under the hood**
  - React Native renders *native* UI components, not a web view (unlike hybrid frameworks such as Cordova/Ionic)
  - A JavaScript thread communicates with native platform modules through a bridge architecture
  - Your TypeScript code describes *what* the UI should look like; React Native translates that into real native views
- **React Native vs. React (for the web)**
  - React for the web renders to HTML elements (`<div>`, `<span>`, `<input>`)
  - React Native renders to platform-native components (`<View>`, `<Text>`, `<TextInput>`)
  - Core concepts (components, state, props, JSX) are the same — the render targets differ
- **Who uses it**
  - Meta (Facebook, Instagram), Microsoft (Outlook, Xbox), Shopify, Discord, and many more
- **Why TypeScript**
  - Adds static typing on top of JavaScript — catches errors at compile time rather than runtime
  - Provides autocompletion and better tooling in editors like VS Code
  - Industry standard for large-scale React and React Native projects

---

### 1.2 — The Development Environment (10 min)

- **What is Expo?**
  - A framework and platform built around React Native that simplifies setup, building, and deploying
  - Removes the need to install Xcode or Android Studio just to get started
  - Provides the **Expo Go** app — scan a QR code on your phone and instantly preview your app
- **Expo vs. bare React Native CLI**
  - Expo: faster setup, managed workflow, great for learning and prototyping
  - Bare CLI: more control, required for deep native module customization
  - You can always "eject" from Expo later if you need full native access
- **Prerequisites & tooling**
  - Node.js (LTS version)
  - A code editor (VS Code recommended)
  - A physical device with Expo Go installed, *or* an iOS/Android emulator
- **Creating a new project**
  - `npx create-expo-app@latest MyApp --template blank-typescript`
  - Walk through the generated folder structure:
    - `App.tsx` — the entry point of the application
    - `package.json` — dependencies and scripts
    - `tsconfig.json` — TypeScript configuration
    - `node_modules/` — installed packages
- **Running the app**
  - `npx expo start` — starts the Expo development server
  - Scan the QR code with Expo Go (Android) or the Camera app (iOS)
  - Hot reloading: save a file and see changes instantly on the device

---

### 1.3 — Core React Concepts (20 min)

> *These concepts apply to both React (web) and React Native. Understanding them is essential before building anything.*

#### 1.3.1 — JSX / TSX

- **What is JSX?**
  - A syntax extension that lets you write UI markup directly in your JavaScript/TypeScript files
  - Looks like HTML but compiles to function calls under the hood
  - With TypeScript, files use the `.tsx` extension
- **Key differences from HTML**
  - Uses `className` instead of `class` (web React); in React Native you use a `style` prop instead
  - All tags must be closed (e.g., `<Image />`, not `<img>`)
  - JavaScript expressions are embedded inside curly braces `{}`

#### 1.3.2 — Components

- **What is a component?**
  - A reusable, self-contained piece of UI
  - Think of it like a custom building block — you define it once and use it anywhere
  - Similar to classes in Java: encapsulation of behavior and presentation
- **Functional components (the modern standard)**
  - A component is just a TypeScript function that returns JSX
  - Example structure:
    ```tsx
    const Greeting = () => {
      return <Text>Hello, World!</Text>;
    };
    ```
- **Composing components**
  - Components can contain other components, building a tree structure
  - Encourages breaking complex UIs into small, manageable pieces

#### 1.3.3 — Props

- **What are props?**
  - Short for "properties" — the way you pass data *into* a component from its parent
  - Similar to function parameters or constructor arguments in Java
  - Props are **read-only** — a component should never modify its own props
- **Typing props with TypeScript**
  - Define an interface or type for the expected props
    ```tsx
    interface GreetingProps {
      name: string;
    }

    const Greeting = ({ name }: GreetingProps) => {
      return <Text>Hello, {name}!</Text>;
    };
    ```
  - TypeScript will warn you if you forget to pass required props or pass the wrong type

#### 1.3.4 — State

- **What is state?**
  - Data that a component *owns* and can *change* over time
  - When state changes, the component **re-renders** to reflect the new data
  - Props come from the parent; state is internal to the component
- **The `useState` hook**
  - The primary way to add state to a functional component
    ```tsx
    const [count, setCount] = useState<number>(0);
    ```
  - `count` is the current value; `setCount` is the function to update it
  - React re-renders the component every time `setCount` is called with a new value
- **Why immutability matters**
  - Never mutate state directly (e.g., `count++` is wrong)
  - Always use the setter function so React knows something changed

---

### 1.4 — React Native Building Blocks (15 min)

#### 1.4.1 — Core Components

- **`<View>`**
  - The most fundamental container component — analogous to a `<div>` in HTML
  - Used to group and lay out other components
- **`<Text>`**
  - Displays text content — all text *must* be inside a `<Text>` component (unlike HTML)
- **`<TextInput>`**
  - An input field for the user to type into
  - Key props: `value`, `onChangeText`, `placeholder`
- **`<ScrollView>`**
  - A scrollable container for content that may exceed the screen size
  - Good for small, bounded lists; for long lists use `FlatList`
- **`<FlatList>`**
  - Efficiently renders large, scrollable lists
  - Only renders items currently visible on screen (virtualized)
  - Key props: `data`, `renderItem`, `keyExtractor`
- **`<TouchableOpacity>` / `<Pressable>`**
  - Makes any element respond to press/tap events
  - `<Pressable>` is the more modern and flexible option
  - Key prop: `onPress`
- **`<Image>`**
  - Displays images from local assets or remote URLs
  - Key props: `source`, `style`

#### 1.4.2 — Styling in React Native

- **No CSS files** — styles are written in JavaScript/TypeScript objects
- **`StyleSheet.create()`**
  - Creates an optimized style object
    ```tsx
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
      },
    });
    ```
- **Flexbox layout by default**
  - React Native uses Flexbox for all layout — no floats, no grid, no `display: block/inline`
  - Default `flexDirection` is `column` (top to bottom), unlike CSS which defaults to `row`
  - Key properties: `flex`, `flexDirection`, `justifyContent`, `alignItems`
- **Key differences from CSS**
  - Property names are camelCase (`backgroundColor` not `background-color`)
  - Dimensions are unitless numbers (interpreted as density-independent pixels)
  - No shorthand properties (e.g., use `marginTop`, `marginBottom` separately)

---

## Part 2: Hands-On Mini-Project — To-Do List App (~45 minutes)

> *You will walk students through building this step by step. Each step builds on the previous one.*

---

### 2.1 — Project Setup (5 min)

- **Create the project**
  - Run `npx create-expo-app@latest TodoApp --template blank-typescript`
  - `cd TodoApp`
  - `npx expo start`
- **Verify it runs**
  - Students scan QR code and confirm they see the default "Welcome" screen on their devices
- **Clean up `App.tsx`**
  - Remove the boilerplate content
  - Start with a minimal shell:
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

---

### 2.2 — Define the Data Model with TypeScript (5 min)

- **Create a type for a to-do item**
  - Emphasize how TypeScript gives us structure and safety
    ```tsx
    interface Todo {
      id: string;
      text: string;
      completed: boolean;
    }
    ```
- **Add state to hold the list**
  - Import `useState` from React
    ```tsx
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputText, setInputText] = useState<string>('');
    ```
- **Discuss what each piece of state represents**
  - `todos` — the array of to-do items
  - `inputText` — what the user is currently typing in the input field

---

### 2.3 — Build the Input Section (10 min)

- **Add a `TextInput` and a button to add items**
  ```tsx
  import { TextInput, TouchableOpacity } from 'react-native';
  ```
- **Layout the input row**
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
- **Write the `handleAddTodo` function**
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
- **Key teaching points**
  - Spread operator (`...todos`) to create a new array (immutability)
  - Guard clause to prevent adding empty items
  - `Date.now().toString()` as a simple unique ID generator
- **Add styles for the input row**
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

### 2.4 — Render the To-Do List (10 min)

- **Use `FlatList` to display the items**
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
- **Key teaching points**
  - `keyExtractor` — tells React Native how to uniquely identify each item (important for performance)
  - `renderItem` — a function that returns the JSX for each item
  - Conditional styling with array syntax `[style1, condition && style2]`
- **Add styles for to-do items**
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

### 2.5 — Add Toggle & Delete Functionality (10 min)

- **Toggle a to-do's completed status**
  ```tsx
  const handleToggleTodo = (id: string) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  ```
- **Delete a to-do**
  ```tsx
  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  ```
- **Wire up the buttons in `renderItem`**
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
- **Key teaching points**
  - `.map()` to transform one item in the array without mutating the original
  - `.filter()` to remove an item without mutating the original
  - Arrow functions in `onPress` to pass the `id` argument
- **Add delete button style**
  ```tsx
  deleteButton: {
    color: '#ff3b30',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 16,
  },
  ```

---

### 2.6 — Test & Recap the App (5 min)

- **Walk through the complete app flow**
  - Type a task → press **+** → item appears in the list
  - Tap an item → text gets a strikethrough (toggled complete)
  - Tap **✕** → item is removed
- **Review the concepts used**
  - Components and JSX for building the UI
  - Props for passing data into `renderItem`
  - State (`useState`) for managing the to-do list and input field
  - TypeScript interfaces for defining the shape of a to-do item
  - Core components: `View`, `Text`, `TextInput`, `FlatList`, `TouchableOpacity`
  - Flexbox layout and `StyleSheet` for styling

---

## Part 3: Wrap-Up & Next Steps (~5 minutes)

---

### 3.1 — What We Covered Today

- React Native lets you build native mobile apps with TypeScript/JavaScript
- Expo streamlines the development workflow — from project creation to live preview
- Core React concepts: components, props, state, and JSX
- React Native core components and Flexbox-based styling
- Built a functional To-Do List app from scratch

### 3.2 — Where to Go From Here

- **Navigation** — React Navigation library for multi-screen apps
- **Persistent storage** — AsyncStorage or SQLite for saving data locally
- **API integration** — `fetch` or Axios for pulling data from remote servers
- **Animations** — React Native's `Animated` API or Reanimated library
- **Publishing** — Expo Application Services (EAS) for building and submitting to app stores

### 3.3 — Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [React Native Express](https://www.reactnative.express/) — a walkthrough-style learning guide

---

## Appendix: Complete `App.tsx` Source Code

```tsx
import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>('');

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My To-Do List</Text>

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

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => handleToggleTodo(item.id)}
            >
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.completedText,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
              <Text style={styles.deleteButton}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
  deleteButton: {
    color: '#ff3b30',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 16,
  },
});
```

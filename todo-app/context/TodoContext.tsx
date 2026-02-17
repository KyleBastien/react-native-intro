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

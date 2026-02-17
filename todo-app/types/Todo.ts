export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  source: 'manual' | 'ai';
}

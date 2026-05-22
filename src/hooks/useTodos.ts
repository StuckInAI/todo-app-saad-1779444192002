import { useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Todo, TodoCategory, FilterStatus } from '@/types';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todo-app-todos', []);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterCategory, setFilterCategory] = useState<TodoCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const addTodo = useCallback((text: string, category: TodoCategory) => {
    const newTodo: Todo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
      category,
    };
    setTodos((prev: Todo[]) => [newTodo, ...prev]);
  }, [setTodos]);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev: Todo[]) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  }, [setTodos]);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev: Todo[]) => prev.filter((todo) => todo.id !== id));
  }, [setTodos]);

  const editTodo = useCallback((id: string, text: string) => {
    setTodos((prev: Todo[]) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: text.trim() } : todo))
    );
  }, [setTodos]);

  const clearCompleted = useCallback(() => {
    setTodos((prev: Todo[]) => prev.filter((todo) => !todo.completed));
  }, [setTodos]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active' && !todo.completed) ||
        (filterStatus === 'completed' && todo.completed);

      const matchesCategory =
        filterCategory === 'all' || todo.category === filterCategory;

      const matchesSearch =
        searchQuery === '' ||
        todo.text.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [todos, filterStatus, filterCategory, searchQuery]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  return {
    todos: filteredTodos,
    allTodos: todos,
    stats,
    filterStatus,
    setFilterStatus,
    filterCategory,
    setFilterCategory,
    searchQuery,
    setSearchQuery,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
  };
}
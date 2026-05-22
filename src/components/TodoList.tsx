import { ClipboardList } from 'lucide-react';
import TodoItem from '@/components/TodoItem';
import type { Todo } from '@/types';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white border border-dashed border-slate-200 rounded-3xl shadow-sm">
        <ClipboardList className="w-16 h-16 mb-4 opacity-20" />
        <p className="text-lg font-bold text-text-secondary">No tasks found</p>
        <p className="text-sm mt-1">Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
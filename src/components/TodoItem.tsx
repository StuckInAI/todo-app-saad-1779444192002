import { useState } from 'react';
import { Check, Trash2, Pencil, X, Save } from 'lucide-react';
import { cn, formatDate, categoryConfig } from '@/lib/utils';
import type { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const config = categoryConfig[todo.category];

  const handleSave = () => {
    if (editText.trim() !== '') {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <div
      className={cn(
        'group flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 transition-all hover:border-brand/30 shadow-sm',
        todo.completed && 'opacity-60 bg-slate-50'
      )}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={cn(
          'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
          todo.completed
            ? 'bg-success border-success'
            : 'border-slate-300 hover:border-brand bg-white'
        )}
      >
        {todo.completed && <Check className="w-3.5 h-3.5 text-white" />}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full bg-slate-50 border border-brand rounded-lg px-3 py-1 text-sm text-text-primary outline-none"
          />
        ) : (
          <div>
            <p
              className={cn(
                'text-sm font-medium text-text-primary truncate',
                todo.completed && 'line-through text-text-muted'
              )}
            >
              {todo.text}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={cn(
                  'inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide',
                  config.bg,
                  config.color
                )}
              >
                {config.label}
              </span>
              <span className="text-[10px] text-text-muted font-medium">{formatDate(todo.createdAt)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg text-success hover:bg-success/10 transition-colors"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg text-text-muted hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 rounded-lg text-text-muted hover:text-brand hover:bg-brand/10 transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
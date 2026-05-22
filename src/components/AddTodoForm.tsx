import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn, categoryConfig } from '@/lib/utils';
import type { TodoCategory } from '@/types';

type AddTodoFormProps = {
  onAdd: (text: string, category: TodoCategory) => void;
};

const categories: TodoCategory[] = ['personal', 'work', 'shopping', 'health', 'other'];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<TodoCategory>('personal');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() === '') return;
    onAdd(text, category);
    setText('');
    setIsExpanded(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder="What needs to be done?"
          className="flex-1 bg-surface-light border border-surface-lighter rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
        />
        <button
          type="submit"
          disabled={text.trim() === ''}
          className={cn(
            'px-4 py-3 rounded-xl font-medium flex items-center gap-2 transition-all',
            text.trim() !== ''
              ? 'bg-brand hover:bg-brand-dark text-white shadow-lg shadow-brand/25'
              : 'bg-surface-lighter text-gray-500 cursor-not-allowed'
          )}
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>

      {isExpanded && (
        <div className="flex flex-wrap gap-2 mt-3 animate-in">
          {categories.map((cat) => {
            const config = categoryConfig[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all border',
                  category === cat
                    ? `${config.bg} ${config.color} border-current`
                    : 'bg-surface-light text-gray-400 border-transparent hover:border-surface-lighter'
                )}
              >
                {config.label}
              </button>
            );
          })}
        </div>
      )}
    </form>
  );
}
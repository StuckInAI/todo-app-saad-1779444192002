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
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-text-primary placeholder-slate-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all shadow-sm"
        />
        <button
          type="submit"
          disabled={text.trim() === ''}
          className={cn(
            'px-4 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm',
            text.trim() !== ''
              ? 'bg-brand hover:bg-brand-dark text-white shadow-lg shadow-brand/20'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          )}
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline uppercase text-xs tracking-wide">Add Task</span>
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
                  'px-3 py-1.5 rounded-lg text-xs font-bold transition-all border',
                  category === cat
                    ? `${config.bg} ${config.color} border-current`
                    : 'bg-white text-text-muted border-slate-200 hover:border-brand/30 hover:text-brand'
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
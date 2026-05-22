import { Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FilterStatus, TodoCategory } from '@/types';

type FilterBarProps = {
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
  filterCategory: TodoCategory | 'all';
  setFilterCategory: (category: TodoCategory | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
};

const statuses: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
];

const categoryOptions: { value: TodoCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'personal', label: 'Personal' },
  { value: 'work', label: 'Work' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'health', label: 'Health' },
  { value: 'other', label: 'Other' },
];

export default function FilterBar({
  filterStatus,
  setFilterStatus,
  filterCategory,
  setFilterCategory,
  searchQuery,
  setSearchQuery,
  onClearCompleted,
  hasCompleted,
}: FilterBarProps) {
  return (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder-slate-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all shadow-sm"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-slate-200/50 p-1 rounded-xl">
          {statuses.map((s) => (
            <button
              key={s.value}
              onClick={() => setFilterStatus(s.value)}
              className={cn(
                'px-4 py-1.5 rounded-lg text-xs font-bold transition-all',
                filterStatus === s.value
                  ? 'bg-white text-brand shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterCategory}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFilterCategory(e.target.value as TodoCategory | 'all')
            }
            className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-text-secondary outline-none focus:border-brand shadow-sm"
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasCompleted && (
        <div className="flex justify-end">
          <button
            onClick={onClearCompleted}
            className="text-[10px] font-bold uppercase tracking-wider text-text-muted hover:text-danger transition-colors"
          >
            Clear completed
          </button>
        </div>
      )}
    </div>
  );
}
import { Search, Filter } from 'lucide-react';
import { cn, categoryConfig } from '@/lib/utils';
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
  { value: 'all', label: 'All' },
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
    <div className="mb-6 space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          placeholder="Search todos..."
          className="w-full bg-surface-light border border-surface-lighter rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-surface-light rounded-xl p-1">
          {statuses.map((s) => (
            <button
              key={s.value}
              onClick={() => setFilterStatus(s.value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                filterStatus === s.value
                  ? 'bg-brand text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filterCategory}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFilterCategory(e.target.value as TodoCategory | 'all')
            }
            className="bg-surface-light border border-surface-lighter rounded-lg px-3 py-1.5 text-xs text-gray-300 outline-none focus:border-brand"
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
            className="text-xs text-gray-500 hover:text-danger transition-colors"
          >
            Clear completed
          </button>
        </div>
      )}
    </div>
  );
}
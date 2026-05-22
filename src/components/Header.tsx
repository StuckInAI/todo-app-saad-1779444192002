import { CheckCircle2 } from 'lucide-react';

type HeaderProps = {
  stats: { total: number; completed: number; active: number };
};

export default function Header({ stats }: HeaderProps) {
  const completionPercent = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <CheckCircle2 className="w-10 h-10 text-brand" />
        <h1 className="text-4xl font-extrabold text-text-primary tracking-tight">Todo apps</h1>
      </div>
      <p className="text-text-secondary text-sm mb-6">Stay organized, get things done.</p>

      {stats.total > 0 && (
        <div className="flex items-center justify-center gap-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-text-primary">{stats.active}</span>
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Active</span>
          </div>
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeDasharray={`${completionPercent}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-brand">
              {completionPercent}%
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-text-primary">{stats.completed}</span>
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Done</span>
          </div>
        </div>
      )}
    </header>
  );
}
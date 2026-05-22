import { clsx } from 'clsx';

export function cn(...inputs: Array<string | undefined | null | false>): string {
  return clsx(inputs);
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

export const categoryConfig: Record<string, { label: string; color: string; bg: string }> = {
  personal: { label: 'Personal', color: 'text-blue-400', bg: 'bg-blue-400/15' },
  work: { label: 'Work', color: 'text-amber-400', bg: 'bg-amber-400/15' },
  shopping: { label: 'Shopping', color: 'text-emerald-400', bg: 'bg-emerald-400/15' },
  health: { label: 'Health', color: 'text-rose-400', bg: 'bg-rose-400/15' },
  other: { label: 'Other', color: 'text-purple-400', bg: 'bg-purple-400/15' },
};
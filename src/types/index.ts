export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  category: TodoCategory;
};

export type TodoCategory = 'personal' | 'work' | 'shopping' | 'health' | 'other';

export type FilterStatus = 'all' | 'active' | 'completed';
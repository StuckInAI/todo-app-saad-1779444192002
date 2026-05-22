import { useTodos } from '@/hooks/useTodos';
import Header from '@/components/Header';
import AddTodoForm from '@/components/AddTodoForm';
import FilterBar from '@/components/FilterBar';
import TodoList from '@/components/TodoList';

export default function HomePage() {
  const {
    todos,
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
  } = useTodos();

  return (
    <div className="min-h-screen bg-slate-50 text-text-primary">
      <div className="max-w-xl mx-auto px-4 py-10">
        <Header stats={stats} />
        <AddTodoForm onAdd={addTodo} />
        <FilterBar
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClearCompleted={clearCompleted}
          hasCompleted={stats.completed > 0}
        />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
        <footer className="mt-10 text-center text-xs text-text-muted">
          Data is stored in your browser's localStorage.
        </footer>
      </div>
    </div>
  );
}
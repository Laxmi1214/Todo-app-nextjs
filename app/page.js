"use client";

import { useEffect, useState } from "react";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "@/services/todoService";
import Header from "@/components/Header";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import EmptyState from "@/components/EmptyState";
import Loader from "@/components/Loader";
import EditTodoModal from "@/components/EditTodoModal";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const data = await getTodos();
        setTodos(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load todos.");
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  async function handleAdd(title) {
    const newTodo = await addTodo(title);
    setTodos((prev) => [newTodo, ...prev]);
  }

  async function handleToggle(todo) {
    const updated = await updateTodo(todo.id, { completed: !todo.completed });
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
  }

  async function handleDelete(todo) {
    await deleteTodo(todo.id);
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
  }

  async function handleEditSave(todo, newTitle) {
    const updated = await updateTodo(todo.id, { title: newTitle });
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto">
        <Header />

        <TodoForm onAdd={handleAdd} />

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        {loading ? (
          <Loader />
        ) : todos.length === 0 ? (
          <EmptyState />
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={setEditingTodo}
          />
        )}

        {editingTodo && (
          <EditTodoModal
            todo={editingTodo}
            onSave={handleEditSave}
            onClose={() => setEditingTodo(null)}
          />
        )}
      </div>
    </main>
  );
}

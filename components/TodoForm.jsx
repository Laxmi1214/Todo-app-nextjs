"use client";

import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmed = title.trim();
    if (!trimmed || submitting) return;

    setSubmitting(true);
    try {
      await onAdd(trimmed);
      setTitle("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Todo"
        className="border p-2 flex-1 rounded"
      />

      <button
        type="submit"
        disabled={submitting || !title.trim()}
        className="bg-blue-600 text-white px-4 rounded disabled:opacity-50"
      >
        Add
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";

export default function EditTodoModal({ todo, onSave, onClose }) {
  const [title, setTitle] = useState(todo.title);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    const trimmed = title.trim();
    if (!trimmed || saving) return;

    setSaving(true);
    try {
      await onSave(todo, trimmed);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Todo</h2>

        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving || !title.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-3">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
        />

        <span className={todo.completed ? "line-through text-gray-400" : ""}>
          {todo.title}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(todo)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(todo)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

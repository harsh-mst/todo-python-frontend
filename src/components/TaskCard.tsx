import { Link } from "react-router-dom";

export default function TaskCard({ task, onEdit, onDelete, onComplete }: any) {
  const taskId = task.id || task._id;

  if (!taskId) {
    console.error("Task has no ID!", task);
    return <div className="p-4 bg-red-100">Error: Task has no ID</div>;
  }

  return (
    <div
      className="border border-emerald-400 bg-linear-to-br from-emerald-50 via-green-100 to-emerald-200 
  shadow-xl p-6 rounded-2xl mb-6 transition-all duration-300 
  hover:shadow-2xl hover:-translate-y-1"
    >
      <Link to={`/tasks/${taskId}`} className="no-underline text-emerald-900">
        <h3
          className="text-2xl font-bold cursor-pointer 
      hover:text-emerald-700 transition-colors drop-shadow-sm"
        >
          {task.title}
        </h3>
      </Link>

      <p className="mt-3 mb-5 text-gray-700 leading-relaxed">
        {task.description || "No description"}
      </p>

      {/* Status Indicator */}
      <p className="mb-4 font-semibold text-sm">
        Status:{" "}
        <span
          className={`${
            task.completed ? "text-green-600" : "text-red-500"
          } font-bold`}
        >
          {task.completed ? "Completed " : "Not Completed "}
        </span>
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => onEdit(task)}
          className="px-5 py-2 rounded-xl text-white font-semibold shadow-lg
      bg-linear-to-r from-blue-500 to-blue-600
      hover:from-blue-600 hover:to-blue-700
      transition-transform hover:scale-105"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(taskId)}
          className="px-5 py-2 rounded-xl text-white font-semibold shadow-lg
      bg-linear-to-r from-red-500 to-red-600
      hover:from-red-600 hover:to-red-700
      transition-transform hover:scale-105"
        >
          Delete
        </button>

        <button
          onClick={() => onComplete(taskId)}
          className={`px-5 py-2 rounded-xl font-semibold shadow-lg transition-transform hover:scale-105
    ${
      task.completed
        ? "bg-emerald-600 text-white hover:bg-emerald-700"
        : "bg-gray-300 text-gray-800 hover:bg-gray-400"
    }
  `}
        >
          {task.completed ? "Completed" : "Mark Complete"}
        </button>
      </div>
    </div>
  );
}

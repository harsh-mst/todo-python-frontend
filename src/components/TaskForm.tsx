import { useState, useEffect } from "react";

interface TaskFormProps {
  onSubmit: (taskName: string, taskDescription: string) => void;
  editingTask?: any;
  onCancel?: () => void;
}

export default function TaskForm({ onSubmit, editingTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task name is required");
      return;
    }

    onSubmit(title.trim(), description.trim());

    if (!editingTask) {
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: 16 }}
      className="bg-linear-to-br from-emerald-50 via-green-100 to-emerald-200 
                 p-6 rounded-2xl shadow-xl transition-all hover:shadow-2xl"
    >
      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-3 border border-emerald-400 rounded-xl shadow-sm 
                   outline-none bg-emerald-50 focus:ring-2 focus:ring-emerald-500
                   text-gray-800 font-medium placeholder-gray-400"
      />

      <textarea
        placeholder="Task description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: "block", width: "100%", minHeight: 80, marginTop: 8 }}
        className="p-3 border border-emerald-400 rounded-xl shadow-sm
                   outline-none bg-white focus:ring-2 focus:ring-emerald-500
                   text-gray-700 placeholder-gray-400 mt-3"
      />

      <button
        type="submit"
        className="mt-4 w-full py-3 rounded-xl text-white font-semibold shadow-lg 
                   bg-linear-to-r from-emerald-500 to-emerald-600
                   hover:from-emerald-600 hover:to-emerald-700 
                   transition-transform hover:scale-[1.03]"
      >
        {editingTask ? "Update Task" : "Create Task"}
      </button>

      {editingTask && (
        <button
          type="button"
          onClick={() => {
            setTitle("");
            setDescription("");
          }}
          className="mt-2 w-full py-2 rounded-xl text-emerald-700 font-medium
                     bg-white border-2 border-emerald-500
                     hover:bg-emerald-50 transition-colors"
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
}

// export default function TaskForm({ onSubmit, editingTask }: any) {
//   const [taskName, setTaskName] = useState("");
//   const [taskDescription, setTaskDescription] = useState("");

//   useEffect(() => {
//     if (editingTask) {
//       setTaskName(editingTask.taskName || "");
//       setTaskDescription(editingTask.taskDescription || "");
//     }
//   }, [editingTask]);

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     onSubmit(taskName, taskDescription);
//     setTaskName("");
//     setTaskDescription("");
//   };

//   return (
//     <form
//   onSubmit={handleSubmit}
//   style={{ marginBottom: 16 }}
//   className="bg-linear-to-br from-emerald-50 via-green-100 to-emerald-200
//              p-6 rounded-2xl shadow-xl transition-all hover:shadow-2xl"
// >
//   <input
//     placeholder="Task name"
//     value={taskName}
//     onChange={(e) => setTaskName(e.target.value)}
//     required
//     className="w-full p-3 border border-emerald-400 rounded-xl shadow-sm
//                outline-none bg-emerald-50 focus:ring-2 focus:ring-emerald-500
//                text-gray-800 font-medium placeholder-gray-400"
//   />

//   <textarea
//     placeholder="Task description (optional)"
//     value={taskDescription}
//     onChange={(e) => setTaskDescription(e.target.value)}
//     style={{ display: "block", width: "100%", minHeight: 80, marginTop: 8 }}
//     className="p-3 border border-emerald-400 rounded-xl shadow-sm
//                outline-none bg-white focus:ring-2 focus:ring-emerald-500
//                text-gray-700 placeholder-gray-400 mt-3"
//   />

//   <button
//     type="submit"
//     className="mt-4 w-full py-3 rounded-xl text-white font-semibold shadow-lg
//                bg-linear-to-r from-emerald-500 to-emerald-600
//                hover:from-emerald-600 hover:to-emerald-700
//                transition-transform hover:scale-[1.03]"
//   >
//     {editingTask ? "Update Task" : "Create Task"}
//   </button>
// </form>

//   );
// }

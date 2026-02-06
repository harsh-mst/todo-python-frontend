import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { taskAPI } from "../api/taskApi";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await taskAPI.getTaskById(id!);
        const data = await res.json();

        if (res.ok) {
          setTask(data);
        } else if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        } else if (res.status === 404) {
          setError("Task not found");
        } else {
          setError(data.detail || "Failed to load task");
        }
      } catch (error) {
        console.error("Error fetching task:", error);
        setError("Network error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchTask();
  }, [id, navigate]);

  if (loading) return <p style={{ padding: "1rem" }}>Loading...</p>;
  if (error) return <p style={{ padding: "1rem" }}>{error}</p>;
  if (!task) return <p style={{ padding: "1rem" }}>Task not found.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{task.taskName}</h2>
      <p>{task.taskDescription}</p>

      <div style={{ marginTop: "1rem" }}>
        <strong>Task ID:</strong> {task.id || task._id}{" "}
        {/* Handle both cases */}
        <br />
        <strong>Status:</strong> {task.completed ? "Completed" : "Pending"}
        <br />
        <strong>Created:</strong> {new Date(task.created_at).toLocaleString()}
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        style={{ marginTop: "1rem" }}
        className="px-4 py-2 bg-emerald-500 text-white rounded-lg"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

// export default function TaskDetails() {
//   const { id } = useParams();
//   const [task, setTask] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchTask() {
//       try {
//         const res = await taskAPI.getTaskById(id!);
//         const data = await res.json();

//         if (res.ok) {
//           setTask(data.data);
//         } else {
//           console.error("Failed to load task:", data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching task:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchTask();
//   }, [id]);

//   if (loading) return <p style={{ padding: "1rem" }}>Loading...</p>;
//   if (!task) return <p style={{ padding: "1rem" }}>Task not found.</p>;

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>{task.taskName}</h2>
//       <p>{task.taskDescription}</p>

//       <div style={{ marginTop: "1rem" }}>
//         <strong>Task ID:</strong> {task.id}
//       </div>
//     </div>
//   );
// }

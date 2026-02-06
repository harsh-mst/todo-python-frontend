import { useEffect, useState } from "react";
import { taskAPI } from "../api/taskApi";
import { authAPI } from "../api/authApi";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ onLogout, isAuth }: any) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/", { replace: true });
    }
  }, [isAuth, navigate]);

  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await taskAPI.getAllTasks();
      const data: any = await res.json();

      if (res.ok) setTasks(data || []);
      else console.error("Failed to fetch tasks");
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (title: string, description: string) => {
    try {
      const res = await taskAPI.createTask(title, description);
      if (res.ok) {
        await fetchTasks();
      } else {
        const error = await res.json();
        console.error("Create failed:", error);
        alert("Failed to create task: " + (error.detail || "Unknown error"));
      }
    } catch (error) {
      console.error("Create error:", error);
      alert("Error creating task");
    }
  };

  const updateTask = async (title: string, description: string) => {
    if (!editingTask) {
      console.error("No task being edited!");
      return;
    }

    const taskId = editingTask.id || editingTask._id;

    if (!taskId) {
      console.error("Task has no ID!", editingTask);
      alert("Error: Task has no ID");
      return;
    }

    try {
      const res = await taskAPI.updateTask(taskId, title, description);
      if (res.ok) {
        setEditingTask(null);
        await fetchTasks();
      } else {
        const error = await res.json();
        console.error("Update failed:", error);
        alert("Failed to update task: " + (error.detail || "Unknown error"));
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Error updating task");
    }
  };

  const toggleTaskCompletion = async (taskId: string) => {
    if (!taskId || taskId === "undefined") {
      console.error("Invalid task ID:", taskId);
      alert("Error: Invalid task ID");
      return;
    }

    setToggling(taskId);

    try {
      const res = await taskAPI.toggleTaskCompletion(taskId);
      if (res.ok) {
        await fetchTasks();
      } else {
        const error = await res.json();
        console.error("Toggle failed:", error);
        alert("Failed to toggle task: " + (error.detail || "Unknown error"));
      }
    } catch (error) {
      console.error("Toggle error:", error);
      alert("Error toggling task");
    } finally {
      setToggling(null);
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!taskId || taskId === "undefined") {
      console.error("Invalid task ID:", taskId);
      alert("Error: Invalid task ID");
      return;
    }

    if (!confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      const res = await taskAPI.deleteTask(taskId);
      if (res.ok) {
        await fetchTasks();
      } else {
        const error = await res.json();
        console.error("Delete failed:", error);
        alert("Failed to delete task: " + (error.detail || "Unknown error"));
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting task");
    }
  };

  const logout = async () => {
    try {
      const res = await authAPI.logout();
      if (res.ok) {
        localStorage.removeItem("token");
        onLogout();
        navigate("/", { replace: true });
      } else {
        console.error("Logout failed");
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Logout error:", err);
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-700">
          Your Tasks
        </h1>

        <button
          onClick={logout}
          className="px-5 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md 
                     hover:bg-red-600 transition-transform hover:scale-105"
        >
          Logout
        </button>
      </div>

      <TaskForm
        onSubmit={editingTask ? updateTask : createTask}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      {loading && <p>Loading tasks...</p>}
      {!loading && tasks.length === 0 && <p>No tasks available.</p>}

      {tasks.map((task) => {
        const taskId = task.id || task._id;
        if (!taskId) {
          console.error("Task missing ID:", task);
          return null;
        }

        return (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => setEditingTask(task)}
            onDelete={deleteTask}
            onComplete={toggleTaskCompletion}
            isToggling={toggling === (task.id || task._id)}
          />
        );
      })}
    </div>
  );
}

// export default function Dashboard({ onLogout, isAuth }: any) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuth) {
//       navigate("/", { replace: true });
//     }
//   }, [isAuth, navigate]);

//   const [tasks, setTasks] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [editingTask, setEditingTask] = useState<any>(null);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await taskAPI.getAllTasks();
//       const data: any = await res.json();

//       console.log("API Response:", data);
//       console.log("First task:", data[0]);

//       if (res.ok) setTasks(data || []);
//       else console.error("Failed to fetch tasks");
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const createTask = async (title: string, description: string) => {
//     const res = await taskAPI.createTask(title, description);
//     if (res.ok) fetchTasks();
//   };

//   const updateTask = async (title: string, description: string) => {
//     const res = await taskAPI.updateTask(
//       editingTask.id,
//       title,
//       description,
//     );
//     if (res.ok) {
//       setEditingTask(null);
//       fetchTasks();
//     }
//   };

//   const taskIsComplete = async (id: string) => {
//     await taskAPI.toggleTaskCompletion(id);
//     fetchTasks();
//   };

//   const deleteTask = async (taskId: string) => {
//     const res = await taskAPI.deleteTask(taskId);
//     if (res.ok) fetchTasks();
//   };

//   // const logout = async () => {
//   //   try {
//   //     const res = await authAPI.logout();
//   //     if (res.ok) {
//   //       localStorage.removeItem('token');
//   //       onLogout();
//   //       navigate("/", { replace: true });
//   //     } else {
//   //       console.error("Logout failed");
//   //     }
//   //   } catch (err) {
//   //     console.error("Logout error:", err);
//   //     localStorage.removeItem('token');
//   //      navigate("/", { replace: true });
//   //   }
//   // };

//   const logout = async () => {
//     try {
//       const res = await authAPI.logout();
//       if (res.ok) {
//         localStorage.removeItem("token");

//         onLogout();
//         navigate("/", { replace: true });
//       } else {
//         console.error("Logout failed");
//         localStorage.removeItem("token");
//         navigate("/", { replace: true });
//       }
//     } catch (err) {
//       console.error("Logout error:", err);
//       localStorage.removeItem("token");
//       navigate("/", { replace: true });
//     }
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-emerald-300 to-green-700">
//           Your Tasks
//         </h1>

//         <button
//           onClick={logout}
//           className="px-5 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md
//                      hover:bg-red-600 transition-transform hover:scale-105"
//         >
//           Logout
//         </button>
//       </div>

//       <TaskForm
//         onSubmit={editingTask ? updateTask : createTask}
//         editingTask={editingTask}
//         onCancel={() => setEditingTask(null)}
//       />

//       {loading && <p>Loading tasks...</p>}
//       {!loading && tasks.length === 0 && <p>No tasks available.</p>}

//       {tasks.map((task) => (
//         <TaskCard
//           key={task.id}
//           task={task}
//           onEdit={() => setEditingTask(task)}
//           onDelete={deleteTask}
//           onComplete={taskIsComplete}
//         />
//       ))}
//     </div>
//   );
// }

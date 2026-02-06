const BASE_URL = "http://localhost:8000/api/v1";

export const taskAPI = {
  createTask: async (title: string, description: string) => {
    const token = localStorage.getItem("token");
    return fetch(`${BASE_URL}/tasks/create-task`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });
  },

  updateTask: async (taskId: string, title?: string, description?: string) => {
    const token = localStorage.getItem("token");

    const updates: any = {};
    if (title !== undefined && title !== null) updates.title = title;
    if (description !== undefined && description !== null)
      updates.description = description;

    return fetch(`${BASE_URL}/tasks/update-task/${taskId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
  },

  toggleTaskCompletion: async (taskId: string) => {
    const token = localStorage.getItem("token");
    if (!taskId) {
      throw new Error("Task ID is required");
    }
    return fetch(`${BASE_URL}/tasks/task-completed/${taskId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  deleteTask: async (taskId: string) => {
    const token = localStorage.getItem("token");
    return fetch(`${BASE_URL}/tasks/tasks/${taskId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getTaskById: async (taskId: string) => {
    const token = localStorage.getItem("token");
    return fetch(`${BASE_URL}/tasks/task/${taskId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getAllTasks: async () => {
    const token = localStorage.getItem("token");
    return fetch(`${BASE_URL}/tasks/tasks`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// const BASE_URL = "http://localhost:8000/api/v1";

// export const taskAPI = {
//   createTask: async (title: string, taskDescription: string) => {
//     return fetch(`${BASE_URL}/create-task`, {
//       method: "POST",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ taskName, taskDescription }),
//     });
//   },

//   updateTask: async (
//     taskId: string,
//     taskName: string,
//     taskDescription: string
//   ) => {
//     return fetch(`${BASE_URL}/update-task`, {
//       method: "PUT",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ _id: taskId, taskName, taskDescription }),
//     });
//   },

//   taskIsComplete: async (taskId: string) => {
//     return fetch(`${BASE_URL}/task-is-complete`, {
//       method: "PATCH",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ _id: taskId }),
//     });
//   },

//   deleteTask: async (taskId: string) => {
//     return fetch(`${BASE_URL}/delete-task`, {
//       method: "DELETE",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ _id: taskId }),
//     });
//   },

//   getTaskById: async (taskId: string) => {
//     return fetch(`${BASE_URL}/taskby-id?taskId=${encodeURIComponent(taskId)}`, {
//       method: "GET",
//       credentials: "include",
//     });
//   },

//   getAllTasks: async () => {
//     return fetch(`${BASE_URL}/all-tasks`, {
//       method: "GET",
//       credentials: "include",
//     });
//   },
// };

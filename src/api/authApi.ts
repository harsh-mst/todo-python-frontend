const BASE_URL = "http://localhost:8000/api/v1/auth";

export const authAPI = {
  login: (email: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    return fetch(`${BASE_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });
  },

  register: (email: string, password: string) => {
    return fetch(`${BASE_URL}/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  },

  logout: () => {
    const token = localStorage.getItem("token");
    return fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },

  updatePassword: (currentPassword: string, newPassword: string) => {
    const token = localStorage.getItem("token");
    return fetch(`${BASE_URL}/update-password`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  deleteAccount: () => {
    const token = localStorage.getItem("token");
    return fetch(`${BASE_URL}/delete-account`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  },
};

// const BASE_URL = "http://localhost:8000/api/v1";

// export const authAPI = {
//   login: (email: string, password: string) => {
//     return fetch(`${BASE_URL}/auth/login`, {
//       method: "POST",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
//   },

//   register: (email: string, password: string, name?: string) => {
//     return fetch(`${BASE_URL}/auth/register`, {
//       method: "POST",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password, name }),
//     });
//   },

//   logout: () => {
//     const token = localStorage.getItem("token");
//     return fetch(`${BASE_URL}/auth/logout`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     });
//   },
// };

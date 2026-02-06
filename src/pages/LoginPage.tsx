import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api/authApi";

export default function LoginPage({ onLogin, isAuth }: any) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuth, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const res = await authAPI.login(email, password);
  //     const text = await res.text();

  //     let data: any = {};
  //     try {
  //       data = JSON.parse(text)?.data;
  //     } catch {
  //       data = { message: text };
  //     }

  //     if (res.ok) {
  //       localStorage.setItem("token", data.access_token);
  //       onLogin();
  //       navigate("/dashboard");
  //     } else {
  //       alert(data.detail || data.message || "Login failed");
  //     }
  //   } catch (err: any) {
  //     alert("Request failed: " + err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authAPI.login(email, password);
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        onLogin();
        navigate("/dashboard");
      } else {
        alert(data.detail || "Login failed");
      }
    } catch (err: any) {
      alert("Request failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-sm h-screen w-screen items-center justify-center bg-linear-to-br from-purple-200 via-pink-200 to-yellow-200">
      <div className="relative border-2 rounded-2xl border-emerald-600 p-10 shadow-xl bg-white w-full overflow-hidden">
        <div className="flex flex-col items-center mb-6 z-10 relative">
          <div className="h-16 w-16 bg-linear-to-tr from-emerald-500 to-green-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl font-bold">✨</span>
          </div>

          <h2 className="text-3xl font-extrabold mt-4 text-emerald-700 drop-shadow-md">
            Welcome Back!
          </h2>

          <p className="text-gray-600 text-sm">
            Login to continue your journey
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center z-10 relative"
          style={{ display: "grid", gap: 12 }}
        >
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="outline-none bg-white/70 border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400 w-full"
          />

          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="outline-none bg-white/70 border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400 w-full"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-7 text-white bg-linear-to-r from-emerald-500 to-green-400 text-lg py-2 px-8 w-full rounded-full shadow-lg hover:scale-[1.02]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-5 text-sm text-gray-600 relative z-10">
          <p>
            New user?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-purple-600 font-semibold cursor-pointer hover:underline"
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

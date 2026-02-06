import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api/authApi";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleRegister = async (e: any) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const res = await authAPI.register(email, password);
  //     const text = await res.text();

  //     let data: any = {};
  //     try {
  //       data = JSON.parse(text);
  //     } catch {
  //       data = { message: text };
  //     }

  //     if (res.ok) {
  //       alert("Registration successful! Please login.");
  //       navigate("/");
  //     } else {
  //       alert(data.detail  || "Registration failed");
  //     }
  //   } catch (err: any) {
  //     alert("Error: " + err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authAPI.register(email, password);
      const data = await res.json();
      if (res.ok) {
        alert("Registration successful! Please login.");
        navigate("/");
      } else {
        alert(data.detail || "Registration failed");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-sm h-screen w-screen items-center justify-center bg-linear-to-br from-purple-200 via-pink-200 to-yellow-200">
      <div className="relative border-2 rounded-2xl border-emerald-600 p-10 shadow-xl bg-white w-full overflow-hidden">
        <div className="absolute -top-6 -left-6 h-20 w-20 bg-pink-400 opacity-40 blur-2xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 -right-4 h-24 w-24 bg-purple-400 opacity-30 blur-2xl rounded-full animate-ping"></div>

        <div className="flex flex-col items-center mb-6 z-10 relative">
          <div className="h-16 w-16 bg-linear-to-tr from-emerald-500 to-green-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl font-bold">📝</span>
          </div>

          <h2 className="text-3xl font-extrabold mt-4 text-emerald-700 drop-shadow-md">
            Create Account
          </h2>

          <p className="text-gray-600 text-sm">
            Register to start your journey
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="flex flex-col items-center justify-center z-10 relative"
          style={{ display: "grid", gap: 12 }}
        >
          <input
            type="email"
            placeholder="Email"
            className="outline-none bg-white/70 border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="outline-none bg-white/70 border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-7 text-white bg-linear-to-r from-emerald-500 to-green-400 text-lg py-2 px-8 w-full rounded-full shadow-lg hover:scale-[1.02]"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-5 text-sm text-gray-600 relative z-10">
          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-purple-600 font-semibold cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

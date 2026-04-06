import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });

      // 🔥 TOKEN SAVE
      localStorage.setItem("token", res.data.access);

      alert("Login Success");
      navigate("/todos-page"); // redirect
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-white mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition"
          >
            Login
          </button>

          <p className="text-center text-white">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-400 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
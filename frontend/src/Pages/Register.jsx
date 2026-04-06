import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        password,
        email,
      });

      alert("Registered!");
      navigate("/login");
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Register
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
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleRegister}
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition"
          >
            Register
          </button>

          <p className="text-center text-white">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
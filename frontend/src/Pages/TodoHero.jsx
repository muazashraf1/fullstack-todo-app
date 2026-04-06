import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TodoHero() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-2xl py-20 px-30 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Todo App
        </h1>

        <div className="flex gap-4 justify-center">
          {isLoggedIn ? (
            <>
              <button onClick={() => navigate('create-page')} className="px-10 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition">
                Add Task
              </button>

              <button onClick={() => navigate('todos-page')} className="px-10 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition">
                View Tasks
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="px-10 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition">
                Login
              </button>

              <button onClick={() => navigate('/register')} className="px-10 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition">
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react'
import TodoHero from './Pages/TodoHero'
import { Route, Routes } from 'react-router-dom'
import CreateTodo from './Pages/CreateTodo'
import AllTodos from './Pages/AllTodos'
import UpdateTodos from './Pages/UpdateTodos'
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<TodoHero />} />
        <Route path='create-page' element={<CreateTodo />} />
        <Route path='todos-page' element={<AllTodos />} />
        <Route path='update-page/:id' element={<UpdateTodos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
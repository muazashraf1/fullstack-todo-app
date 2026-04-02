import React from 'react'
import TodoHero from './Pages/TodoHero'
import { Route, Routes } from 'react-router-dom'
import CreateTodo from './Pages/CreateTodo'
import AllTodos from './Pages/AllTodos'
import UpdateTodos from './Pages/UpdateTodos'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<TodoHero />} />
        <Route path='create-page' element={<CreateTodo />} />
        <Route path='todos-page' element={<AllTodos />} />
        <Route path='update-page/:id' element={<UpdateTodos />} />
      </Routes>
    </>
  )
}

export default App
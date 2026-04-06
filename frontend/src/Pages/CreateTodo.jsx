import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTodo() {

    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [todos, setTodos] = useState({
        name: '',
        description: '',
        status: ''
    })


    // const {name, description, status} = todos

    const handleValidation = () => {
        let errs = {}

        if (!todos.name) {
            errs.name = "Required task name!"
        }

        if (!todos.description) {
            errs.description = "Required Description"
        }

        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    const handleChange = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target
        // console.log("name:", name);
        // console.log("value:", value);

        setTodos({
            ...todos,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let isValid = handleValidation()
        if (isValid) {
            try {
                // // const posting = await axios.post('http://127.0.0.1:8000/api/todos/', todos)
                // const posting = await axios.post('http://127.0.0.1:8000/api/todos/', todos)
                // // setTodos(posting.data)
                // console.log(posting.data);


                const token = localStorage.getItem("token")

                const posting = await axios.post(
                    'http://127.0.0.1:8000/api/todos/',
                    todos,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )


            } catch (err) {
                console.error("Error adding todos:", err)
            }

            navigate('/')

        } return

    }




    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <button onClick={() => navigate('/')} className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/20 transition">
                ← Back
            </button>
            <div className="w-full max-w-lg backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    Create Todo
                </h2>

                <form className="space-y-5" >
                    <div>
                        <label className="block text-white mb-1">Task Name</label>
                        <input
                            type="text"
                            name="name"
                            value={todos.name}
                            onChange={handleChange}
                            placeholder="Enter task name"
                            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:ring-2 focus:ring-blue-500"
                        />

                        {errors.name && <span className="text-red-700 text-lg">{errors.name}</span>}
                    </div>

                    <div>
                        <label className="block text-white mb-1">Description</label>
                        <textarea
                            rows="4"
                            name="description"
                            value={todos.description}
                            placeholder="Enter task description"
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:ring-2 focus:ring-blue-500"
                        ></textarea>

                        {errors.description && <span className="text-red-700 text-lg">{errors.description}</span>}
                    </div>

                    <div>
                        <label className="block text-white mb-1">Status</label>

                        <select onChange={handleChange} value={todos.status} name="status" className="w-full px-4 py-2 rounded-lg bg-white/20 text-white outline-none border border-white/20 focus:ring-2 focus:ring-blue-500">
                            <option className="text-black" value="completed">completed</option>
                            <option className="text-black" value="incompleted">incompleted</option>
                        </select>
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition"
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
}

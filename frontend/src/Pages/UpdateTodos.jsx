import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateTodos() {
    const { id } = useParams()
    const navigate = useNavigate()



    // console.log("id:", id);

    const [errors, setErrors] = useState({})
    const [updateTodo, setUpdateTodo] = useState({
        name: '',
        description: '',
        status: '',
    })


    const handleValidation = () => {
        let errs = {}

        if (!updateTodo.name) {
            errs.name = "Required task name!"
        }

        if (!updateTodo.description) {
            errs.description = "Required Description"
        }

        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    const singleTodo = async () => {
        const fetching = await axios.get(`http://127.0.0.1:8000/api/todos/${id}/`)
        setUpdateTodo(fetching.data)
    }

    useEffect(() => {
        singleTodo()
    }, [])

    console.log(updateTodo);

    const handleChange = (e) => {
        const { name, value } = e.target

        setUpdateTodo({ ...updateTodo, [name]: value })
    }

    const handleUpdate = async () => {
        if (handleValidation()) {
            const update = await axios.put(`http://127.0.0.1:8000/api/todos/${id}/`, updateTodo)

            if (update.status == 200) {
                navigate('/todos-page')
                console.log("Updated:", update);
            }
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
                            value={updateTodo.name}
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
                            value={updateTodo.description}
                            placeholder="Enter task description"
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:ring-2 focus:ring-blue-500"
                        ></textarea>

                        {errors.description && <span className="text-red-700 text-lg">{errors.description}</span>}

                    </div>

                    <div>
                        <label className="block text-white mb-1">Status</label>

                        <select
                            onChange={handleChange}
                            value={updateTodo.status} name="status" className="w-full px-4 py-2 rounded-lg bg-white/20 text-white outline-none border border-white/20 focus:ring-2 focus:ring-blue-500">
                            <option className="text-black" value="completed">completed</option>
                            <option className="text-black" value="incompleted">incompleted</option>
                        </select>
                    </div>

                    <button
                        type="button"
                        onClick={handleUpdate}
                        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition"
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateTodos
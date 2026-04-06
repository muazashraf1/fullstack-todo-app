// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AllTodos() {
//     const navigate = useNavigate()

//     const [allTodos, setAllTodos] = useState([])

//     useEffect(() => {
//         const fetchTodos = async () => {
//             const fetching = await axios.get('http://127.0.0.1:8000/api/todos/')
//             // setAllTodos(preData => [...preData, fetching.data]) // --> this will add array into an array
//             setAllTodos(fetching.data)
//             // console.log(fetching.data);
//         }

//         fetchTodos()
//     }, [])

//     console.log(allTodos);

//     return (
//         <div className="relative min-h-screen bg-gray-900 flex items-start justify-center px-4 py-10">
//             <button onClick={() => navigate('/')} className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/20 transition">
//                 ← Back
//             </button>

//             <div className="w-full max-w-5xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-2xl p-6">
//                 <h2 className="text-2xl font-bold text-white mb-6 text-center">
//                     All Todos
//                 </h2>

//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left text-white">
//                         <thead>
//                             <tr className="border-b border-white/20">
//                                 <th className="py-3 px-4">#</th>
//                                 <th className="py-3 px-4">Todo Name</th>
//                                 <th className="py-3 px-4">Description</th>
//                                 <th className="py-3 px-4">Status</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {/* mine mistake ternary operator */}
//                             {/* {allTodos.length == 0 ? ( 
//                                 <p>No Todo is finded!</p>
//                             ) : (
//                                 {
//                                     allTodos.map((todo, idx) => (
//                                         <tr key={todo.id}>
//                                             <th>{idx + 1}</th>
//                                             <th>{todo.name}</th>
//                                             <th>{todo.description}</th>
//                                             <th>{todo.status}</th>
//                                         </tr>
//                                     ))
//                                 }
//                             )} */}

//                             {allTodos.length === 0 ? (
//                                 <tr>
//                                     <td colSpan={4}>No Todo is finded!</td>
//                                 </tr>
//                             ) : (
//                                 allTodos.map((todo, idx) => (
//                                     <tr key={todo.id}>
//                                         <td>{idx + 1}</td>
//                                         <td>{todo.name}</td>
//                                         <td>{todo.description}</td>
//                                         <td>{todo.status}</td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

















import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllTodos() {
    const navigate = useNavigate()

    const [allTodos, setAllTodos] = useState([])

    const fetchTodos = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get("http://127.0.0.1:8000/api/todos/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setAllTodos(response.data)
        } catch (error) {
            console.log(error.response?.data || error.message)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login"); // ❌ agar login nahi to redirect
        } else {
            fetchTodos();
        }
    }, [navigate]);

    const handleUpdate = (id) => {
        navigate(`/update-page/${id}`)
    }

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token")

            const response = await axios.delete(
                `http://127.0.0.1:8000/api/todos/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )


            // ---> these will be use , when we have just one endpoint in urls.py
            // const deleting = await axios.delete('http://127.0.0.1:8000/api/todos/', { 'id' : id } )
            // const deleting = await axios.delete('http://127.0.0.1:8000/api/todos/', { data: { id: id } })   
            // const deleting = await fetch('http://127.0.0.1:8000/api/todos/',  {'id' : id})


            if (response.status === 204) {
                fetchTodos()
            }
        } catch (error) {
            console.log(error.response?.data || error.message)
        }
    }


    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // console.log(allTodos);

    return (
        <div className="relative min-h-screen bg-gray-900 flex items-start justify-center px-4 py-10">

            <button onClick={() => navigate('/')} className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/20 transition">
                ← Back
            </button>

            <button onClick={handleLogout} className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/30 transition">
                Logout
            </button>

            <div className="w-full max-w-5xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    All Todos
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-white">
                        <thead>
                            <tr className="border-b border-white/20">
                                <th className="py-3 px-4">#</th>
                                <th className="py-3 px-4">Todo Name</th>
                                <th className="py-3 px-4">Description</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-white/10">
                            {allTodos.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-300">
                                        No Todo found!
                                    </td>
                                </tr>
                            ) : (
                                allTodos.map((todo, idx) => (
                                    <tr
                                        key={todo.id}
                                        className="hover:bg-white/10 transition duration-200"
                                    >
                                        <td className="py-3 px-4 text-gray-400">
                                            {idx + 1}
                                        </td>

                                        <td className="py-3 px-4 font-semibold text-white">
                                            {todo.name}
                                        </td>

                                        <td className="py-3 px-4 text-gray-300">
                                            {todo.description}
                                        </td>

                                        <td className="py-3 px-4">
                                            <span
                                                // className={`px-3 py-1 rounded-full text-sm font-medium ${todo.status === "completed"
                                                //     ? "bg-green-500/20 text-green-400"
                                                //     : "bg-yellow-500/20 text-yellow-400"
                                                //     }`}

                                                className={`px-3 py-1 rounded-full text-sm font-medium ${todo.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
                                            >
                                                {todo.status}
                                            </span>
                                        </td>

                                        <td className="py-3 px-4 text-center">
                                            <div className="flex gap-2 justify-center">
                                                <button onClick={() => handleUpdate(todo.id)} className="px-3 py-1 text-sm bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition">
                                                    Edit
                                                </button>

                                                <button onClick={() => handleDelete(todo.id)} className="px-3 py-1 text-sm bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

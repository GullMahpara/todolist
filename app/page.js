"use client"
import React, { useState } from "react";

const Page = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [mainTask, setMainTask] = useState([]);
    const [editIndex, setEditIndex] = useState(-1); // Track the index of the task being edited
    const [modifiedTitle, setModifiedTitle] = useState(""); // State to store modified title
    const [modifiedDesc, setModifiedDesc] = useState(""); // State to store modified description

    const submitHandler = (e) => {
        e.preventDefault();
        if (editIndex === -1) {
            // If editIndex is -1, add new task
            setMainTask([...mainTask, { title, desc }]);
        } else {
            // If editIndex is not -1, update existing task
            const updatedTasks = [...mainTask];
            updatedTasks[editIndex] = { title: modifiedTitle, desc: modifiedDesc };
            setMainTask(updatedTasks);
            setEditIndex(-1); // Reset editIndex after modification
        }
    
        setTitle("");
        setDesc("");
        setModifiedTitle(""); // Reset modifiedTitle
        setModifiedDesc(""); // Reset modifiedDesc
    };
    

    const deleteHandler = (i) => {
        const copyTask = [...mainTask];
        copyTask.splice(i, 1);
        setMainTask(copyTask);
    };

    const editHandler = (i) => {
        // Set editIndex to the index of the task being edited
        setEditIndex(i);
        // Set modifiedTitle and modifiedDesc to the current title and desc respectively
        setModifiedTitle(mainTask[i].title);
        setModifiedDesc(mainTask[i].desc);
    };

    let renderTask = <h2>No Task Available</h2>;

    if (mainTask.length > 0) {
        renderTask = mainTask.map((t, i) => {
            return (
                <li key={i} className="flex items-center justify-between mb-5">
                    <div className="flex justify-between items-center w-2/3">
                        {editIndex === i ? (
                            // Display input fields for modifying the task if editIndex matches the current index
                            <>
                                <input
                                    type="text"
                                    value={modifiedTitle}
                                    onChange={(e) => setModifiedTitle(e.target.value)}
                                    className="text-2xl border-zinc-800 border-2 m-2 px-4 py-2"
                                />
                                <input
                                    type="text"
                                    value={modifiedDesc}
                                    onChange={(e) => setModifiedDesc(e.target.value)}
                                    className="text-2xl border-zinc-800 border-2 m-2 px-4 py-2"
                                />
                            </>
                        ) : (
                            // Display task title and description if not in edit mode
                            <>
                                <h5 className="text-2xl font-semibold">{t.title}</h5>
                                <h6 className="text-lg font-medium">{t.desc}</h6>
                            </>
                        )}
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                editHandler(i);
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded font-bold mr-2 hover:bg-blue-900"
                        >
                            {editIndex === i ? "Save" : "Edit"}
                        </button>
                        <button
                            onClick={() => {
                                deleteHandler(i);
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-900"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            );
        });
    }

    return (
        <>
            <h1 className="bg-black text-white p-5 text-5xl font-bold text-center">Todo List</h1>

            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Enter Title here"
                    className="text-2xl border-zinc-800 border-2 m-8 px-4 py-2"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />

                <input
                    type="text"
                    placeholder="Enter Description here"
                    className="text-2xl border-zinc-800 border-2 m-8 px-4 py-2"
                    value={desc}
                    onChange={(e) => {
                        setDesc(e.target.value);
                    }}
                />

                <button className="bg-black text-white m-5 py-3 px-4 text-2xl font-bold rounded hover:bg-gray-700">Add Task</button>
            </form>
            <hr />

            <div className="p-8 bg-slate-300">
                <ul>{renderTask}</ul>
            </div>

            <div className="text-center mt-8">
                <span role="img" aria-label="smiling-face" className="text-3xl">
                    🙂
                </span>
            </div> 
        </>
    );
};

export default Page;

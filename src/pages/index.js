"use client";
import TodoStore from "@/zustand/todoStore";
import Image from "next/image";
import { useState, useEffect } from "react";

const Home = () => {
  const {
    todos,
    filter,
    addTodo,
    editTodo,
    deleteTodo,
    toggleTodo,
    setFilter,
  } = TodoStore();
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      setCurrentDate(`${day}-${month}-${year}`);
    };

    const getCurrentTime = () => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    getCurrentDate();
    getCurrentTime();
    const timer = setInterval(getCurrentTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue("");
    }
  };


    const handleEditTodo = (e) => {
    e.preventDefault();
    if (editingText.trim()) {
      editTodo(editingId, editingText);
      setEditingId(null);
      setEditingText("");
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  return (
    <>
      <div className="bg-white flex items-center flex-col max-w-full min-h-screen py-10 md:px-3">
        <div className="flex justify-between items-center w-1/2 mt-12 md:flex-col md:w-full">
          <div>
            <h1 className="text-pink text-4xl font-bold">Todos</h1>
          </div>
          <div className="flex gap-x-10 md:mt-3 md:flex md:flex-col">
            <span className="">Today&apos;s Date</span>
            <span className="text-blue">{currentDate}</span>
            <span className="">
              {currentTime}
            </span>
          </div>
        </div>
        <br />
        <br />
        <br />
        <form
          onSubmit={editingId ? handleEditTodo : handleAddTodo}
          className="w-1/2 shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-full"
        >
          <div className="mb-4">
            <input
              type="text"
              id="input"
              placeholder="Enter your todo"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline"
              value={editingId ? editingText : inputValue}
              onChange={(e) =>
                editingId
                  ? setEditingText(e.target.value)
                  : setInputValue(e.target.value)
              }
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="bg-blue hover:bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editingId ? "Save Todo" : "Add Todo"}
          </button>
        </form>
        <ul className="bg-white list-none w-1/2">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`p-4 border border-gray flex justify-between items-center ${
                todo.completed ? "line-through text-gray" : ""
              }`}
              onClick={() => toggleTodo(todo.id)}
              onContextMenu={(e) => {
                e.preventDefault();
                deleteTodo(todo.id);
              }}
            >
              {editingId === todo.id ? (
                <input
                  type="text"
                  className="shadow appearance-none border rounded py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onBlur={() => {
                    if (editingText.trim()) {
                      editTodo(todo.id, editingText);
                      setEditingId(null);
                      setEditingText("");
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (editingText.trim()) {
                        editTodo(todo.id, editingText);
                        setEditingId(null);
                        setEditingText("");
                      }
                    } else if (e.key === "Escape") {
                      setEditingId(null);
                      setEditingText("");
                    }
                  }}
                />
              ) : (
                <span
                  onDoubleClick={() => {
                    setEditingId(todo.id);
                    setEditingText(todo.text);
                  }}
                >
                  {todo.text}
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="flex mt-4 space-x-4">
          <button
            className={`px-4 py-2 rounded ${
              filter === "all" ? "bg-blue text-white" : "bg-gray text-white"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "completed"
                ? "bg-blue text-white"
                : "bg-gray text-white"
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "incomplete"
                ? "bg-blue text-white"
                : "bg-gray text-white"
            }`}
            onClick={() => setFilter("incomplete")}
          >
            Incomplete
          </button>
        </div>
        <small className="mt-12 text-center text-gray">
          Left click to toggle complete <br />
          Right click to delete the todo.
        </small>
      </div>
      {/* <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          My Todo App
        </h1>
        <Image
          src=""
          alt="Beautiful Image"
          width={800}
          height={400}
          className="mb-8 rounded-lg shadow-md"
        />{" "}
        <div className="mt-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 rounded-md shadow-sm focus:ring-indigo focus:border-indigo border-gray-300 bg-white text-gray-900"
            placeholder="Enter a todo"
          />
        </div>
        <div className="mt-6">
          <button
            onClick={handleAddTodo}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Todo
          </button>
        </div>
        <ul className="mt-8 divide-y divide-gray">
          {todos.map((todo) => (
            <li key={todo.id} className="py-4">
              <div className="flex items-center justify-between">
                <p
                  className={`text-lg cursor-pointer ${
                    todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-900"
                  }`}
                  onClick={() => toggleTodo(todo.id)}
                  >
                  {todo.text}
                </p>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-600 focus:outline-none"
                  >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div> */}
    </>
  );
}

export default Home;
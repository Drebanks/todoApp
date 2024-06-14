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
      <div className="bg-white max-w-[1440px] w-[70%] m-auto md:px-[20px] md:w-full">
        <div className="flex justify-between w-full m-auto py-12 md:flex-col md:w-full">
          <div>
            <h1 className="text-black text-4xl font-bold md:text-center md:text-2lg">
              Todo App
            </h1>
          </div>
          <div className="flex gap-x-10 md:mt-3 md:flex-col">
            <p className="text-black text-sm font-normal">Today's Date</p>
            <p className="text-blue text-sm font-normal">{currentDate}</p>
            <p className="text-blue text-sm font-normal">{currentTime}</p>
          </div>
        </div>
        <div className="">
          <form
            onSubmit={editingId ? handleEditTodo : handleAddTodo}
            className="w-1/2 m-auto shadow-md rounded px-8 pt-6 pb-8 md:w-full"
          >
            <div className="mb-4">
              <input
                type="text"
                id="input"
                placeholder="Enter your todo"
                className="border rounded-[8px] w-full text-[2rem] py-2 px-3 text-gray outline-none leading-tight focus:border-blue focus:outline-none focus:shadow-outline md:text-[14px]"
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
              {editingId ? "Edit Todo" : "Add Todo"}
            </button>
          </form>
          <ul className="bg-white list-none w-1/2 m-auto md:w-full">
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
                  <p
                    onDoubleClick={() => {
                      setEditingId(todo.id);
                      setEditingText(todo.text);
                    }}
                  >
                    {todo.text}
                  </p>
                )}
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-center mt-8 space-x-4 w-1/2 m-auto md:w-full xs:flex-wrap xs:space-y-3 xs:items-center">
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
        </div>
      </div>
    </>
  );
}

export default Home;
import create from "zustand";

const TodoStore = create((set) => ({
  todos: [],
  filter: 'all',
  addTodo: (text) => set((state) => ({
    todos: [
      ...state.todos,
      { id: Date.now(), text, completed: false }
    ]
  })),
  editTodo: (id, newText) => set((state) => ({
    todos: state.todos.map((todo) => 
      todo.id === id ? { ...todo, text: newText } : todo
    )
  })),
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id)
  })),
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map((todo) => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),
  setFilter: (filter) => set({ filter }),
}));

export default TodoStore;



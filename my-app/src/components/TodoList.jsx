import React, { useEffect, useState } from "react";

const API = "/api/todos";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await fetch(API);
      setTodos(await res.json());
      setError("");
    } catch {
      setError("Can't reach the backend. Start the server and refresh.");
    }
  };

  useEffect(() => { load(); }, []);

  const addTodo = async () => {
    if (!task.trim()) { setError("Enter a task first"); return; }
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: task }),
      });
      const todo = await res.json();
      setTodos([...todos, todo]);
      setTask("");
      setError("");
    } catch {
      setError("Couldn't add the task. Try again.");
    }
  };

  const toggleTodo = async (id) => {
    const res = await fetch(`${API}/${id}`, { method: "PATCH" });
    const updated = await res.json();
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h2>Todo</h2>
      <div className="row">
        <input
          value={task}
          onChange={(e) => { setTask(e.target.value); setError(""); }}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a task"
        />
        <button className="primary" onClick={addTodo}>Add</button>
      </div>
      <p className="error">{error}</p>
      {todos.length === 0 && !error && <p className="empty">No tasks yet. Add your first one.</p>}
      <ul className="list">
        {todos.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.done} onChange={() => toggleTodo(t.id)} />
            <span className={t.done ? "done" : ""}>{t.text}</span>
            <button className="ghost" onClick={() => deleteTodo(t.id)} aria-label="Delete task">×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

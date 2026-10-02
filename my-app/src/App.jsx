import React from "react";
import Counter from "./components/Counter";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <main className="page">
      <h1 className="title">React + Docker CI/CD</h1>
      <section className="card">
        <Counter />
      </section>
      <section className="card">
        <TodoList />
      </section>
    </main>
  );
}

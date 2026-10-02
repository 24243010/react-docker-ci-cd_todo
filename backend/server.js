const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const STATIC_DIR = process.env.STATIC_DIR || path.join(__dirname, "..", "my-app", "dist");
const DATA_FILE = path.join(__dirname, "data.json");

app.use(express.json());

let todos = [];
try {
  todos = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
} catch {
  todos = [
    { id: 1, text: "Write Dockerfile", done: true },
    { id: 2, text: "Create Jenkinsfile", done: false },
    { id: 3, text: "Push to GitHub", done: false },
  ];
}
const save = () => {
  try { fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2)); } catch {}
};

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.get("/api/todos", (req, res) => res.json(todos));

app.post("/api/todos", (req, res) => {
  const text = (req.body.text || "").trim();
  if (!text) return res.status(400).json({ error: "Task text is required" });
  const todo = { id: Date.now(), text, done: false };
  todos.push(todo);
  save();
  res.status(201).json(todo);
});

app.patch("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: "Task not found" });
  todo.done = !todo.done;
  save();
  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  todos = todos.filter((t) => t.id !== Number(req.params.id));
  save();
  res.status(204).end();
});

if (fs.existsSync(STATIC_DIR)) {
  app.use(express.static(STATIC_DIR));
  app.get("*", (req, res) => res.sendFile(path.join(STATIC_DIR, "index.html")));
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

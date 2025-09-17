const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");

const app = express();
app.use(express.json());

const redisClient = redis.createClient({ url: process.env.REDIS_URL });

// redis connection
redisClient
  .connect()
  .then(() => console.log("✅ Connected to Redis"))
  .catch((err) => console.error("❌ Redis connection error:", err));

// Connect to MongoDB
mongoose
  .connect("mongodb://mongo:27017/todos")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Todo schema
const TodoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);

// Routes
app.get("/todos", async (req, res) => {

// Pull from cache first
const cachedUsers = await redisClient.get("todo");
  if (cachedUsers) {
    console.log("CACHE FOUND YIPEEE!")
    return res.json(JSON.parse(cachedUsers));
  }
  const todosCache = await Todo.find();
  console.log("ADDING TO CACHE YOPEEEE")
  await redisClient.setEx("todo", 60, JSON.stringify(todosCache)); // Cache for 60s
  res.json(todosCache);
});

app.post("/todos", async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.status(201).json(todo);
});

app.get("/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).send("Todo not found");
  res.json(todo);
});

app.put("/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!todo) return res.status(404).send("Todo not found");
  res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) return res.status(404).send("Todo not found");
  res.json({ message: "Todo deleted" });
});

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));

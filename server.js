const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

tasks = [
  {
    id: 1,
    title: "Task 1",
    done: false
  },
  {
    id: 2,
    title: "Task 2",
    done: true
  },
  {
    id: 3,
    title: "Task 3",
    done: false

  } 
]

app.get("/", (req,res ) =>{
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"]
  })
})

app.get("/health", (req, res) =>{
    res.json({
      status: "ok"
    })
});

app.get("/tasks", (req, res ) =>{
    res.json(tasks);
})

app.get("/tasks/:id", (req, res) =>{
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if(task){
    res.json(task);
  }
  else{
    res.status(404).json({
      error: `Task ${id} not found`
    })
  }
})

app.post("/tasks",(req, res) =>{
  const title = req.body.title;
  if(!title){
    return res.status(400).json({
      error: "Title is required."
    })
  }
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) +1 : 1,
    title: title,
    done: false
  }
  tasks.push(newTask);
  res.status(201).json(newTask);
})






import { useState } from "react";
import "./App.css";
import { TodoList, TaskType } from "./components/TodoList";

type FilterTaskValues = "all" | "active" | "completed";

function App() {
  let [tasks, setTask] = useState<Array<TaskType>>([
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "html", isDone: true },
    { id: 3, title: "React", isDone: false },
  ]);
  let [filter, setFilter] = useState<FilterTaskValues>("all");

  let currentTasks = tasks;
  if (filter === "active") {
    currentTasks = currentTasks.filter((t) => t.isDone === true);
  }
  if (filter === "completed") {
    currentTasks = currentTasks.filter((t) => t.isDone === true);
  }

  function changeFilter(value: FilterTaskValues) {
    setFilter(value);
  }

  function removeTask(id: number) {
    let filteredTask = tasks.filter((t) => t.id !== id);
    setTask(filteredTask);
  }

  return (
    <div className='App'>
      <TodoList
        title='CheckList #1'
        tasks={currentTasks}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;

import "./App.css";
import { TodoList } from "./components/TodoList";
import { TaskType } from "./components/TodoList";

function App() {

  let task1 = [
    {id: 1, title: "CSS", isDone: true},
    {id: 2, title: "html", isDone: true},
    {id: 3, title: "React", isDone: false},
  ]

  let task2: Array<TaskType> = [
    {id: 1, title: "Terminator", isDone: true},
    {id: 2, title: "XXX", isDone: false},
    {id: 3, title: "Jentlmens of fortune", isDone: false},
  ]

  return (
    <div className='App'>
      <TodoList title="Hello world" tasks={task1} />
      <TodoList title="Hi Max" tasks={task2}/>
    </div>
  );
}

export default App;

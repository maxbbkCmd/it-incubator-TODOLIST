import { useState } from 'react';
import './App.css';
import { TodoList, TaskType } from './components/TodoList';
import { v1 } from 'uuid';

type FilterTaskValues = 'all' | 'active' | 'completed';

function App() {
  let [tasks, setTask] = useState<Array<TaskType>>([
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'html', isDone: true },
    { id: v1(), title: 'React', isDone: false },
  ]);
  let [filter, setFilter] = useState<FilterTaskValues>('all');

  let currentTasks = tasks;
  if (filter === 'active') {
    currentTasks = currentTasks.filter((t) => t.isDone === false);
  }
  if (filter === 'completed') {
    currentTasks = currentTasks.filter((t) => t.isDone === true);
  }

  function changeFilter(value: FilterTaskValues) {
    setFilter(value);
  }

  function removeTask(id: string) {
    let filteredTask = tasks.filter((t) => t.id !== id);
    setTask(filteredTask);
  }

  function addTask(title: string) {
    let task = { id: tasks.length + 1, title: title, isDone: false };
    setTask([...tasks, task] as Array<TaskType>);
  }

  function ChangeStatus(taskId: string, isDone: boolean) {
    const updateDone = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, idDone: isDone };
      }
      return task;
    });
    setTask(updateDone);
  }
  
  return (
    <div className='App'>
      <TodoList
        title='CheckList #1'
        tasks={currentTasks}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        ChangeStatus={ChangeStatus}
      />
    </div>
  );
}

export default App;

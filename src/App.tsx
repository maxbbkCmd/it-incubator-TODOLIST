import { useState } from 'react';
import './App.css';
import { TodoList, TaskType } from './components/TodoList';
import { v1 } from 'uuid';

export type FilterTaskValues = 'all' | 'active' | 'completed';
type TodolistType = {
  id: string;
  title: string;
  filter: FilterTaskValues;
};

function App() {
  function removeTask(id: string, todolistId: string) {
    // удаляет тудушку по входяшему id
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function addTask(title: string, todolistId: string) {
    // добавляет новую тудушку
    let task = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  }

  function ChangeStatus(taskId: string, isDone: boolean, todolistId: string) {
    // изменения чекета
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }

  function changeFilter(value: FilterTaskValues, todolistId: string) {
    // изменение/переключение статусов (all, active, completed)
    let todoList = todolists.find((tl) => tl.id === todolistId);
    if (todoList) {
      todoList.filter = value;
      setTodoList([...todolists]);
    }
  }

  function removeTodoList(todolistId: string) {
    let filteredTodoList = todolists.filter((tl) => tl.id !== todolistId);
    setTodoList(filteredTodoList);
    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  }

  const todoListId1 = v1();
  const todoListId2 = v1();

  // стейт с данными для тудушек
  let [todolists, setTodoList] = useState<Array<TodolistType>>([
    { id: todoListId1, title: 'Who is?', filter: 'active' },
    { id: todoListId2, title: 'Who are you?', filter: 'completed' },
  ]);

  // стейт для всех тудушек
  let [tasksObj, setTasks] = useState({
    [todoListId1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'html', isDone: true },
      { id: v1(), title: 'React', isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'Millk', isDone: true },
      { id: v1(), title: 'Shek', isDone: false },
      { id: v1(), title: 'OCtavia', isDone: true },
      { id: v1(), title: 'Arina', isDone: true },
      { id: v1(), title: 'React', isDone: false },
    ],
  });

  return (
    <div className='App'>
      {todolists.map((tl) => {
        let tasksForTodolist = tasksObj[tl.id];

        if (tl.filter === 'active') {
          tasksForTodolist = tasksObj[tl.id].filter((t) => t.isDone === false);
        }
        if (tl.filter === 'completed') {
          tasksForTodolist = tasksObj[tl.id].filter((t) => t.isDone === true);
        }
        return (
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            ChangeStatus={ChangeStatus}
            filter={tl.filter}
            removeTodoList={removeTodoList}
          />
        );
      })}
    </div>
  );
}

export default App;

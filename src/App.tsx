import { useState } from 'react';
import './App.css';
import { TodoList, TaskType } from './components/TodoList';
import { v1 } from 'uuid';
import AddItemForm from './components/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Grid, Paper } from "@mui/material";

export type FilterTaskValues = 'all' | 'active' | 'completed';
type TodolistType = {
  id: string;
  title: string;
  filter: FilterTaskValues;
};

type TaksStateType = {
  [key: string]: Array<TaskType>; 
}

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
  
  function addTodoList(title: string) {
    const todolist: TodolistType = {
      id: v1(),
      title: title,
      filter: 'all'
    }
    setTodoList([todolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    })
  }

  function ChangeTaskTitle(taskId: string, newValue: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newValue;
      setTasks({ ...tasksObj });
    }
  }

  function ChangeTodoListTitle(id: string, newTitle: string) {
    let filteredTodolists = todolists.find(tl => tl.id === id);
    if (filteredTodolists) {
      filteredTodolists.title = newTitle;
      setTodoList([...todolists])
    }
  }
  
  const todoListId1 = v1();
  const todoListId2 = v1();

  // стейт с данными для тудушек
  let [todolists, setTodoList] = useState<Array<TodolistType>>([
    { id: todoListId1, title: 'Who is?', filter: 'all' },
    { id: todoListId2, title: 'Who are you?', filter: 'all' },
  ]);

  // стейт для всех тудушек
  let [tasksObj, setTasks] = useState<TaksStateType> ({
    [todoListId1]: [
      { id: v1(), title: 'Skoda', isDone: true },
      { id: v1(), title: 'Audi', isDone: true },
      { id: v1(), title: 'Mercedes', isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: 'Sveta', isDone: true },
      { id: v1(), title: 'Maxim', isDone: true },
      { id: v1(), title: 'Arina', isDone: false },
    ],
  });


  return (
    <div className='App'>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
              sx={{ mr: 2 }}>
              
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}> News
                </Typography> 
            
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
      </Box>
      <Container>
        <Grid container style={{paddingTop: '20px'}}>
          <AddItemForm addItem={addTodoList} />
        </Grid>

        <Grid container spacing={3}>
          {
            todolists.map((tl) => {
              let tasksForTodolist = tasksObj[tl.id];

              if (tl.filter === 'active') {
                tasksForTodolist = tasksObj[tl.id].filter((t) => t.isDone === false);
              }
              if (tl.filter === 'completed') {
                tasksForTodolist = tasksObj[tl.id].filter((t) => t.isDone === true);
              }

              return <Grid item>
                <Paper style={{padding: '10px'}}>
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
                  onChange={(value) => alert(value)}
                  ChangeTaskTitle={ChangeTaskTitle}
                  ChangeTodoListTitle={ChangeTodoListTitle}
                />
                </Paper>
                </Grid>
              ;})
          }
        </Grid>
      </Container>
      <Box sx={{ flexGrow: 1 }}>
    </Box>


    </div>
  );
}

export default App;

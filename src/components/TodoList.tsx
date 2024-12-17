import './TodoList.css';

import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

import DeleteIcon from '@mui/icons-material/Delete';
import { ChangeEvent } from 'react';
import { Button, Checkbox, IconButton } from '@mui/material';
import { FilterTaskValues } from '../App';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (value: FilterTaskValues, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  ChangeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  ChangeTaskTitle: (
    taskId: string,
    newValue: string,
    todolistId: string
  ) => void;
  removeTodoList: (todolistId: string) => void;
  onChange: (newValue: string) => void;
  ChangeTodoListTitle: (id: string, newTitle: string) => void;
  filter: FilterTaskValues;
};

export function TodoList(props: PropsType) {
  const handleAllClick = () => props.changeFilter('all', props.id);
  const handleActiveClick = () => props.changeFilter('active', props.id);
  const handleCompletedClick = () => props.changeFilter('completed', props.id);
  const handRemoveTodoList = () => {
    props.removeTodoList(props.id);
  };

  const addTask = (title: string) => {
    // создаем локальную addTask внутри TodoList и передает полученную из пропсов функцию
    props.addTask(title, props.id);
  };

  const handleChangeTodoListTitle = (newTitle: string) => {
    props.ChangeTodoListTitle(props.id, newTitle);
  };

  return (
    <div className='form'>
      <h3>
        <EditableSpan
          title={props.title}
          onChange={handleChangeTodoListTitle}
        />
        <IconButton onClick={handRemoveTodoList} style={{ marginLeft: '15px' }}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((t) => {
          // вызов функции из пропса удаление таски по id
          const handleRemove = () => {
            props.removeTask(t.id, props.id);
          };

          // вызов функции из пропса изменения чекета
          const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.ChangeStatus(t.id, e.currentTarget.checked, props.id);
          };

          const handleChangeTitle = (newValue: string) => {
            props.ChangeTaskTitle(t.id, newValue, props.id);
          };

          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <input
                type='checkbox'
                checked={t.isDone}
                onChange={handleChangeStatus} />
              <EditableSpan title={t.title} onChange={handleChangeTitle} />
              <IconButton onClick={handleRemove} style={{ marginLeft: '15px' }}>
                <DeleteIcon />
              </IconButton>
            </li>
          );
        })}
      </ul>
      <div>
        <Button
          variant={props.filter === 'all' ? 'contained' : 'text'}
          onClick={handleAllClick}>All
        </Button>

        <Button
          variant={props.filter === 'all' ? 'contained' : 'text'}
          onClick={handleActiveClick}
          color={'primary'}>Active
        </Button>

        <Button
          variant={props.filter === 'all' ? 'contained' : 'text'}
          onClick={handleCompletedClick}
          color={'secondary'}>Completed
        </Button>
      </div>
    </div>
  );
}

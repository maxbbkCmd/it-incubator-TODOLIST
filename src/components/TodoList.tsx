import { ChangeEvent, useState, KeyboardEvent } from 'react';
import './TodoList.css';
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
  removeTodoList: (todolistId: string) => void;
  filter: FilterTaskValues;
};

export function TodoList(props: PropsType) {
  // локальный стейт
  let [title, setTitle] = useState<string>('');
  let [error, setError] = useState<string | null>('');

    const handleAddTask = () => {
      // вызывает внешнюю и отправляет тудушку в бизнес
      if (title.trim() !== '') {
        props.addTask(title.trim(), props.id);
        setTitle('');
      } else {
        setError('Enter your text please!');
      }
  };
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // изменение инпута после onChacnge
    setTitle(e.target.value);
    // setError('');
  };

  const handleKeyInputChange = (e: KeyboardEvent<HTMLInputElement>) => {
    // изменение инпута после нажатия на клавишу
    // if (e.key === 'Enter') {
    //   props.addTask(title, props.id);
    //   setTitle('');
    // }
    setError(null);
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  // вызывает внешнюю и передает статус и id
  const handleAllClick = () => props.changeFilter('all', props.id);
  const handleActiveClick = () => props.changeFilter('active', props.id);
  const handleCompletedClick = () => props.changeFilter('completed', props.id);
  const handRemoveTodoList = () => {
    props.removeTodoList(props.id)
  }

  return (
    <div>
      <h3>{props.title} <button onClick={handRemoveTodoList}>X</button></h3>
      <div>
        <input
          type='text'
          value={title}
          onChange={handleInputChange}
          onKeyDown={handleKeyInputChange}
          className={error ? 'error' : ''}
        />
        <p className='error-message'>{error}</p>
        <button onClick={handleAddTask}>Send</button>
      </div>
      <ul>
        {props.tasks.map((t) => {
          // вызов функции из пропса удаление таски по id
          const handleRemove = () => {props.removeTask(t.id, props.id)};

          // вызов функции из пропса изменения чекета
          const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {props.ChangeStatus(t.id, e.currentTarget.checked, props.id)};

          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <input
                type='checkbox'
                checked={t.isDone}
                onChange={handleChangeStatus} 
              />
              <span>{t.title}</span>
              <button onClick={handleRemove}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === 'all' ? 'active-title' : ''}
          onClick={handleAllClick}
        >
          All
        </button>
        <button
          className={props.filter === 'active' ? 'active-title' : ''}
          onClick={handleActiveClick}
        >
          Active
        </button>
        <button
          className={props.filter === 'completed' ? 'active-title' : ''}
          onClick={handleCompletedClick}
        >
          Complited
        </button>
      </div>
    </div>
  );
}

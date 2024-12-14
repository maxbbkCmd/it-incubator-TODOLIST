import { ChangeEvent, useState, KeyboardEvent } from 'react';
import './TodoList.css';
import { FilterTaskValues } from '../App';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (value: FilterTaskValues) => void;
  addTask: (title: string) => void;
  ChangeStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterTaskValues;
};

export function TodoList(props: PropsType) {
  let [taskTitle, setTaskTitle] = useState<string>('');
  let [error, setError] = useState<string | null>('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
    setError('');
  };

  const onChangeKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.addTask(taskTitle);
      setTaskTitle('');
    }
  };

  const addPost = () => {
    if (taskTitle.trim() !== '') {
      props.addTask(taskTitle);
      setTaskTitle('');
    } else {
      setError('Enter your text please!');
    }
  };

  const onAllClickHandler = () => props.changeFilter('all');
  const onActiveClickHandler = () => props.changeFilter('active');
  const onComplitedClickHandler = () => props.changeFilter('completed');

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          type='text'
          placeholder='Input you text'
          value={taskTitle}
          onChange={onChangeHandler}
          onKeyDown={onChangeKeyHandler}
          className={error ? 'error' : ''}
        />
        <p className='error-message'>{error}</p>
        <button onClick={addPost}>Send</button>
      </div>
      <ul>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id);
          };

          const ChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.ChangeStatus(t.id, e.currentTarget.checked);
          };

          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <input
                type='checkbox'
                checked={t.isDone}
                onChange={ChangeStatus}
              />
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === 'all' ? 'active-title' : ''}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === 'active' ? 'active-title' : ''}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === 'completed' ? 'active-title' : ''}
          onClick={onComplitedClickHandler}
        >
          Complited
        </button>
      </div>
    </div>
  );
}

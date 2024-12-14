import { ChangeEvent, useState, KeyboardEvent } from 'react';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (value: 'all' | 'active' | 'completed') => void;
  addTask: (title: string) => void;
  ChangeStatus: (taskId: string, isDone: boolean) => void;
};

export function TodoList(props: PropsType) {
  let [taskTitle, setTaskTitle] = useState<string>('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  };

  const onChangeKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.addTask(taskTitle);
      setTaskTitle('');
    }
  };

  const onButtonClickHandler = () => {
    if (taskTitle === '') {
      alert('Please input you text');
    } else {
      props.addTask(taskTitle);
      setTaskTitle('');
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
        />
        <button onClick={onButtonClickHandler}>Send</button>
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
            <li>
              <input
                key={t.id}
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
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onComplitedClickHandler}>Complited</button>
      </div>
    </div>
  );
}

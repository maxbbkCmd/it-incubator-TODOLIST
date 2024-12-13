export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: Function;
  changeFilter: Function;
};

export function TodoList(props: PropsType) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input type='text' placeholder='Input you text' />
        <button>Send</button>
      </div>
      <ul>
        {props.tasks.map((t) => {
          return (
            <li>
              <input type='checkbox' checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={() => { props.removeTask(t.id) }}>x</button>
            </li>
          );  
        })}
      </ul>
      <div>
        <button onClick={ () => (props.changeFilter('all')) }>All</button>
        <button onClick={ () => (props.changeFilter('active')) }>Active</button>
        <button onClick={ () => (props.changeFilter('complited')) }>Complited</button>
      </div>
    </div>
  );
}

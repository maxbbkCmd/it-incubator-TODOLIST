export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
}

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
}

export function TodoList(props: PropsType) {
  return (
    <div>
      <h3>{props.tasks[0].title}</h3>
      <div>
        <input type='text' placeholder='Input you text' />
        <button>Send</button>
      </div>
      <ul>
        <li>
          <input type='checkbox' checked={props.tasks[0].isDone} />
          <span>CSS&HTML</span>
        </li>
        <li>
          <input type='checkbox' checked={true} />
          <span>JS</span>
        </li>
        <li>
          <input type='checkbox' checked={false} />
          <span>REACT</span>
        </li>
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Complited</button>
      </div>
    </div>
  );
}



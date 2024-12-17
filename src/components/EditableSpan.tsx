import { useState } from 'react';
import { ChangeEvent } from 'react';

export type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};

function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState('');

  const ActiveEditeMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  const ActiveVieweMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <input
      value={title}
      onChange={handleChangeTitle}
      onBlur={ActiveVieweMode}
      autoFocus
    />
  ) : (
    <span onDoubleClick={ActiveEditeMode}>{props.title}</span>
  );
}

export default EditableSpan;

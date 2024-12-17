import './AddItemForm.css';
import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { IconButton, TextField } from "@mui/material";
import { AddCircle } from "@mui/icons-material";


type AddItemPropsType = {
  addItem: (title: string) => void;
};

function AddItemForm(props: AddItemPropsType) {
  let [title, setTitle] = useState<string>('');
  let [error, setError] = useState<string | null>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // изменение инпута после onChacnge
    setTitle(e.target.value);
    // setError('');
  };

  const handleKeyInputChange = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleAddTask = () => {
    // вызывает внешнюю и отправляет таску в бизнес
    if (title.trim() !== '') {
      props.addItem(title.trim());
      setTitle('');
    } else {
      setError('Enter your text please!');
    }
  };

  return (
    <div className='input'>

      <TextField
        value={title}
        onChange={handleInputChange}
        onKeyDown={handleKeyInputChange}
        className={error ? 'error' : ''}
        variant="outlined"
        size="small"
        label="Enter you text"
        helperText={error} />
      <p className='error-message'>{error}</p>

      <IconButton
        onClick={handleAddTask}
        style={{ marginLeft: '5px' }}>
        <AddCircle />
      </IconButton>
    </div>
  );
}

export default AddItemForm;

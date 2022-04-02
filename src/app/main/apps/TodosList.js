/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  todosList,
} from 'features/todoSlice';
import _ from 'lodash';
import EditTodoDialog from './EditTodoDialog';
import AlertSnackbar from './AlertSnackbar';
import 'App.css';

function TodosList() {
  const todosData = useSelector((todosList));
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    newTitle: '',
    title: '',
    id: '',
  });
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState({
    dialog: false,
    alert: false,
  });
  const [isProcessing, setIsProcessing] = useState({
    get: false,
    post: false,
    patch: false,
    delete: false,
  });

  useEffect(() => {
    async function fetchData() {
      setIsProcessing((prevState) => ({
        ...prevState,
        get: true,
      }));
      await dispatch(getTodos());
      setIsProcessing((prevState) => ({
        ...prevState,
        get: false,
      }));
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setValue((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };

  const handleTodoChange = (e) => {
    setValue((prevState) => ({
      ...prevState,
      newTitle: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: value.newTitle,
      completed: false,
    };
    setIsProcessing((prevState) => ({
      ...prevState,
      post: true,
    }));
    await dispatch(addTodo(data));
    setMessage('Entry Added Successfully');
    setIsProcessing((prevState) => ({
      ...prevState,
      post: false,
    }));
    setValue((prevState) => ({
      ...prevState,
      newTitle: '',
    }));
    setOpen((prevState) => ({
      ...prevState,
      alert: true,
    }));
    dispatch(getTodos());
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const updateData = {
      id: value.id,
      title: value.title,
      completed: false,
    };
    await dispatch(updateTodo(updateData));
    setMessage('Entry Updated Successfully');
    setOpen((prevState) => ({
      ...prevState,
      dialog: false,
    }));
    setOpen((prevState) => ({
      ...prevState,
      alert: true,
    }));
    dispatch(getTodos());
  };

  const handleDeleteTask = async (id) => {
    setIsProcessing((prevState) => ({
      ...prevState,
      delete: true,
    }));
    await dispatch(deleteTodo(id));
    setMessage('Entry Deleted Successfully');
    setIsProcessing((prevState) => ({
      ...prevState,
      delete: false,
    }));
    setOpen((prevState) => ({
      ...prevState,
      alert: true,
    }));
    dispatch(getTodos());
  };

  const handleClickOpen = (data) => {
    setValue((prevState) => ({
      ...prevState,
      title: data.title,
      id: data.id,
    }));
    setOpen((prevState) => ({
      ...prevState,
      dialog: true,
    }));
  };

  const handleDialogClose = () => {
    setOpen((prevState) => ({
      ...prevState,
      dialog: false,
    }));
  };

  const handleAlertClose = () => {
    setOpen((prevState) => ({
      ...prevState,
      alert: false,
    }));
  };

  const renderList = () => {
    let list = '';

    if (isProcessing.get) {
      list = (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      );
    } else if (_.isEmpty(todosData)) {
      list = (
        <div className="m-4 p-4 text-center">
          <Typography
            variant="h5"
          >
            Looks like somone&apos;s been productive lately. There&apos;s nothing on your to do list at the moment.
          </Typography>
        </div>
      );
    } else if (!_.isEmpty(todosData)) {
      list = todosData.map((todo) => (
        <Paper className="paper-todos-list m-4 p-4" key={todo.id} elevation={3}>
          <div className="flex justify-between">
            <div>
              <Typography
                variant="h5"
              >
                {todo.title}
              </Typography>
            </div>

            <div className="flex">
              <IconButton
                variant="outlined"
                onClick={() => { handleClickOpen(todo); }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                disabled={isProcessing.delete}
                onClick={() => { handleDeleteTask(todo.id); }}
              >
                <DeleteIcon />
              </IconButton>
            </div>

          </div>
        </Paper>
      ));
    }
    return list;
  };

  return (
    <div className="mt-8 grid lg:grid-cols-3">
      <div />
      <div>
        <form
          onSubmit={handleSubmit}
        >
          <div className="m-4 p4">
            <Typography
              variant="h2"
            >
              To Do List
            </Typography>
            <div>
              <div className="flex">
                <TextField
                  disabled={isProcessing.get}
                  label="Add To Do"
                  fullWidth
                  onChange={handleTodoChange}
                  required
                  id="todo-field"
                  value={value.newTitle}
                  className="bg-white rounded-lg"
                />
                <div className="ml-4 my-auto">
                  <Button
                    disabled={isProcessing.post}
                    id="create-todo-button"
                    variant="contained"
                    type="submit"
                  >
                    {isProcessing.post && (<CircularProgress size={20} />)}
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
        {renderList()}
        <div />
      </div>
      <EditTodoDialog
        value={value}
        open={open.dialog}
        handleClose={handleDialogClose}
        handleChange={handleChange}
        handleSubmit={handleUpdateTask}
      />
      <AlertSnackbar
        open={open.alert}
        handleClose={handleAlertClose}
        message={message}
      />
    </div>
  );
}

export default TodosList;

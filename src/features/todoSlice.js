/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TodosApiCall from 'app/main/utils/todosApiCall';

const initialState = {
  todosList: [],
};

export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async () => {
    const response = await TodosApiCall.getTodos();
    return response;
  },
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (data) => {
    const response = await TodosApiCall.postTodo(data);
    return response;
  },
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (data) => {
    const response = await TodosApiCall.patchTodo(data);
    return response;
  },
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id) => {
    const response = await TodosApiCall.deleteTodo(id);
    return response;
  },
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todosList = action.payload;
      });
  },
});

export const todosList = (state) => state.todos.todosList;

export default todoSlice.reducer;

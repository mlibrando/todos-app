/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from 'features/todoSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

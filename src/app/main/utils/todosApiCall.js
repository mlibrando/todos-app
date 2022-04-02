/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import axios from 'axios';

class TodosApiCall {
  getTodos = () => {
    const todosApi = `${process.env.REACT_APP_TODOS_API_URL}`;
    return new Promise((resolve, reject) => {
      axios.get(todosApi).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  postTodo = (data) => {
    const todosApi = `${process.env.REACT_APP_TODOS_API_URL}`;
    return new Promise((resolve, reject) => {
      axios.post(todosApi, data).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  patchTodo = (data) => {
    const todosApi = `${process.env.REACT_APP_TODOS_API_URL}/${data.id}`;
    return new Promise((resolve, reject) => {
      axios.patch(todosApi, data).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  deleteTodo = (id) => {
    const todosApi = `${process.env.REACT_APP_TODOS_API_URL}/${id}`;
    return new Promise((resolve, reject) => {
      axios.delete(todosApi).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      });
    });
  };
}

const instance = new TodosApiCall();

export default instance;

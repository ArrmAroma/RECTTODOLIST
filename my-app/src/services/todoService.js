import axios from 'axios';

const API = 'https://todoliist-api.onrender.com/api/todos';
// const API = 'http://localhost:5000/api/todos';

export const getTodos = () => axios.get(API);
export const createTodo = (todo) => axios.post(API, todo);
export const updateTodo = (id, todo) => axios.put(`${API}/${id}`, todo);
export const deleteTodo = (id) => axios.delete(`${API}/${id}`);
export const toggleFinished = (id, finished) => axios.patch(`${API}/${id}`, { finished });

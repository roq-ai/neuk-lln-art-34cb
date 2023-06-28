import axios from 'axios';
import queryString from 'query-string';
import { TodoListInterface, TodoListGetQueryInterface } from 'interfaces/todo-list';
import { GetQueryInterface } from '../../interfaces';

export const getTodoLists = async (query?: TodoListGetQueryInterface) => {
  const response = await axios.get(`/api/todo-lists${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTodoList = async (todoList: TodoListInterface) => {
  const response = await axios.post('/api/todo-lists', todoList);
  return response.data;
};

export const updateTodoListById = async (id: string, todoList: TodoListInterface) => {
  const response = await axios.put(`/api/todo-lists/${id}`, todoList);
  return response.data;
};

export const getTodoListById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/todo-lists/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTodoListById = async (id: string) => {
  const response = await axios.delete(`/api/todo-lists/${id}`);
  return response.data;
};

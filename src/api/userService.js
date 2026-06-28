import axios from 'axios';
import { API_URL } from '../utils/constants';

const userApi = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export function getUsers() {
  return userApi.get('/');
}

export function createUser(user) {
  return userApi.post('/', user);
}

export function updateUser(id, user) {
  return userApi.put(`/${id}`, user);
}

export function removeUser(id) {
  return userApi.delete(`/${id}`);
}

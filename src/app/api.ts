import axios from "axios";

import { API_URL } from "./constants";

export const getAllTasks = async (
  page: number = 1,
  pageSize: number = 10,
  search: string
) => {
  let url = `${API_URL}/tasks?page=${page}&pageSize=${pageSize}&search=${search}`;
  const res = await axios.get(url);
  return res;
};

export const getTaskById = async (id: string) => {
  const res = await axios.get(`${API_URL}/tasks/${id}`);
  return res;
};

export const createTask = async (body: {
  name: string;
  description: string;
  dueDate: string;
  status: string;
}) => {
  const res = await axios.post(`${API_URL}/tasks`, {
    body,
  });
  return res;
};

export const updateTask = async (
  id: string,
  body: { name: string; description: string; dueDate: string; status: string }
) => {
  const res = await axios.put(`${API_URL}/tasks/${id}`, {
    body,
  });
  return res;
};

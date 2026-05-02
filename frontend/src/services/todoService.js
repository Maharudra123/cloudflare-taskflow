import axios from "axios";
import { CONFIG } from "../constants/config";

const apiClient = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const todoService = {
  getAll: async () => {
    const response = await apiClient.get("");
    return response.data;
  },

  create: async (todoData) => {
    const response = await apiClient.post("", todoData);
    return response.data;
  },

  update: async ({ id, ...updateData }) => {
    const response = await apiClient.put(`/${id}`, updateData);
    return response.data;
  },

  // Delete a todo (Leave these alone, they are correct!)
  delete: async (id) => {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
  },
};

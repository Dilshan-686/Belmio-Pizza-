import axios from "axios";

const baseUrl = "http://localhost:4000/api";
const path = "/menu";

export const menuServices = {
  // Add a new menu item
  async addItem(data) {
    try {
      const response = await axios.post(`${baseUrl}${path}/add`, data);
      return response.data;
    } catch (error) {
      console.error("Error adding menu item:", error);
      throw error;
    }
  },

  // Get all menu items
  async getAllItems() {
    try {
      const response = await axios.get(`${baseUrl}${path}/all`);
      return response.data;
    } catch (error) {
      console.error("Error fetching menu items:", error);
      throw error;
    }
  },

  // Get a single item by ID
  async getItemById(id) {
    try {
      const response = await axios.get(`${baseUrl}${path}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching menu item:", error);
      throw error;
    }
  },

  // Update a menu item
  async updateItem(id, data) {
    try {
      const response = await axios.put(`${baseUrl}${path}/edit/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating menu item:", error);
      throw error;
    }
  },

  // Delete a menu item
  async deleteItem(id) {
    try {
      const response = await axios.delete(`${baseUrl}${path}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting menu item:", error);
      throw error;
    }
  },

  // Get items by category
  async getItemsByCategory(category) {
    try {
      const response = await axios.get(`${baseUrl}${path}/category/${category}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching items by category:", error);
      throw error;
    }
  },
};

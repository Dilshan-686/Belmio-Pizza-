import express from "express";
import {
  addMenuItem,
  getAllMenuItems,
  editMenuItem,
  deleteMenuItem,
  getItemsByCategory,
  getMenuItemById
} from "../controllers/menuController.js";

const router = express.Router();

// Route to add a new menu item
router.post("/add", addMenuItem);

// Route to get all menu items
router.get("/all", getAllMenuItems);
router.get("/:id", getMenuItemById); // <-- add this route

// Route to edit a menu item by ID
router.put("/edit/:id", editMenuItem);

// Route to delete a menu item by ID
router.delete("/delete/:id", deleteMenuItem);

// Route to get menu items by category
router.get("/category/:category", getItemsByCategory);

export default router;

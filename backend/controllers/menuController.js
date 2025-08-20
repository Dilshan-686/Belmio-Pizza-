import MenuItem from "../models/MenuItemModel.js";

// Add a new menu item
export const addMenuItem = async (req, res) => {
  try {
    const { name, category, description, prices, image } = req.body;

    if (!name || !category || !description || !prices.medium || !prices.large || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new MenuItem({
      name,
      category,
      description,
      image,
      prices,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error("Add item error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single menu item by ID
export const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json(item);
  } catch (err) {
    console.error("Get item by ID error:", err);
    res.status(500).json({ message: "Failed to fetch item" });
  }
};

// Get all menu items
export const getAllMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
};

// Edit a menu item
export const editMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, prices, image } = req.body;

    const updatedItem = await MenuItem.findByIdAndUpdate(
      id,
      { name, category, description, prices, image },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (err) {
    console.error("Edit item error:", err);
    res.status(500).json({ message: "Failed to edit item" });
  }
};

// Delete a menu item
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error("Delete item error:", err);
    res.status(500).json({ message: "Failed to delete item" });
  }
};

// Search by category
export const getItemsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const items = await MenuItem.find({ category });
    res.status(200).json(items);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Failed to fetch items" });
  }
};

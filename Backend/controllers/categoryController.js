const Category = require('../models/Category');

// GET /api/categories - Get all categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};


// GET /api/categories/:id - Get a single category
exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

// controllers/categoryController.js
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};



// POST /api/categories - Create new category
exports.createCategory = async (req, res, next) => {
  try {
    const { name, status } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    const category = await Category.create({
      name: name.trim(),
      status: status || 'active',
    });

    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

// PUT /api/categories/:id - Update category
exports.updateCategory = async (req, res, next) => {
  try {
    const { name, status } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    if (name) {
      const existingCategory = await Category.findOne({
        name: name.trim(),
        _id: { $ne: category._id },
      });
      if (existingCategory) {
        return res.status(409).json({ message: 'Category name already exists' });
      }
      category.name = name.trim();
    }

    if (status) category.status = status;

    await category.save();
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/categories/:id - Delete single category
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.deleteOne();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/categories (bulk) -> body: { ids: ["id1","id2"] }
exports.bulkDeleteCategories = async (req, res, next) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'No category IDs provided' });
    }

    await Category.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: 'Selected categories deleted successfully' });
  } catch (err) {
    next(err);
  }
};






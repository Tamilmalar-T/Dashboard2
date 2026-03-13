// const express = require('express');
// const router = express.Router();
// const Category = require('../models/Category');

// // POST: Add new category
// router.post('/', async (req, res) => {
//   try {
//     const { name } = req.body;
//     const category = new Category({ name });
//     await category.save();
//     res.status(201).json(category);
//   } catch (err) {
//     res.status(400).json({ error: 'Category already exists or invalid input' });
//   }
// });

// // GET: Get all categories
// router.get('/', async (req, res) => {
//   const categories = await Category.find();
//   res.json(categories);
// });

// // In routes/categoryRoutes.js or similar
// router.delete('/:id', async (req, res) => {
//   try {
//     const deleted = await Category.findByIdAndDelete(req.params.id);

//     // Optional: Remove category from services
//     await Service.updateMany({ category: deleted.name }, { $unset: { category: "" } });

//     res.status(200).json({ message: 'Category deleted' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete category' });
//   }
// });



// module.exports = router;
const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  bulkDeleteCategories
} = require('../controllers/categoryController');

// Routes
router.get('/', getCategories);          // ✅ GET all categories
router.get('/:id', getCategory);         // ✅ GET single category
router.post('/', createCategory);        // ✅ POST new category
router.put('/:id', updateCategory);      // ✅ UPDATE category
router.delete('/:id', deleteCategory);   // ✅ DELETE category
router.delete('/', bulkDeleteCategories);// ✅ BULK DELETE

module.exports = router;




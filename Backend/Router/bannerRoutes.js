

// // const express = require('express');
// // const router = express.Router();
// // const multer = require('multer');
// // const path = require('path');
// // const ctrl = require('../controllers/bannerController');

// // // Multer Setup
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => cb(null, 'uploads/'),
// //   filename: (req, file, cb) =>
// //     cb(null, Date.now() + path.extname(file.originalname)),
// // });
// // const upload = multer({ storage });

// // // Routes
// // router.post('/', upload.single('image'), ctrl.createBanner);
// // router.get('/', ctrl.getBanner);
// // router.post('/update/:id', upload.single('image'), ctrl.updateBanner); // ✅ Fixed path

// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');

// // ✅ Import the banner controller
// const ctrl = require('../controllers/bannerController');

// // ✅ Multer Setup for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + path.extname(file.originalname)),
// });
// const upload = multer({ storage });

// // ✅ Routes
// router.post('/', upload.single('image'), ctrl.createBanner);
// router.get('/', ctrl.getBanners); // changed to getBanners (plural to match controller)
// router.put('/update/:id', upload.single('image'), ctrl.updateBanner); // use PUT for update

// module.exports = router;


const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploads'); // assuming multer middleware
const {
  createBanner,
  getBanners,
  updateBanner,
} = require('../controllers/bannerController');

// Create or update (singleton)
router.post('/', upload.single('image'), createBanner);

// Get the banner
router.get('/', getBanners);

// ✅ Update by ID (correct RESTful route)
router.put('/:id', upload.single('image'), updateBanner);

module.exports = router;

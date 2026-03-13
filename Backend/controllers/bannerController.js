
// // const Banner = require('../models/banner');
// // const fs = require('fs');
// // const path = require('path');

// // const BANNERS_DIR = path.join(__dirname, '../uploads');

// // function safeUnlink(fileName) {
// //   if (!fileName) return;
// //   try {
// //     const oldPath = path.join(BANNERS_DIR, fileName);
// //     if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
// //   } catch (e) {
// //     console.warn('Could not delete old banner image:', e.message);
// //   }
// // }

// // // CREATE or UPDATE (single banner logic)
// // exports.createBanner = async (req, res) => {
// //   try {
// //     const { title, subtitle, buttonText } = req.body;
// //     if (!req.file) return res.status(400).json({ message: 'Image is required' });

// //     let banner = await Banner.findOne();
// //     if (banner) {
// //       safeUnlink(banner.image);
// //       banner.title = title;
// //       banner.subtitle = subtitle;
// //       banner.buttonText = buttonText;
// //       banner.image = req.file.filename;
// //       await banner.save();
// //       return res.status(200).json({ message: 'Banner updated', banner });
// //     }

// //     banner = await Banner.create({
// //       title,
// //       subtitle,
// //       buttonText,
// //       image: req.file.filename,
// //     });

// //     res.status(201).json({ message: 'Banner created', banner });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Create failed', error: err.message });
// //   }
// // };

// // // GET
// // exports.getBanner = async (_req, res) => {
// //   try {
// //     let banner = await Banner.findOne();
// //     if (!banner) {
// //       banner = await Banner.create({
// //         title: 'Welcome to Salon Club',
// //         subtitle: 'Elegance & Style',
// //         buttonText: 'Make your own style',
// //         image: '',
// //       });
// //     }
// //     res.json(banner);
// //   } catch (err) {
// //     res.status(500).json({ message: 'Fetch failed', error: err.message });
// //   }
// // };


//  const Banner = require('../models/banner');
// const fs = require('fs');
// const path = require('path');

// const BANNERS_DIR = path.join(__dirname, '../uploads');

// function safeUnlink(fileName) {
//   if (!fileName) return;
//   try {
//     const oldPath = path.join(BANNERS_DIR, fileName);
//     if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
//   } catch (e) {
//     console.warn('Could not delete old banner image:', e.message);
//   }
// }

// // ✅ Create or update single banner
// exports.createBanner = async (req, res) => {
//   try {
//     const { title, subtitle, buttonText } = req.body;
//     if (!req.file) return res.status(400).json({ message: 'Image is required' });

//     let banner = await Banner.findOne();
//     if (banner) {
//       safeUnlink(banner.image);
//       banner.title = title;
//       banner.subtitle = subtitle;
//       banner.buttonText = buttonText;
//       banner.image = req.file.filename;
//       await banner.save();
//       return res.status(200).json({ message: 'Banner updated', banner });
//     }

//     banner = await Banner.create({
//       title,
//       subtitle,
//       buttonText,
//       image: req.file.filename,
//     });

//     res.status(201).json({ message: 'Banner created', banner });
//   } catch (err) {
//     res.status(500).json({ message: 'Create failed', error: err.message });
//   }
// };

// // ✅ Get banner (auto-create default if not found)
// exports.getBanners = async (_req, res) => {
//   try {
//     let banner = await Banner.findOne();
//     if (!banner) {
//       banner = await Banner.create({
//         title: 'Welcome to Salon Club',
//         subtitle: 'Elegance & Style',
//         buttonText: 'Make your own style',
//         image: '',
//       });
//     }
//     res.json(banner);
//   } catch (err) {
//     res.status(500).json({ message: 'Fetch failed', error: err.message });
//   }
// };

// // ✅ Update by ID (used by /update/:id route)
// exports.updateBanner = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, subtitle, buttonText } = req.body;

//     const banner = await Banner.findById(id);
//     if (!banner) return res.status(404).json({ message: 'Banner not found' });

//     // If new image provided, remove old
//     if (req.file) {
//       safeUnlink(banner.image);
//       banner.image = req.file.filename;
//     }

//     banner.title = title;
//     banner.subtitle = subtitle;
//     banner.buttonText = buttonText;

//     await banner.save();
//     res.json({ message: 'Banner updated successfully', banner });
//   } catch (err) {
//     res.status(500).json({ message: 'Update failed', error: err.message });
//   }
// };


const Banner = require('../models/banner');
const fs = require('fs');
const path = require('path');

const BANNERS_DIR = path.join(__dirname, '../uploads');

// Utility function to safely delete an image file
function safeUnlink(fileName) {
  if (!fileName) return;
  try {
    const oldPath = path.join(BANNERS_DIR, fileName);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  } catch (e) {
    console.warn('Could not delete old banner image:', e.message);
  }
}

// ✅ Create or update a single (singleton) banner
exports.createBanner = async (req, res) => {
  try {
    const { title, subtitle, buttonText } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Image is required' });

    let banner = await Banner.findOne();
    if (banner) {
      // Update existing banner
      safeUnlink(banner.image);
      banner.title = title;
      banner.subtitle = subtitle;
      banner.buttonText = buttonText;
      banner.image = req.file.filename;
      await banner.save();
      return res.status(200).json({ message: 'Banner updated', banner });
    }

    // Create new banner
    banner = await Banner.create({
      title,
      subtitle,
      buttonText,
      image: req.file.filename,
    });

    res.status(201).json({ message: 'Banner created', banner });
  } catch (err) {
    res.status(500).json({ message: 'Create failed', error: err.message });
  }
};

// ✅ Get the banner (auto-create default if none exists)
exports.getBanners = async (_req, res) => {
  try {
    let banner = await Banner.findOne();
    if (!banner) {
      banner = await Banner.create({
        title: 'Welcome to Salon Club',
        subtitle: 'Elegance & Style',
        buttonText: 'Make your own style',
        image: '',
      });
    }
    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
};

// ✅ Update banner by ID
exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, buttonText } = req.body;

    const banner = await Banner.findById(id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });

    // If new image provided, replace old
    if (req.file) {
      safeUnlink(banner.image);
      banner.image = req.file.filename;
    }

    banner.title = title;
    banner.subtitle = subtitle;
    banner.buttonText = buttonText;

    await banner.save();
    res.json({ message: 'Banner updated successfully', banner });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

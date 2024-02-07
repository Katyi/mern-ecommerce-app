const Image = require("../models/Image");
const multer = require('multer');
const fs = require('fs');


const router = require("express").Router();
// const app = express();

// Define storage and upload options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

// Upload image route
router.post('/upload', upload.single('image'), async (req, res) => {
  // console.log(req.file)
  try {
    const file = req.file;
    const originalFileName = file.originalname;
    // const originalFileName = file.name;
    const filePath = file.path;
    // const filePath = file.webkitRelativePath;

    console.log(filePath)

    const newImage = new Image({
      filename: originalFileName,
      path: filePath
    });

    await newImage.save();

    res.status(201).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get image by ID route
router.get('/images/:id', async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const imagePath = image.path;
    const imageData = fs.readFileSync(imagePath);

    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': imageData.length
    });

    res.end(imageData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
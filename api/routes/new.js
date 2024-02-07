const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/image-crud', { useNewUrlParser: true });

// Define user and image models
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: {
    type: String,
    default: null
  }
});

const User = mongoose.model('User', UserSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// API endpoints

app.post('/users', upload.single('image'), async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    image: req.file.path
  });
  try {
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/users/:id', upload.single('image'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      image: req.file.path
    }, { new: true });
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------- 
// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const fs = require('fs');

// const app = express();

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/image-storage', { useNewUrlParser: true });

// Define image model
// const ImageSchema = new mongoose.Schema({
//   filename: String,
//   path: String
// });

// const Image = mongoose.model('Image', ImageSchema);

// // Define storage and upload options
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.originalname + '-' + uniqueSuffix);
//   }
// });

// const upload = multer({ storage });

// Upload image route
// app.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     const file = req.file;
//     const originalFileName = file.originalname;
//     const filePath = file.path;

//     const newImage = new Image({
//       filename: originalFileName,
//       path: filePath
//     });

//     await newImage.save();

//     res.status(201).json({ message: 'Image uploaded successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Get image by ID route
// app.get('/images/:id', async (req, res) => {
//   try {
//     const imageId = req.params.id;
//     const image = await Image.findById(imageId);

//     if (!image) {
//       return res.status(404).json({ message: 'Image not found' });
//     }

//     const imagePath = image.path;
//     const imageData = fs.readFileSync(imagePath);

//     res.writeHead(200, {
//       'Content-Type': 'image/jpeg',
//       'Content-Length': imageData.length
//     });

//     res.end(imageData);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Start the server
// app.listen(3000, () => console.log('Server started on port 3000'));

const multer = require('multer');
const router = require("express").Router();
// const imageUploadPath = '/Users/Katyi/Documents/projects/mern-ecommerce-app/adminApp/uploaded_files';
const imageUploadPath = '/dist/uploaded_files';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, imageUploadPath)
  },
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`)
  }
})

const imageUpload = multer({storage: storage})

router.post("/image-upload", imageUpload.array("my-image-file"), (req, res) => {
  console.log('POST request received to /image-upload.');
  console.log('Axios POST body: ', req.body);
  res.send('POST request recieved on server to /image-upload.');
})

module.exports = router;
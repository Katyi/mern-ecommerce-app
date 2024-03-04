const multer = require('multer');
const router = require("express").Router();
const imageUploadPath = '/var/www/mern-ecommerce-app/uploaded_files/images';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, imageUploadPath)
  },
  filename: function(req, file, cb) {
    cb(null, `${file.originalname}`)
  }
})

const imageUpload = multer({storage: storage})

router.post("/image-upload", imageUpload.array("my-image-file"), (req, res) => {
  console.log('POST request received to /image-upload.');
  console.log('Axios POST body: ', req.body);
  res.send('POST request recieved on server to /image-upload.');
})

router.delete('/image-delete', (req, res) => {
  const fileName = req.body.fileName;
  fs.unlink(imageUploadPath + '/' + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }
    res.status(200).send({
      message: "File is deleted.",
    });
  });
});

module.exports = router;
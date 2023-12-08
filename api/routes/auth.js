const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname,
    phone: req.body.phone,
    address: req.body.address,
    img: req.body.img,
    occupation: req.body.occupation,
    gender: req.body.gender,
    password: CryptoJS.AES.encrypt(
      req.body.password, 
      process.env.PASS_SEC
    ).toString(),
  });

  try{
    const savedUser = await newUser.save();
    res.status(201).json(savedUser)
  }catch(err){
    res.status(500).json(err);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  try{
    const user = await User.findOne({ username: req.body.username });
    
    if (!user) { res.status(401).json("Wrong User Name!"); return }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    // console.log(originalPassword)

    const inputPassword = req.body.password;
    
    if (originalPassword != inputPassword) { res.status(401).json("Wrong Password!"); return}
    
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        {expiresIn: "3d"}
      );
      
      
      const { password, ...others } = user._doc;
      res.status(200).json({...others, accessToken});

  }catch(err){
    res.status(500).json(err);
  }

});

//adminAuth
router.post('/adminAuth', async (req, res) => {
  try{
    const user = await User.findOne({ username: req.body.username });
    
    if (!user) { res.status(401).json("Wrong User Name!"); return }
    if (!user.isAdmin) { res.status(403).json("You are not admin!"); return }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;
    
    if (originalPassword != inputPassword) { res.status(401).json("Wrong Password!"); return}
    
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        {expiresIn: "3d"}
      );
      
      
      const { password, ...others } = user._doc;
      res.status(200).json({...others, accessToken});

  }catch(err){
    res.status(500).json(err);
  }

});

router.post('/logout/:id', async(req, res) => {
  res.status(200).json("You successfully logged out");
});

module.exports = router;
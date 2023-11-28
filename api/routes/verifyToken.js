const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let authHeader = req.headers.token
  // console.log('authHeader', authHeader)
  if(authHeader){
    const token = authHeader.split(" ")[1];
    // console.log(token)
    jwt.verify(token, process.env.JWT_SEC, (err, res) => {
      if(err) res?.status(403).json("Token is not valid!");
      req.user = res?.user;
      next();
    })
  } else {
    res.status(401).json("You are not authenticated!")
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?._id || req.user?.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allow to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next)=>{
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allow to do that!");
    }
  });
};

module.exports = {
  verifyToken, 
  verifyTokenAndAuthorization, 
  verifyTokenAndAdmin
};
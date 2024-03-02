const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require('multer');
const fs = require('fs');
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const wishlistRoute = require("./routes/wishlist");
const orderRoute = require("./routes/order");
const imageRoute = require("./routes/image");
const fileUploadRoute = require("./routes/fileUpload");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose
  .connect(process.env.MONGO_URL)
  .then(()=>console.log("DB Connection Successfull!"))
  .catch((err)=>{
    console.log(err)
});

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/wishlists", wishlistRoute);
app.use("/api/orders", orderRoute);
app.use("/api/images", imageRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/upload", fileUploadRoute);

app.listen(process.env.PORT || 5000, ()=>{
  console.log("backend server is running!")
});

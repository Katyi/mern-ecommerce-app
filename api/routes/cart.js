const Cart = require("../models/Cart");
const {
  verifyTokenAndAuthorization, 
  verifyTokenAndAdmin, 
  verifyToken
} = require("./verifyToken");

const router = require("express").Router();

//ADD NEW CART WHEN USER DON'T HAVE CART YET
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE WHOLE USER CART
router.put("/:id", async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id, 
      {
        $set: req.body,
      },
      {new: true}
    );
    res.status(200).json(updatedCart);
  } catch(err) {
    res.status(500).json(err);
  }
});

//DELETE WHOLE USER CART
router.delete("/:id", async (req, res) => {
  try{
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  }catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL CARTS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CURRENT USER CART
router.get("/find/:userId", async (req, res) => {
  try{
    const cart = await Cart.findOne({userId: req.params.userId});
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
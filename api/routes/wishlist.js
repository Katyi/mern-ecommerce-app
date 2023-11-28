const Wishlist = require("../models/Wishlist");
const {
  verifyTokenAndAuthorization, 
  verifyTokenAndAdmin, 
  verifyToken
} = require("./verifyToken.js");

const router = require("express").Router();

//ADD NEW WISHLIST WHEN USER DON'T HAVE WISHLIST YET
router.post("/", async (req, res) => {
  const newWishlist = new Wishlist(req.body);
  try {
    const savedWishlist = await newWishlist.save();
    res.status(200).json(savedWishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE WHOLE USER WISHLIST
router.delete("/:id", async (req, res) => {
  try{
    await Wishlist.findByIdAndDelete(req.params.id);
    res.status(200).json("Wishlist has been deleted...");
  }catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  try {
    const wishlists = await Wishlist.find();
    res.status(200).json(wishlists);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CURRENT USER WISHLIST
router.get("/find/:userId", async (req, res) => {
  try{
    const wishlist = await Wishlist.findOne({userId: req.params.userId});
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE WHOLE WISHLIST
router.put("/:id", async (req, res) => {
  try {
    const updatedWishlist = await Wishlist.findByIdAndUpdate(
      req.params.id, 
      {
        $set: req.body,
      },
      {new: true}
    );
    res.status(200).json(updatedWishlist);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const WishlistSchema = new mongoose.Schema(
  {
    userId: {type: String, required: true},
    products: [
      {
        productId: {
          type: String
        },
        color: {
          type: String
        },
        size: {
          type: String
        }
      },
    ],
  }, 
  {timestamps: true}
);

module.exports = mongoose.model("Wishlist", WishlistSchema);
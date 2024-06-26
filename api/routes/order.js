const Order = require("../models/Order");
const {
  verifyTokenAndAuthorization, 
  verifyTokenAndAdmin, 
  verifyToken
} = require("./verifyToken");

const router = require("express").Router();

//CREATE NEW ORDER FOR USER
router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {  
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id, 
      {
        $set: req.body,
      },
      {new: true}
    );
    res.status(200).json(updatedOrder);
  } catch(err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try{
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  }catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", async (req, res) => {
  try{
    const orders = await Order.find({userId: req.params.userId});
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL ORDERS
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const orders = query 
      ? await Order.find().sort({_id:-1}).limit(10)
      : await Order.find();

    // const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME
router.get("/income", async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 12));
  
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income.sort((a,b)=>new Date(a._id) - new Date(b._id)));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
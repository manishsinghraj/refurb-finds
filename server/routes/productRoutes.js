const express = require("express");
const { getProduct } = require("../controller/productController");
const router = express.Router();

router.get("/getproducts", getProduct);


module.exports = router
const express = require("express");
const { orderCOD } = require("../controller/orderController");
const router = express.Router();

router.post("/placecodorder", orderCOD);


module.exports = router
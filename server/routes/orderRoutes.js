const express = require("express");
const { orderCOD } = require("../controller/orderController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/placecodorder", auth, orderCOD);


module.exports = router
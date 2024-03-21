const express = require("express");
const { makePayment } = require("../controller/makePaymentController");
const { shippingDetails } = require("../controller/shippingController");
const router = express.Router();

router.post("/makepayment", makePayment);
router.post("/shippingdetails", shippingDetails);

module.exports = router
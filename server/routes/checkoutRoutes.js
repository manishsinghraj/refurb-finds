const express = require("express");
const { makePayment } = require("../controller/stripePaymentController");
const { postShippingDetails, getShippingDetails } = require("../controller/shippingController");
const router = express.Router();

router.post("/makepayment", makePayment);
router.post("/shippingdetails", postShippingDetails);
router.get("/getshippingdetails", getShippingDetails);

module.exports = router
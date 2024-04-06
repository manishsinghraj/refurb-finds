const express = require("express");
const { makePayment } = require("../controller/stripePaymentController");
const { postShippingDetails, getShippingDetails } = require("../controller/shippingController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/makepayment", auth, makePayment);
router.post("/shippingdetails", auth, postShippingDetails);
router.get("/getshippingdetails", auth, getShippingDetails);

module.exports = router
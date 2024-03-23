const express = require("express");
const { webhook } = require("../controller/stripeWebhookController");

const router = express.Router();

router.post('/webhook', express.raw({ type: 'application/json' }), webhook);

module.exports = router
const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
    shippingInfo: { type: Object },
    userId: { type: String }
}, {
    timestamps: true,
});

const shippingModel = mongoose.model("shippingDetails", shippingSchema);

module.exports = shippingModel;

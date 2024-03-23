const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    customerId: { type: String },
    paymentId: { type: String },
    products: [{
        id: { type: String },
        // title: { type: String },
        price: { type: Number },
        // images: { type: Array },
        category: { type: String },
        quantity: { type: Number },
    }],
    subTotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Number, required: true },
    shippingMethod: { type: String, required: true },
    deliveryStatus: { type: String, default: "pending" },
    paymentStatus: { type: String, required: true },

},
    {
        timestamps: true
    }
);


const Order = mongoose.model("Order", orderSchema); 
module.exports = Order;

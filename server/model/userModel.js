const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 } // Default quantity is 1
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 200,
        unique: true,
        match: /^\S+@\S+\.\S+$/
    },
    phone: {
        type: String,
        required: true,
        minLength: 10,
        unique: true,
        match: /^\d{10,}$/
    },
    password: {
        type: String,
        required: true
    },
    likedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    cartItems: [cartItemSchema],
}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

const mongoose = require("mongoose");

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
}, {
    timestamps: true
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;

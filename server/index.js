const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
dotenv.config();
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const stripeWebhookRoutes = require("./routes/stripeWebhookRoutes");
const orderRoutes = require("./routes/orderRoutes");
const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN;

console.log(FRONTEND_DOMAIN)

app.use(cors({
    origin: ['https://refurb-finds.vercel.app']
}));

app.use("/api/stripewebhook", stripeWebhookRoutes);
app.use(express.json());

const PORT = process.env.PORT || 3002;
const URI = process.env.MONGODB_URI;

app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/order", orderRoutes);

mongoose.connect(URI).then(() => {
    console.log("MongoDB connection established");
    app.listen(PORT, () => {
        console.log(`Server started listening at port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect MongoDB:", error);
});


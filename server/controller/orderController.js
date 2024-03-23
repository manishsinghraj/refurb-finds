const orderModel = require("../model/orderModel");

const orderCOD = async (req, res) => {
    const { orderDetails } = req.body;

    try {
        
        const newOrder = new orderModel({
            userId: orderDetails.userId,
            customerId: orderDetails.customerId,
            paymentId: orderDetails.paymentId,
            products: orderDetails.products,
            subTotal: orderDetails.subTotal,
            total: orderDetails.total,
            shipping: orderDetails.shipping,
            paymentStatus : "pending",
            shippingMethod : "cod"
        })
        const savedOrder = await newOrder.save();
        console.log("Processed Order cod", savedOrder);
        res.status(200).send(savedOrder);
    } catch (error) {
        console.log("error in Processing Order cod", error);
        res.status(500).send(error);
    }
};

module.exports = { orderCOD }
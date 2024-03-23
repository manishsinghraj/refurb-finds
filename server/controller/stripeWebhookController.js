const dotenv = require('dotenv');
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const orderModel = require("../model/orderModel");



const createOrder = async (customer, data) => {
    const items = JSON.parse(customer.metadata.cart);

    const newOrder = new orderModel({
        userId: customer.metadata.userId,
        customerId: data.customer,
        paymentId: data.payment_intent,
        products: items,
        subTotal: customer.metadata.subTotal,
        total: customer.metadata.totalCharge,
        shipping: customer.metadata.shippingCharge,
        paymentStatus: data.payment_status,
        shippingMethod : "prepaid"
    });


    try {
        const savedOrder = await newOrder.save();
        console.log("Processed Order", savedOrder);
    } catch (error) {
        console.log("error in Processing Order", error);
    }
};



const webhook = async (request, response) => {
    let endpointSecret;
    endpointSecret = process.env.STRIPE_ENDPOINT_SECRET_KEY;

    const sig = request.headers['stripe-signature'];

    let data;
    let eventType;

    if (endpointSecret) {
        let event;
        try {
            event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
            console.log("verified");
        } catch (err) {
            console.log("not verifiedWebhook Error:", `${err.message}`);
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        data = event.data.object;
        eventType = event.type;
    } else {
        data = request.body.data.object;
        eventType = request.body.type;
    }



    if (eventType === "checkout.session.completed") {
        stripe.customers.retrieve(data.customer).then((customer) => {
            console.log("customer : ", customer);
            console.log("data : ", data);
            createOrder(customer, data);
        }).catch(err => console.log("err ", err))
    }

    response.send().end();
};


module.exports = { webhook };
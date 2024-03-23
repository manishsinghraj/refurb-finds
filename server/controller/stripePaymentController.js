const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const makePayment = async (req, res) => {
    const { products, userId } = req.body; 
    const { amount } = req.body;
    const { subTotal, shippingCharge, totalCharge } = amount;

    const lineItems = products.map((item) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: item.title
            },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity
    }));

    // metadata char limit is 500 
    const customerCartMetaData = products.map((item) => ({
        id: item._id,
        // title: item.title,
        price: item.price,
        // images: item.images,
        category: item.category?.name,
        quantity: item.quantity,
    }));

    const customer = await stripe.customers.create({
        metadata: {
            userId: userId,
            subTotal: subTotal,
            shippingCharge: shippingCharge,
            totalCharge: totalCharge,
            cart: JSON.stringify(customerCartMetaData)
        }
    })

    if (shippingCharge > 0) {
        lineItems.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Shipping Charge"
                },
                unit_amount: shippingCharge * 100,
            },
            quantity: 1
        });
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        customer: customer.id,
        success_url: "http://localhost:3000/shipping?step=4&payment=success",
        cancel_url: "http://localhost:3000/shipping?step=4&payment=cancelled",
    });

    console.log("session", session)

    res.json({ id: session.id });
};


module.exports = { makePayment };

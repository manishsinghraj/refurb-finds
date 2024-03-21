const dotenv = require('dotenv');
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const makePayment = async (req, res) => {
    const { products, shippingCharge = 29.7 } = req.body; // Assuming shippingCharge is included in the request body
    console.log(products);

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

    // Add shipping charge as a separate line item
    if (shippingCharge > 0) {
        lineItems.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Shipping Charge"
                },
                unit_amount: shippingCharge * 100, // Assuming shippingCharge is in the same currency as products
            },
            quantity: 1 // Assuming shippingCharge is a one-time charge
        });
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/shipping?step=4&payment=success",
        cancel_url: "http://localhost:3000/shipping?step=4&payment=cancelled",
    });

    res.json({ id: session.id });
};

module.exports = { makePayment };

const shippingModel = require("../model/shippingModel");

const shippingDetails = async (req, res) => {
    try {
        const { shippingInfo, userId } = req.body;

        if (shippingInfo) {
            const result = await shippingModel.create({
                shippingInfo: shippingInfo,
                userId: userId
            });

            console.log("shipping info successfully saved in db");
            return res.status(200).json({ shippingInfo: result.shippingInfo });
        } else {
            throw new Error("Shipping info is missing");
        }
    } catch (error) {
        console.log("Error during saving shipping info to db:", error);
        return res.status(500).json({ message: "Error during saving shipping info to db" });
    }
};

module.exports = { shippingDetails };

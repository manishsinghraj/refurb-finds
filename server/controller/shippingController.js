const shippingModel = require("../model/shippingModel");

const postShippingDetails = async (req, res) => {
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

const getShippingDetails = async (req, res) => {
    const userId = req.query.userId; 
    try {
        const shippingInfo = await shippingModel.find({ userId: userId });
        
        if (!shippingInfo[0]) {
            return res.status(404).json({ message: "Shipping information not found" });
        }

        res.status(200).json(shippingInfo[0]);
    } catch (error) {
        console.log("Error during retrieving shipping info from db:", error);
        return res.status(500).json({ message: "Error during retrieving shipping info from db" });
    }
};


module.exports = { postShippingDetails, getShippingDetails };

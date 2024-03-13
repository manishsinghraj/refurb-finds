const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const getProduct = async (req, res) => {
    try {
        await client.connect();
        const database = client.db(process.env.MONGODB_DBNAME);
        const collection = database.collection('products');

        const products = await collection.find().toArray();
        if (products.length === 0) {
            return res.status(404).json({ error: "No products found" });
        }
        console.log("getProduct success");
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error during getting product data:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getProduct };

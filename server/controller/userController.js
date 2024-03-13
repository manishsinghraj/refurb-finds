const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;


const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const existingUser = await userModel.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exists!" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword 
        });

        const jsonToken = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);

        res.status(201).json({ user: result, token: jsonToken }); 

        console.log("registerUser success");

    } catch (error) {
        console.log("Error during creating User : ", error);
        res.status(500).json({ message : error});
    }
}


module.exports = { registerUser }
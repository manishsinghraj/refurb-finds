const userModel = require("../model/userModel");
const { ObjectId } = require('mongodb');
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
        res.status(500).json({ message: error });
    }
}


const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await userModel.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "user not found!" });

        const isValidPassword = await bcrypt.compare(password, existingUser.password);


        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const jsonToken = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);

        res.status(200).json({ user: existingUser, token: jsonToken })


    } catch (error) {
        console.log("Error during signin User : ", error);
        res.status(500).json(error)
    }
}

const postLikeItems = async (req, res) => {
    try {
        const { likedProductId, userId } = req.body;


        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $addToSet: { likedItems: likedProductId } },
            { new: true } // Return the updated user
        );

        const user = await userModel.findOne({ _id: userId });

        if (updatedUser) {
            console.log('Item liked successfully');
            res.status(200).json({ user: user });
        } else {
            console.error('Failed to like item');
            res.status(500).send('Failed to like item');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

const removeLikeItems = async (req, res) => {
    try {
        const { likedProductId, userId } = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $pull: { likedItems: likedProductId } },
            { new: true } 
        );

        const user = await userModel.findOne({ _id: userId });

        if (updatedUser) {
            console.log('Item unliked successfully');
            res.status(200).json({ user: user }); 
        } else {
            console.error('Failed to unlike item');
            res.status(500).send('Failed to unlike item');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

const postCartItems = async (req, res) => {
    try {
        const { cartItemId, cartDetails, userId } = req.body;

        const existingUser = await userModel.findById(userId);

        const cartItemIdObj = new ObjectId(cartItemId);
        const existingCartItemIndex = existingUser.cartItems?.findIndex(item =>
            item._id.equals(cartItemIdObj)
        );
        
        console.log("item._id", existingUser.cartItems?.map(item => item._id));
        if (existingCartItemIndex !== -1) {
            existingUser.cartItems[existingCartItemIndex].quantity = cartDetails[0].quantity;
        } else {
            existingUser.cartItems.push(...cartDetails);
        }

        const updatedUser = await existingUser.save();

        console.log('Items added to cart successfully');
        res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};



const removeCartItems = async (req, res) => {
    try {
        const { cartItemId, userId } = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $pull: { cartItems: { _id: cartItemId } } },
            { new: true } 
        );

        const user = await userModel.findOne({ _id: userId });

        if (updatedUser) {
            console.log('Item removed from cart successfully');
            res.status(200).json({ user: user }); 
        } else {
            console.error('Failed to remove item from cart');
            res.status(500).send('Failed to remove item from cart');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};



module.exports = { registerUser, signInUser, postLikeItems, removeLikeItems, postCartItems, removeCartItems }
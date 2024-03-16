const express = require("express");
const { registerUser, signInUser, postLikeItems, removeLikeItems, postCartItems, removeCartItems } = require("../controller/userController");
const router = express.Router();


router.post("/register", registerUser);
router.post("/signin", signInUser);

router.post("/likeitems", postLikeItems);
router.patch("/likeitems", removeLikeItems);

router.post("/cartitems", postCartItems);
router.patch("/cartitems", removeCartItems);

module.exports = router
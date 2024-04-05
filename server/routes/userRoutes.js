const express = require("express");
const { registerUser, signInUser, postLikeItems, removeLikeItems, postCartItems, removeCartItems } = require("../controller/userController");
const auth = require("../middleware/auth");
const router = express.Router();


router.post("/register", registerUser);
router.post("/signin", signInUser);

router.post("/likeitems", auth, postLikeItems);
router.patch("/likeitems", auth,  removeLikeItems);

router.post("/cartitems", auth,  postCartItems);
router.patch("/cartitems", auth, removeCartItems);

module.exports = router
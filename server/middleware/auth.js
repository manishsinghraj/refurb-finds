const jsonwebtoken = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let user = jsonwebtoken.verify(token, SECRET_KEY);
            // req.userId = user.id; //passing userId from client, also can be picked up from req and pass it to next
            next();
        } else {
            return res.status(401).json({ message: "1 error Unauthorized" })
        }

    } catch (error) {
        res.status(401).json({ message: "2 error Unauthorized" })
    }
};

module.exports = auth;
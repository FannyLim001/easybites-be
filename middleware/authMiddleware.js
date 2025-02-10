const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {
        // Get token from headers (Bearer Token)
        const token = req.headers.authorization?.split(" ")[1]; 

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token" });
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Fetch user from database (excluding password)
        req.user = await User.findById(decoded.id).select("-password");

        next(); // Move to the next middleware
    } catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = protect;

import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        req.user = user;

        next();

    } catch (error) {
        console.error("Error in protectRoute middleware", error.message);

        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Unauthorized: Token has expired." });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Unauthorized: Invalid token." });
        }

        res.status(500).json({ message: "Internal Server Error" });
    }
}
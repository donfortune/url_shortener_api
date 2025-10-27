const jwt = require('jsonwebtoken');
const user = require('../Models/userModel');

exports.protectRoutes = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; // Get the Authorization header
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        
        const token = authHeader.split(' ')[1]; // split the authHeader to get the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        
        const existingUser = user.findOne({ email: decoded.email });
        if (!existingUser) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = existingUser; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Unauthorized access' });
    }
}


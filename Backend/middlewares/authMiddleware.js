const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user object from the decoded token to the request object
    req.user = decoded;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;

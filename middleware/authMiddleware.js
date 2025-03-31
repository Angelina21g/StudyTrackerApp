// Import jsonwebtoken to verify the user's token
import jwt from 'jsonwebtoken';

// This middleware protects routes by checking for a valid token
const authMiddleware = (req, res, next) => {
    
  // Get the token from the Authorization header
  // Format expected: "Bearer <token>"
  const token = req.headers.authorization?.split(' ')[1];

  // If no token is found, block access
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    // Verify the token using the secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store the decoded user data in the request object
    // (can be used later in protected routes)
    req.user = decoded;

    // Move on to the next piece of middleware or the route handler
    next();
  } catch (err) {
    // If the token is invalid or expired
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Export the middleware so it can be used in routes
export default authMiddleware;

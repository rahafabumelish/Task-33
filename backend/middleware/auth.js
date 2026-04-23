const jwt = require("jsonwebtoken");

// Middleware to protect routes and verify JWT token
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  let token;
// Check if token follows the format: Bearer <token>
  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token || token.trim() === "") {
    return res.status(401).json({
      message: "Token must be in format: Bearer <token>",
    });
  }
// Verify token using JWT secret key
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
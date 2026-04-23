const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Check if user exists and has a role
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Check if user's role is included in allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You do not have permission to access this resource",
        requiredRoles: roles,
        yourRole: req.user.role,
      });
    }
   // If role is allowed, continue to next middleware/controller
    next();
  };
};

module.exports = authorizeRoles;

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You do not have permission to access this resource",
        requiredRoles: roles,
        yourRole: req.user.role,
      });
    }

    next();
  };
};

module.exports = authorizeRoles;
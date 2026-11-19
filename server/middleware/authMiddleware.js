
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    // Read token from the browser cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Access denied. Please login first.",
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Attach user information to request
    req.userId = decoded.userId;

    // Allow request to continue
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token. Please login again.",
    });
  }
}

module.exports = authMiddleware;

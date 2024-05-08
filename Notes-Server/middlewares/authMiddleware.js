const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(req.headers, "req.headersreq.headers");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (user) {
      req.user = {
        id: user.id,
        username: user.username,
      };
      next();
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Authentication error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      return res.status(500).json({ message: "Internal server error", logOut: true });
    }
  }
};

module.exports = authMiddleware;

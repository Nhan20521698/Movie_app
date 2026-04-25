const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ❌ không có token
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Bearer token
    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");

    // 🔥 gắn user vào request
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
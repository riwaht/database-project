const jwt = require("jsonwebtoken");
const jwtSecret = process.env["JWT_SECRET"];

module.exports = {
  check: (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({
        status: false,
        error: {
          message: "Auth headers not provided in the request.",
        },
      });
    }

    if (!authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        status: false,
        error: {
          message: "Invalid auth mechanism.",
        },
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: false,
        error: {
          message: "Bearer token missing in the authorization headers.",
        },
      });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: false,
          error: "Invalid access token provided, please login again.",
        });
      }

      req.user = user;
      next();
    });
  },
};

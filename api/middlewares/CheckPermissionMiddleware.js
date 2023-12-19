const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

module.exports = {
  has: (role) => {
    return (req, res, next) => {
      const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(403).json({
          status: false,
          error: "Invalid access token provided, please login again.",
        });
      }

      jwt.verify(token, process.env["JWT_SECRET"], (err, decoded) => {
        if (err) {
          return res.status(403).json({
            status: false,
            error: "Failed to authenticate token.",
          });
        }

        const { userId } = decoded; // Extract user ID from the decoded token

        UserModel.findUser({ id: userId }).then((user) => {
          if (!user) {
            return res.status(403).json({
              status: false,
              error: "Invalid access token provided, please login again.",
            });
          }

          const userRole = user.role;

          if (userRole !== role) {
            return res.status(403).json({
              status: false,
              error: `You need to be a ${role} to access this endpoint.`,
            });
          }

          next();
        });
      });
    };
  },
};

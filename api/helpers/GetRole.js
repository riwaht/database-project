const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const GetRole = (token) => {
  jwt.verify(token, process.env["JWT_SECRET"], (err, decoded) => {
    const { userId } = decoded;

    UserModel.findUser({ userID: userId }).then((user) => {
      if (!user) {
        return "Invalid Token";
      }

      return user;
    });
  });
};

module.exports = GetRole;

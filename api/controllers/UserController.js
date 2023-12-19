const UserModel = require("../models/User");

module.exports = {
  getUser: (req, res) => {
    if (!Object.keys(req.body).length) {
      return res.status(412).json({
        status: false,
        message: "Request Body is missing parameters",
      });
    }

    const {
      userID: { userID },
    } = req;

    if (req.get(userID) === null) {
      return res.status(412).json({
        status: false,
        message: "Request Body has empty parameters",
      });
    }

    UserModel.findUser({ id: userID })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  updateUser: (req, res) => {
    const {
      user: { userID },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the user.",
        },
      });
    }

    UserModel.updateUser({ id: userID }, payload)
      .then(() => {
        return UserModel.findUser({ id: userID });
      })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteUser: (req, res) => {
    const {
      params: { userID },
    } = req;

    UserModel.deleteUser({ id: userID })
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfUsersDeleted: numberOfEntriesDeleted,
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getAllUsers: (req, res) => {
    UserModel.findAllUsers(req.query)
      .then((users) => {
        return res.status(200).json({
          status: true,
          data: users,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
};

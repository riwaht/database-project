const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const UserModel = {
  userID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  referenceID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: ["admin", "patient", "professional"],
    },
  },
};

module.exports = {
  initialize: (sequelize) => {
    const User = sequelize.define("user", UserModel);

    // Password hashing hook before creating or updating users
    User.beforeCreate(async (user) => {
      if (user.changed("password")) {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
      }
    });

    User.beforeUpdate(async (user) => {
      if (user.changed("password")) {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
      }
    });

    this.model = User;
  },

  findUser: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateUser: (updatedValue, query) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllUsers: (query) => {
    return this.model.findAll({
      where: query,
    });
  },

  findUserWithPassword: async (userID, password) => {
    const user = await this.model.findOne({ where: { userID } });

    if (!user) {
      return null; // User not found
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null; // Incorrect password
    }

    return user; // Return the user if password is valid
  },

  deleteUser: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};

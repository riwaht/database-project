const { DataTypes } = require("sequelize");
const moment = require("moment");

const PatientModel = {
  patientID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 255],
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 255],
    },
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isBefore: {
        args: moment().format("YYYY-MM-DD"), // Get today's date in YYYY-MM-DD format
        msg: "Date of birth must be before today",
      },
      isCorrectFormat(value) {
        if (!moment(value, "YYYY-MM-DD", true).isValid()) {
          throw new Error("Invalid date format. Use YYYY-MM-DD format");
        }
      },
    },
  },
  gender: {
    type: DataTypes.CHAR,
    allowNull: false,
    defaultValue: "M",
    validate: {
      is: ["M", "F"],
    },
  },
};

module.exports = {
  initialize: (sequelize) => {
    this.model = sequelize.define("patient", PatientModel);
  },

  createUser: (user) => {
    return this.model.create(user);
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

  deleteUser: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};

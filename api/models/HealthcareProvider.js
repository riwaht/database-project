const { DataTypes } = require("sequelize");

const HealthcareProviderModel = {
  providerID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profession: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
      isBefore: {
        args: new Date().toISOString().split("T")[0], // Get today's date in YYYY-MM-DD format
        msg: "Date of birth must be before today",
      },
    },
  },
};

module.exports = {
  initialize: (sequelize) => {
    const HealthcareProvider = sequelize.define(
      "healthcare_provider",
      HealthcareProviderModel
    );

    this.model = HealthcareProvider;
  },
  createProvider: (provider) => {
    return this.model.create(provider);
  },
  findProvider: (query) => {
    return this.model.findOne({
      where: query,
    });
  },
  updateProvider: (updatedValue, query) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },
  findAllProviders: (query) => {
    return this.model.findAll({
      where: query,
    });
  },
  deleteProvider: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};

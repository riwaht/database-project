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
        args: new Date().toISOString().split('T')[0], // Get today's date in YYYY-MM-DD format
        msg: "Date of birth must be before today",
      },
    },
  },
};

module.exports = {
  initialize: (sequelize) => {
    const HealthcareProvider = sequelize.define("healthcare_provider", HealthcareProviderModel);

    return {
      model: HealthcareProvider,
      createProvider: (provider) => {
        return HealthcareProvider.create(provider);
      },
      findProvider: (query) => {
        return HealthcareProvider.findOne({
          where: query,
        });
      },
      updateProvider: (query, updatedValue) => {
        return HealthcareProvider.update(updatedValue, {
          where: query,
        });
      },
      findAllProviders: (query) => {
        return HealthcareProvider.findAll({
          where: query,
        });
      },
      deleteProvider: (query) => {
        return HealthcareProvider.destroy({
          where: query,
        });
      },
    };
  },
};

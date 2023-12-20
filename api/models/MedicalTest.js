const { DataTypes } = require("sequelize");

const MedicalTestsModel = {
  testID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  testType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  testDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  resultsData: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
};

module.exports = {
  initialize: (sequelize) => {
    const MedicalTests = sequelize.define("medical_tests", MedicalTestsModel);

    this.model = MedicalTests;
  },
  createMedicalTest: (medicalTest) => {
    return this.model.create(medicalTest);
  },
  findMedicalTest: (query) => {
    return this.model.findOne({
      where: query,
    });
  },
  updateMedicalTest: (updatedValue, query) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },
  findAllMedicalTests: (query) => {
    return this.model.findAll({
      where: query,
    });
  },
  deleteMedicalTest: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};

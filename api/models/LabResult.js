const { DataTypes } = require("sequelize");

const LabResultsModel = {
  resultID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  patientID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  testName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  testResult: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  testDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
};

module.exports = {
  initialize: (sequelize) => {
    const LabResults = sequelize.define("lab_results", LabResultsModel);

    LabResults.belongsTo(sequelize.models.patient, {
      foreignKey: "patientID",
      onDelete: "CASCADE",
    });

    this.model = LabResults;
  },
  createLabResult: (labResult) => {
    return LabResults.create(labResult);
  },
  findLabResult: (query) => {
    return LabResults.findOne({
      where: query,
    });
  },
  updateLabResult: (updatedValue, query) => {
    return LabResults.update(updatedValue, {
      where: query,
    });
  },
  findAllLabResults: (query) => {
    return LabResults.findAll({
      where: query,
    });
  },
  deleteLabResult: (query) => {
    return LabResults.destroy({
      where: query,
    });
  },
};

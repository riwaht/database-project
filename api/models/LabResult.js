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
    return this.model.create(labResult);
  },
  findLabResult: (query) => {
    return this.model.findOne({
      where: query,
    });
  },
  updateLabResult: (updatedValue, query) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },
  findAllLabResults: (query) => {
    return this.model.findAll({
      where: query,
    });
  },
  deleteLabResult: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};

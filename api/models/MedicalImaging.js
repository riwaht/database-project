const { DataTypes } = require("sequelize");

const MedicalImagingModel = {
  imagingID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  testID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imagingType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagingData: {
    type: DataTypes.BLOB("long"),
    allowNull: false,
  },
  report: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
};

module.exports = {
  initialize: (sequelize) => {
    const MedicalImaging = sequelize.define(
      "medical_imaging",
      MedicalImagingModel
    );

    MedicalImaging.belongsTo(sequelize.models.medical_tests, {
      foreignKey: "testID",
      onDelete: "CASCADE",
    });

    this.model = MedicalImaging;
  },

  createMedicalImaging: (medicalImaging) => {
    return this.model.create(medicalImaging);
  },
  findMedicalImaging: (query) => {
    return this.model.findOne({
      where: query,
    });
  },
  updateMedicalImaging: (updatedValue, query) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },
  findAllMedicalImaging: (query) => {
    return this.model.findAll({
      where: query,
    });
  },
  deleteMedicalImaging: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};

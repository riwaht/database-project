const { DataTypes } = require("sequelize");

const MedicalRecordModel = {
  recordID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  patientID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  visitDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  diagnosis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  treatment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
};

module.exports = {
  initialize: (sequelize) => {
    const MedicalRecord = sequelize.define(
      "medical_record",
      MedicalRecordModel
    );

    MedicalRecord.belongsTo(sequelize.models.patient, {
      foreignKey: "patientID",
      onDelete: "CASCADE",
    });

    this.model = MedicalRecord;
  },

  createMedicalRecord: (medicalRecord) => {
    return MedicalRecord.create(medicalRecord);
  },

  findMedicalRecord: (query) => {
    return MedicalRecord.findOne({
      where: query,
    });
  },

  updateMedicalRecord: (updatedValue, query) => {
    return MedicalRecord.update(updatedValue, {
      where: query,
    });
  },

  findAllMedicalRecords: (query) => {
    return MedicalRecord.findAll({
      where: query,
    });
  },

  deleteMedicalRecord: (query) => {
    return MedicalRecord.destroy({
      where: query,
    });
  },
};

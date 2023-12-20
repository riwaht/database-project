const { DataTypes } = require("sequelize");

const PrescriptionModel = {
  prescriptionID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  drugID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  patientID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  providerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dispenseDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: "Quantity must be greater than 0",
      },
    },
  },
};

module.exports = {
  initialize: (sequelize) => {
    const Prescription = sequelize.define("prescription", PrescriptionModel);

    Prescription.belongsTo(sequelize.models.drug, {
      foreignKey: "drugID",
      onDelete: "CASCADE",
    });

    Prescription.belongsTo(sequelize.models.patient, {
      foreignKey: "patientID",
      onDelete: "CASCADE",
    });

    Prescription.belongsTo(sequelize.models.healthcare_provider, {
      foreignKey: "providerID",
      onDelete: "CASCADE",
    });

    this.model = Prescription;
  },
  createPrescription: (prescription) => {
    return this.model.create(prescription);
  },
  findPrescription: (query) => {
    return this.model.findOne({
      where: query,
    });
  },
  updatePrescription: (updatedValue, query) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },
  findAllPrescriptions: (query) => {
    return this.model.findAll({
      where: query,
    });
  },
  deletePrescription: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};

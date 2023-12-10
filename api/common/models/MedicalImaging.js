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
        type: DataTypes.BLOB('long'),
        allowNull: false,
    },
    report: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
};

module.exports = {
    initialize: (sequelize) => {
        const MedicalImaging = sequelize.define("medical_imaging", MedicalImagingModel);

        MedicalImaging.belongsTo(sequelize.models.medical_tests, {
            foreignKey: "testID",
            onDelete: "CASCADE",
        });

        return {
            model: MedicalImaging,
            createMedicalImaging: (medicalImaging) => {
                return MedicalImaging.create(medicalImaging);
            },
            findMedicalImaging: (query) => {
                return MedicalImaging.findOne({
                    where: query,
                });
            },
            updateMedicalImaging: (query, updatedValue) => {
                return MedicalImaging.update(updatedValue, {
                    where: query,
                });
            },
            findAllMedicalImaging: (query) => {
                return MedicalImaging.findAll({
                    where: query,
                });
            },
            deleteMedicalImaging: (query) => {
                return MedicalImaging.destroy({
                    where: query,
                });
            },
        };
    },
};

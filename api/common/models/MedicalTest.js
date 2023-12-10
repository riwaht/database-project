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

        return {
            model: MedicalTests,
            createMedicalTest: (medicalTest) => {
                return MedicalTests.create(medicalTest);
            },
            findMedicalTest: (query) => {
                return MedicalTests.findOne({
                    where: query,
                });
            },
            updateMedicalTest: (query, updatedValue) => {
                return MedicalTests.update(updatedValue, {
                    where: query,
                });
            },
            findAllMedicalTests: (query) => {
                return MedicalTests.findAll({
                    where: query,
                });
            },
            deleteMedicalTest: (query) => {
                return MedicalTests.destroy({
                    where: query,
                });
            },
        };
    },
};

const { DataTypes } = require("sequelize");

const DrugModel = {
    drugID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    drugName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    drugCategory: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [1],
                msg: "Price must be greater than 0",
            },
        },
    },
};

module.exports = {
    initialize: (sequelize) => {
        const Drug = sequelize.define("drug", DrugModel);

        return {
            model: Drug,
            createDrug: (drug) => {
                return Drug.create(drug);
            },
            findDrug: (query) => {
                return Drug.findOne({
                    where: query,
                });
            },
            updateDrug: (query, updatedValue) => {
                return Drug.update(updatedValue, {
                    where: query,
                });
            },
            findAllDrugs: (query) => {
                return Drug.findAll({
                    where: query,
                });
            },
            deleteDrug: (query) => {
                return Drug.destroy({
                    where: query,
                });
            },
        };
    },
};

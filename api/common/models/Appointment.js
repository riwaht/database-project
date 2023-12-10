const { DataTypes } = require("sequelize");

const AppointmentModel = {
    appointmentID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    appointmentType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
};

module.exports = {
    initialize: (sequelize) => {
        const Appointment = sequelize.define("appointment", AppointmentModel);

        Appointment.belongsTo(sequelize.models.patient, {
            foreignKey: "patientID",
            onDelete: "CASCADE",
        });

        Appointment.belongsTo(sequelize.models.healthcare_provider, {
            foreignKey: "providerID",
            onDelete: "CASCADE",
        });

        this.model = Appointment
    },
    createAppointment: (appointment) => {
        return this.model.create(appointment);
    },
    findAppointment: (query) => {
        return this.model.findOne({
            where: query,
        });
    },
    updateAppointment: (query, updatedValue) => {
        return this.model.update(updatedValue, {
            where: query,
        });
    },
    findAllAppointments: (query) => {
        return this.model.findAll({
            where: query,
        });
    },
    deleteAppointment: (query) => {
        return this.model.destroy({
            where: query,
        });
    },
};

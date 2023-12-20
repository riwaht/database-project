const AppointmentModel = require("../models/Appointment");

const AppointmentController = {
  createAppointment: async (req, res) => {
    try {
      const {
        patientID,
        providerID,
        appointmentType,
        status,
        date,
        description,
      } = req.body;

      const newAppointment = await AppointmentModel.create({
        patientID,
        providerID,
        appointmentType,
        status,
        date,
        description,
      });

      return res
        .status(201)
        .json({ success: true, appointment: newAppointment });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  getAppointmentById: async (req, res) => {
    try {
      const appointmentId = req.params.id;

      const appointment = await AppointmentModel.findAppointment({
        appointmentID: appointmentId,
      });

      if (!appointment) {
        return res
          .status(404)
          .json({ success: false, message: "Appointment not found" });
      }

      return res.status(200).json({ success: true, appointment: appointment });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  getProfessionalAppointments: async (req, res, next) => {
    try {
      const professionalAppointments =
        await AppointmentModel.findAllAppointments({
          providerID: req.params.id,
        });

      if (!professionalAppointments) {
        return res
          .status(404)
          .json({ success: false, message: "No Appointment found" });
      }

      return res
        .status(200)
        .json({ success: true, appointments: professionalAppointments });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  // Patient-specific appointments
  getPatientAppointments: async (req, res) => {
    try {
      const patientAppointments = await AppointmentModel.find({
        patientID: req.params.id,
      });

      console.log(patientAppointments);
      console.log(req);
      return res
        .status(200)
        .json({ success: true, appointments: patientAppointments });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  updateAppointment: async (req, res) => {
    try {
      const appointmentId = req.params.id;
      const updatedAppointmentData = req.body;

      // Update appointment using the model method
      const updatedAppointment = await AppointmentModel.updateAppointment(
        { appointmentID: appointmentId },
        updatedAppointmentData
      );

      return res
        .status(200)
        .json({ success: true, appointment: updatedAppointment });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  getAllAppointments: async (req, res) => {
    try {
      // Retrieve all appointments using the model method
      const appointments = await AppointmentModel.findAllAppointments({});

      return res.status(200).json({ success: true, appointments });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteAppointment: async (req, res) => {
    try {
      const appointmentId = req.params.id; // Extract appointment ID from request parameters

      // Delete appointment using the model method
      await AppointmentModel.deleteAppointment({
        appointmentID: appointmentId,
      });

      return res
        .status(204)
        .json({ success: true, message: "Appointment deleted successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
};

module.exports = AppointmentController;

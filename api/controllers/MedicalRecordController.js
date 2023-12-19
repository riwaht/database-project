const MedicalRecordModel = require("../models/MedicalRecord");

const MedicalRecordController = {
  createMedicalRecord: async (req, res) => {
    try {
      const { patientID, visitDate, diagnosis, treatment } = req.body;

      // Create a new medical record using the model method
      const newMedicalRecord = await sequelize.models.medical_record.create({
        patientID,
        visitDate,
        diagnosis,
        treatment,
      });

      res.status(201).json({ success: true, medicalRecord: newMedicalRecord });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getMedicalRecordById: async (req, res) => {
    try {
      const { id } = req.params;

      // Find medical record by ID using the model method
      const medicalRecord = await sequelize.models.medical_record.findOne({
        where: { recordID: id },
      });

      if (!medicalRecord) {
        return res
          .status(404)
          .json({ success: false, message: "Medical record not found" });
      }

      res.status(200).json({ success: true, medicalRecord });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getMedicalRecordByPatientId: async (req, res) => {
    try {
      const { id, patientID } = req.params;

      // Find medical record by ID using the model method
      const medicalRecord = await sequelize.models.medical_record.findOne({
        where: { recordID: id, patientID: patientID },
      });

      if (!medicalRecord) {
        return res
          .status(404)
          .json({ success: false, message: "Medical record not found" });
      }

      res.status(200).json({ success: true, medicalRecord: medicalRecord });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateMedicalRecord: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedValues = req.body;

      // Update medical record using the model method
      const [updatedRowsCount] = await sequelize.models.medical_record.update(
        updatedValues,
        {
          where: { recordID: id },
        }
      );

      if (updatedRowsCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Medical record not found" });
      }

      res.status(200).json({
        success: true,
        message: "Medical record updated successfully",
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getAllMedicalRecords: async (req, res) => {
    try {
      // Retrieve all medical records using the model method
      const medicalRecords = await sequelize.models.medical_record.findAll({});

      res.status(200).json({ success: true, medicalRecords });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteMedicalRecord: async (req, res) => {
    try {
      const { id } = req.params;

      // Delete medical record using the model method
      const deletedRowCount = await sequelize.models.medical_record.destroy({
        where: { recordID: id },
      });

      if (deletedRowCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Medical record not found" });
      }

      res.status(204).json({
        success: true,
        message: "Medical record deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

module.exports = MedicalRecordController;

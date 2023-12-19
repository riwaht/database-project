const MedicalImagingModel = require("../models/MedicalImaging");

module.exports = {
  createMedicalImaging: async (req, res) => {
    try {
      const { testID, imagingType, imagingData, report } = req.body;

      // Create a new medical imaging record using the model method
      const newMedicalImaging = await MedicalImagingModel.create({
        testID,
        imagingType,
        imagingData,
        report,
      });

      res
        .status(201)
        .json({ success: true, medicalImaging: newMedicalImaging });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getMedicalImagingById: async (req, res) => {
    try {
      const { id } = req.params;

      // Find medical imaging record by ID using the model method
      const medicalImaging = await MedicalImagingModel.findOne({
        where: { imagingID: id },
      });

      if (!medicalImaging) {
        return res
          .status(404)
          .json({ success: false, message: "Medical imaging not found" });
      }

      res.status(200).json({ success: true, medicalImaging });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getMedicalImagingByPatientId: async (req, res) => {
    try {
      const { patientId } = req.params;

      // Find medical test records by patient ID
      const medicalTests = await sequelize.models.medical_tests.findAll({
        where: { patientID: patientId },
      });

      // Extract test IDs from medical test records
      const testIds = medicalTests.map((test) => test.testID);

      // Find medical imaging records related to the test IDs
      const medicalImagingRecords = await MedicalImagingModel.findAll({
        where: { testID: testIds },
      });

      res.status(200).json({ success: true, medicalImagingRecords });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateMedicalImaging: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedMedicalImagingData = req.body;

      // Update medical imaging record by ID using the model method
      const [updatedRowsCount] = await MedicalImagingModel.update(
        updatedMedicalImagingData,
        { where: { imagingID: id } }
      );

      if (updatedRowsCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Medical imaging not found" });
      }

      res.status(200).json({
        success: true,
        message: "Medical imaging updated successfully",
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getAllMedicalImaging: async (req, res) => {
    try {
      // Retrieve all medical imaging records using the model method
      const medicalImagingRecords = await MedicalImagingModel.findAll({});

      res.status(200).json({ success: true, medicalImagingRecords });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteMedicalImaging: async (req, res) => {
    try {
      const { id } = req.params;

      // Delete medical imaging record by ID using the model method
      const deletedRowsCount = await MedicalImagingModel.destroy({
        where: { imagingID: id },
      });

      if (deletedRowsCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Medical imaging not found" });
      }

      res.status(204).json({
        success: true,
        message: "Medical imaging deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

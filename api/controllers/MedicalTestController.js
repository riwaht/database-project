const MedicalTestModel = require("../models/MedicalTest");

const MedicalTestsController = {
  createMedicalTest: async (req, res, next) => {
    try {
      const { testType, testDate, resultsData } = req.body;
      const newMedicalTest = await MedicalTestsModel.createMedicalTest({
        testType,
        testDate,
        resultsData,
      });

      res.status(201).json({ success: true, medicalTest: newMedicalTest });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getMedicalTestById: async (req, res, next) => {
    try {
      const testId = req.params.id;
      const medicalTest = await MedicalTestsModel.findMedicalTest({
        testID: testId,
      });

      if (!medicalTest) {
        return res
          .status(404)
          .json({ success: false, message: "Medical test not found" });
      }

      res.status(200).json({ success: true, medicalTest });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getMedicalTestByPatientId: async (req, res) => {
    try {
      const { id, patientID } = req.params;

      // Find medical record by ID using the model method
      const medicalTest = await MedicalTestModel.findOne({
        where: { recordID: id, patientID: patientID },
      });

      if (!medicalTest) {
        return res
          .status(404)
          .json({ success: false, message: "Medical test not found" });
      }

      res.status(200).json({ success: true, medicalTest: medicalTest });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateMedicalTest: async (req, res, next) => {
    try {
      const testId = req.params.id;
      const updatedData = req.body;

      const updatedMedicalTest = await MedicalTestsModel.updateMedicalTest(
        updatedData,
        { testID: testId }
      );

      res.status(200).json({ success: true, medicalTest: updatedMedicalTest });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getAllMedicalTests: async (req, res, next) => {
    try {
      const allMedicalTests = await MedicalTestsModel.findAllMedicalTests({});

      res.status(200).json({ success: true, medicalTests: allMedicalTests });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteMedicalTest: async (req, res, next) => {
    try {
      const testId = req.params.id;
      await MedicalTestsModel.deleteMedicalTest({ testID: testId });

      res
        .status(204)
        .json({ success: true, message: "Medical test deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

module.exports = MedicalTestsController;

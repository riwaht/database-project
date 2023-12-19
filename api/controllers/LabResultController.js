const LabResultModel = require("../models/LabResult");

const LabResultController = {
  createLabResult: async (req, res, next) => {
    try {
      const { patientID, testName, testResult, testDate } = req.body;

      // Create a new lab result using the model method
      const newLabResult = await LabResultsModel.createLabResult({
        patientID,
        testName,
        testResult,
        testDate,
      });

      res.status(201).json({ success: true, labResult: newLabResult });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getLabResultByPatientId: async (req, res, next) => {
    try {
      const labResultId = req.params.id; // Extract lab result ID from request parameters

      // Find lab result by ID using the model method
      const labResult = await LabResultsModel.findLabResult({
        patientID: labResultId,
      });

      if (!labResult) {
        return res
          .status(404)
          .json({ success: false, message: "No Lab results for this patient" });
      }

      res.status(200).json({ success: true, labResult });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getSpecificLabResultByPatientId: async (req, res, next) => {
    try {
      const labResultId = req.params.id;
      const patientId = req.params.patientId;

      if (req.user.id !== patientId) {
        return res
          .status(403)
          .json({
            success: false,
            message: "You do not have access to other patient results",
          });
      }

      const labResult = await LabResultsModel.findLabResult({
        labResultId: labResultId,
        patientID: patientId,
      });

      if (!labResult) {
        return res
          .status(404)
          .json({ success: false, message: "No Lab results for this patient" });
      }

      res.status(200).json({ success: true, labResult });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getLabResultById: async (req, res, next) => {
    try {
      const labResultId = req.params.id; // Extract lab result ID from request parameters

      // Find lab result by ID using the model method
      const labResult = await LabResultsModel.findLabResult({
        resultID: labResultId,
      });

      if (!labResult) {
        return res
          .status(404)
          .json({ success: false, message: "Lab result not found" });
      }

      res.status(200).json({ success: true, labResult });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateLabResult: async (req, res, next) => {
    try {
      const labResultId = req.params.id; // Extract lab result ID from request parameters
      const updatedLabResultData = req.body; // Updated data for the lab result

      // Update lab result using the model method
      const updatedLabResult = await LabResultsModel.updateLabResult(
        { resultID: labResultId },
        updatedLabResultData
      );

      res.status(200).json({ success: true, labResult: updatedLabResult });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getAllLabResults: async (req, res, next) => {
    try {
      // Retrieve all lab results using the model method
      const labResults = await LabResultsModel.findAllLabResults({});

      res.status(200).json({ success: true, labResults });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteLabResult: async (req, res, next) => {
    try {
      const labResultId = req.params.id; // Extract lab result ID from request parameters

      // Delete lab result using the model method
      await LabResultsModel.deleteLabResult({ resultID: labResultId });

      res
        .status(204)
        .json({ success: true, message: "Lab result deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

module.exports = LabResultController;

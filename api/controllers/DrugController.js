const DrugModel = require("../models/Drug");

const DrugController = {
  createDrug: async (req, res, next) => {
    try {
      const { drugName, drugCategory, price } = req.body;

      // Create a new drug using the model method
      const newDrug = await DrugModel.createDrug({
        drugName,
        drugCategory,
        price,
      });

      res.status(201).json({ success: true, drug: newDrug });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getDrugById: async (req, res, next) => {
    try {
      const drugId = req.params.id; // Extract drug ID from request parameters

      // Find drug by ID using the model method
      const drug = await DrugModel.findDrug({ drugID: drugId });

      if (!drug) {
        return res
          .status(404)
          .json({ success: false, message: "Drug not found" });
      }

      res.status(200).json({ success: true, drug });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateDrug: async (req, res, next) => {
    try {
      const drugId = req.params.id; // Extract drug ID from request parameters
      const updatedDrugData = req.body; // Updated data for the drug

      // Update drug using the model method
      const updatedDrug = await DrugModel.updateDrug(
        { drugID: drugId },
        updatedDrugData
      );

      res.status(200).json({ success: true, drug: updatedDrug });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getAllDrugs: async (req, res, next) => {
    try {
      // Retrieve all drugs using the model method
      const drugs = await DrugModel.findAllDrugs({});

      res.status(200).json({ success: true, drugs });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteDrug: async (req, res, next) => {
    try {
      const drugId = req.params.id; // Extract drug ID from request parameters

      // Delete drug using the model method
      await DrugModel.deleteDrug({ drugID: drugId });

      res
        .status(204)
        .json({ success: true, message: "Drug deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

module.exports = DrugController;

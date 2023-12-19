const PrescriptionModel = require("../models/Prescription");

const PrescriptionController = {
  createPrescription: async (req, res, next) => {
    try {
      const { drugID, patientID, providerID, dispenseDate, quantity } =
        req.body;
      const newPrescription = await PrescriptionModel.createPrescription({
        drugID,
        patientID,
        providerID,
        dispenseDate,
        quantity,
      });

      res.status(201).json({ success: true, prescription: newPrescription });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getPrescriptionById: async (req, res, next) => {
    try {
      const prescriptionId = req.params.id;
      const prescription = await PrescriptionModel.findPrescription({
        prescriptionID: prescriptionId,
      });

      if (!prescription) {
        return res
          .status(404)
          .json({ success: false, message: "Prescription not found" });
      }

      res.status(200).json({ success: true, prescription });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getPrescriptionByPatientId: async (req, res, next) => {
    try {
      const { id, patientID } = req.params;

      const prescription = await PrescriptionModel.findOne({
        where: { recordID: id, patientID: patientID },
      });

      if (!prescription) {
        return res
          .status(404)
          .json({ success: false, message: "Medical test not found" });
      }

      res.status(200).json({ success: true, prescription: prescription });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updatePrescription: async (req, res, next) => {
    try {
      const prescriptionId = req.params.id;
      const updatedData = req.body;

      const updatedPrescription = await PrescriptionModel.updatePrescription(
        updatedData,
        { prescriptionID: prescriptionId }
      );

      res
        .status(200)
        .json({ success: true, prescription: updatedPrescription });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getAllPrescriptions: async (req, res, next) => {
    try {
      const allPrescriptions = await PrescriptionModel.findAllPrescriptions({});

      res.status(200).json({ success: true, prescriptions: allPrescriptions });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deletePrescription: async (req, res, next) => {
    try {
      const prescriptionId = req.params.id;
      await PrescriptionModel.deletePrescription({
        prescriptionID: prescriptionId,
      });

      res
        .status(204)
        .json({ success: true, message: "Prescription deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

module.exports = PrescriptionController;

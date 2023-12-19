const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("../middlewares/IsAuthenticatedMiddleware");
const CheckPermissionMiddleware = require("../middlewares/CheckPermissionMiddleware");

// Controller Imports
const MedicalResultsController = require("../controllers/MedicalRecordController");

const GetRole = require("../helpers/GetRole");

router.get(
  "/",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  MedicalResultsController.getAllMedicalRecords
);

router.get("/:id", isAuthenticatedMiddleware.check, (req, res) => {
  const userRole = GetRole(req.user).role;

  if (userRole === "admin" || userRole === "professional") {
    MedicalResultsController.getMedicalRecordById;
  } else if (userRole === "patient") {
    MedicalResultsController.getMedicalRecordByPatientId;
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access" });
  }
});

router.post(
  "/",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  MedicalResultsController.createMedicalRecord
);

router.patch(
  "/:id",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  MedicalResultsController.updateMedicalRecord
);

router.delete(
  "/:id",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  MedicalResultsController.deleteMedicalRecord
);

module.exports = router;

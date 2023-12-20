const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("../middlewares/IsAuthenticatedMiddleware");
const CheckPermissionMiddleware = require("../middlewares/CheckPermissionMiddleware");

// Controller Imports
const PrescriptionController = require("../controllers/PrescriptionController");

const GetRole = require("../helpers/GetRole");

router.get(
  "/",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  PrescriptionController.getAllPrescriptions
);

router.get("/:id", (req, res) => {
  const userRole = req.query.userRole;

  if (userRole === "admin" || userRole === "professional") {
    PrescriptionController.getPrescriptionById(req, res);
  } else if (userRole === "patient") {
    PrescriptionController.getPrescriptionByPatientId(req, res);
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access" });
  }
});

router.post("/", isAuthenticatedMiddleware.check, (req, res) => {
  const userRole = GetRole(req.user).role;

  if (userRole === "admin" || userRole === "professional") {
    PrescriptionController.createMedicalTest;
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access" });
  }
});

router.patch(
  "/:id",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  PrescriptionController.updatePrescription
);

router.delete(
  "/:id",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  PrescriptionController.deletePrescription
);

module.exports = router;

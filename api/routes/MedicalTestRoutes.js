const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("../middlewares/IsAuthenticatedMiddleware");
const CheckPermissionMiddleware = require("../middlewares/CheckPermissionMiddleware");

// Controller Imports
const MedicalTestController = require("../controllers/MedicalTestController");

const GetRole = require("../helpers/GetRole");

router.get(
  "/",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  MedicalTestController.getAllMedicalTests
);

router.get("/:id", isAuthenticatedMiddleware.check, (req, res) => {
  const userRole = GetRole(req.user).role;

  if (userRole === "admin" || userRole === "professional") {
    MedicalTestController.getMedicalTestById;
  } else if (userRole === "patient") {
    MedicalTestController.getMedicalTestByPatientId;
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access" });
  }
});

router.post(
  "/",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  MedicalTestController.createMedicalTest
);

router.patch(
  "/:id",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  MedicalTestController.updateMedicalTest
);

router.delete(
  "/:id",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  MedicalTestController.deleteMedicalTest
);

module.exports = router;

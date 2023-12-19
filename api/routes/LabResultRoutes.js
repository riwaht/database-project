const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("../middlewares/IsAuthenticatedMiddleware");
const CheckPermissionMiddleware = require("../middlewares/CheckPermissionMiddleware");

// Controller Imports
const LabResultController = require("../controllers/LabResultController");

const GetRole = require("../helpers/GetRole");

router.get(
  "/",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  LabResultController.getAllLabResults
);

router.get("/:id", isAuthenticatedMiddleware.check, (req, res) => {
  const userRole = GetRole(req.user).role;

  if (userRole === "admin" || userRole === "professional") {
    return LabResultController.getLabResultByPatientId;
  } else if (userRole === "patient") {
    return LabResultController.getSpecificLabResultByPatientId;
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access" });
  }
});

router.post(
  "/",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  LabResultController.createLabResult
);

router.patch(
  "/:id",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  LabResultController.updateLabResult
);

router.delete(
  "/:id",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  LabResultController.updateLabResult
);

module.exports = router;

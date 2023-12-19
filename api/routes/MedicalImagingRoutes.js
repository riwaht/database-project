const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("../middlewares/IsAuthenticatedMiddleware");
const CheckPermissionMiddleware = require("../middlewares/CheckPermissionMiddleware");

// Controller Imports
const MedicalImagingController = require("../controllers/MedicalImagingController");

const GetRole = require("../helpers/GetRole");

router.get(
  "/",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  MedicalImagingController.getAllMedicalImaging
);

router.get("/:id", isAuthenticatedMiddleware.check, (req, res, next) => {
  const userRole = GetRole(req.user).role;

  if (userRole === "professional" || userRole === "admin") {
    return MedicalImagingController.getMedicalImagingById(req, res, next);
  } else if (userRole === "patient") {
    return MedicalImagingController.getMedicalImagingByPatientId(
      req,
      res,
      next
    );
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access" });
  }
});

router.post(
  "/",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  MedicalImagingController.createMedicalImaging
);

router.patch(
  "/:id",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  MedicalImagingController.updateMedicalImaging
);

router.delete(
  "/:id",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  MedicalImagingController.deleteMedicalImaging
);

module.exports = router;

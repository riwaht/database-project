const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("../middlewares/IsAuthenticatedMiddleware");
const CheckPermissionMiddleware = require("../middlewares/CheckPermissionMiddleware");

// Controller Imports
const AppointmentController = require("../controllers/AppointmentController");

const GetRole = require("../helpers/GetRole");

router.get(
  "/",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  AppointmentController.getAllAppointments
);

router.get("/:id", isAuthenticatedMiddleware.check, (req, res, next) => {
  const userRole = GetRole(req.user).role;

  if (userRole === "professional") {
    return AppointmentController.getProfessionalAppointments(req, res, next);
  } else if (userRole === "patient") {
    return AppointmentController.getPatientAppointments(req, res, next);
  } else if (userRole === "admin") {
    return AppointmentController.getAppointmentById(req, res, next);
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access" });
  }
});

router.post(
  "/",
  isAuthenticatedMiddleware.check,
  AppointmentController.createAppointment
);

router.patch(
  "/:id",
  isAuthenticatedMiddleware.check,
  AppointmentController.updateAppointment
);

router.delete(
  "/:id",
  isAuthenticatedMiddleware.check,
  AppointmentController.deleteAppointment
);

module.exports = router;

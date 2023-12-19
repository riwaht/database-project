const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("../middlewares/IsAuthenticatedMiddleware");
const CheckPermissionMiddleware = require("../middlewares/CheckPermissionMiddleware");

// Controller Imports
const DrugController = require("../controllers/DrugController");

router.get("/all", isAuthenticatedMiddleware.check, DrugController.getAllDrugs);

router.get("/:id", isAuthenticatedMiddleware.check, DrugController.getDrugById);

router.post(
  "/",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  DrugController.createDrug
);

router.patch(
  "/:id",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  DrugController.updateDrug
);

router.delete(
  "/:id",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  DrugController.deleteDrug
);

module.exports = router;

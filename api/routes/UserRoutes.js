const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("../middlewares/IsAuthenticatedMiddleware");
const CheckPermissionMiddleware = require("../middlewares/CheckPermissionMiddleware");

// Controller Imports
const UserController = require("../controllers/UserController");

router.get(
  "/",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  UserController.getUser
);

router.get(
  "/all",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  UserController.getAllUsers
);

router.patch(
  "/update/:userId",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  UserController.updateUser
);

router.delete(
  "/:userId",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
  UserController.deleteUser
);

module.exports = router;

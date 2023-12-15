const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// Controller Imports
const UserController = require("./controllers/UserController");

router.get("/", UserController.getUser);

router.get("/all",
    [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has("admin")],
    UserController.getAllUsers);

router.patch(
  "/update/:userId",
  UserController.updateUser
);

router.delete(
  "/:userId",
  [isAuthenticatedMiddleware.check],
  UserController.deleteUser
);

module.exports = router;

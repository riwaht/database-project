const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("./models/User");
const Patients = require("./models/Patient");
const Provider = require("./models/HealthcareProvider");
const IsAuthenticatedMiddleware = require("./middlewares/IsAuthenticatedMiddleware");
const { INTEGER } = require("sequelize");

const router = express.Router();

// Login endpoint
router.post("/login", async (req, res) => {
  const { userID, password } = req.body;
  try {
    const user = await Users.findUser({ userID });

    if (!user) {
      return res.status(401).json({
        status: false,
        error: {
          message: "Invalid credentials.",
        },
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: false,
        error: {
          message: "Invalid credentials.",
        },
      });
    }

    console.log(user);

    const token = jwt.sign(
      { username: user.userID, role: user.role },
      process.env["JWT_SECRET"],
      {
        expiresIn: parseInt(process.env["JWT_EXPIRY"]), // Token expiration time
      }
    );

    if (user.role === "patient") {
      const patient = Patients.findUser({ patientID: user.refernceID });

      return res.status(200).json({
        status: true,
        token: token,
        data: user,
        patientData: patient,
      });
    } else if (user.role === "provider") {
      const provider = Provider.findProvider({ providerID: user.refernceID });

      return res.status(200).json({
        status: true,
        token: token,
        data: user,
        providerData: provider,
      });
    }

    return res.status(200).json({
      status: true,
      token: token,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: {
        message: error.message,
      },
    });
  }
});

// Protected route example using the IsAuthenticatedMiddleware
router.get("/protected", IsAuthenticatedMiddleware.check, (req, res) => {
  // Logic for the protected route
  res.status(200).json({
    message: "Access granted!",
    user: req.user,
  });
});

module.exports = router;

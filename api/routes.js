const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("./common/models/User");
const IsAuthenticatedMiddleware = require("./common/middlewares/IsAuthenticatedMiddleware");
const {INTEGER} = require("sequelize");

const router = express.Router();

// Login endpoint
router.post("/login", async (req, res) => {
    console.log(req);
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

        console.log(user)

        const token = jwt.sign({ username: user.userID, role: user.role }, process.env["JWT_SECRET"], {
            expiresIn: parseInt(process.env["JWT_EXPIRY"]), // Token expiration time
        });

        res.status(200).json({
            status: true,
            token: token,
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
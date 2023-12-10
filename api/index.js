// Imports Necessary
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");

// Environment Variables Setup
const dotenv = require("dotenv");
dotenv.config();

// Environment Variables assignment
const PORT = process.env["PORT"];

// Express Routes Import
// const AuthorizationRoutes = require("");
const UserRoutes = require("./users/routes");


// Sequelize Model Imports
const AppointmentModel = require("./common/models/Appointment");
const DrugModel = require("./common/models/Drug");
const HealthcareProviderModel = require("./common/models/HealthcareProvider");
const LabResultModel = require("./common/models/LabResult");
const MedicalImagingModel = require("./common/models/MedicalImaging");
const MedicalRecordModel = require("./common/models/MedicalRecord");
const MedicalTestModel = require("./common/models/MedicalTest");
const PatientModel = require("./common/models/Patient");
const PrescriptionsModel = require("./common/models/Prescriptions");
const UserModel = require("./common/models/User");


// App start
const app = express();
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(
  process.env["DB_NAME"],
  process.env["DB_USERNAME"],
  process.env["DB_PASSWORD"],
  {
    host: process.env["DB_HOST"],
    port: parseInt(process.env["DB_PORT"]),
    dialect: "mysql",
  }
);


sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully");
}).catch(error => {
    console.error("Unable to connect to the database:", error);
})

PatientModel.initialize(sequelize);
HealthcareProviderModel.initialize(sequelize);
UserModel.initialize(sequelize);
DrugModel.initialize(sequelize);
AppointmentModel.initialize(sequelize);
LabResultModel.initialize(sequelize);
MedicalRecordModel.initialize(sequelize);
MedicalTestModel.initialize(sequelize);
MedicalImagingModel.initialize(sequelize);
PrescriptionsModel.initialize(sequelize);

sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialized");

    app.listen(PORT, () => {
      console.log("Server listening on port:", PORT);
    });

    // Status Route
    app.get("/status", (req, res) => {
      const status = {
        Status: "Running",
        Check: "CHECK 2",
        Request: req.method,
      };

      res.send(status);
    });

    // Attaching the Authentication and User Routes to the app.
    app.use("/user", UserRoutes);
  })
  .catch((err) => {
    "Sequelize Error: " + err.message;
  });

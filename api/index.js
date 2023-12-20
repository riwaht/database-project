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

// Sequelize Model Imports
const AppointmentModel = require("./models/Appointment");
const DrugModel = require("./models/Drug");
const HealthcareProviderModel = require("./models/HealthcareProvider");
const LabResultModel = require("./models/LabResult");
const MedicalImagingModel = require("./models/MedicalImaging");
const MedicalRecordModel = require("./models/MedicalRecord");
const MedicalTestModel = require("./models/MedicalTest");
const PatientModel = require("./models/Patient");
const PrescriptionsModel = require("./models/Prescription");
const UserModel = require("./models/User");

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

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

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

// Express Routes Import
const GeneralRoutes = require("./routes.js");
const UserRoutes = require("./routes/UserRoutes");
const AppointmentRoutes = require("./routes/AppointmentRoutes");
const DrugRoutes = require("./routes/DrugRoutes");
const LabResultRoutes = require("./routes/LabResultRoutes");
const MedicalImagingRoutes = require("./routes/MedicalImagingRoutes");
const MedicalTestRoutes = require("./routes/MedicalTestRoutes");
const MedicalRecordRoutes = require("./routes/MedicalRecordRoutes");
const PrescriptionRoutes = require("./routes/PrescriptionRoutes");

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server listening on port:", PORT);
    });

    app.use("/", GeneralRoutes);
    app.use("/user", UserRoutes);
    app.use("/appointment", AppointmentRoutes);
    app.use("/drugs", DrugRoutes);
    app.use("/prescription", PrescriptionRoutes);
    app.use("/lab-result", LabResultRoutes);
    app.use("/medical-imaging", MedicalImagingRoutes);
    app.use("/medical-testing", MedicalTestRoutes);
    app.use("/medical-record", MedicalRecordRoutes);
  })
  .catch((err) => {
    "Sequelize Error: " + err.message;
  });

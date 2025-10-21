const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const configFn = require("./config/default");
const { registerRoutes } = require("./routes");
const nodemailer = require("nodemailer");

const app = express();

const initialize = async () => {
  try {
    const config = await configFn.getConfig();

    // Middlewares
    app.use(express.json());
    app.use(cors(config.corsOptions));

    // Nodemailer Configuration
    const transporter = nodemailer.createTransport(config.email.credentials);
    transporter.verify(function (error, success) {
      if (error) {
        console.log("Mail server not ready to receive messages");
        console.log(error);
      } else {
        console.log("Mail server is ready to take messages");
      }
    });
    app.locals.transporter = transporter;

    // Routes
    registerRoutes(app, config);

    app.get("/*", (_, res) => {
      const msg = "API route not defined";
      res.send({ msg: msg });
    });

    // Catch-all
    app.listen(config.port, () => {
      console.log(`Listening on port ${config.port}`);
    });
  } catch (err) {
    console.error("Error initializing server.\n", err);
  }
};

initialize();

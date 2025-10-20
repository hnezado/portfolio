const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const configFn = require("./config/default");
const { registerRoutes } = require("./routes");
// const https = require("https");
// const fsPromises = require("fs/promises");
// const nodemailer = require("nodemailer");

const app = express();

const initialize = async () => {
  try {
    const config = await configFn.getConfig();

    // Middlewares
    app.use(express.json());
    app.use(cors(config.corsOptions));

    // Nodemailer Configuration
    // const transporter = nodemailer.createTransport(config.email.credentials);
    // transporter.verify(function (error, _) {
    //   if (error) {
    //     console.log("Server is not ready to receive messages");
    //     console.log(error);
    //   } else {
    //     console.log("Server is ready to take our messages");
    //   }
    // });

    // HTTPS Server Configuration
    // const httpsOptions = {
    //   key: fs.readFileSync(config.httpsServer.privateKey),
    //   cert: fs.readFileSync(config.httpsServer.certificate),
    // };

    // const server = https.createServer(httpsOptions, app);

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

const express = require("express");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();
const configFn = require("./config_api");
// const configFn = require("./config_api_dev");
const AWS = require("aws-sdk");

let config;

// AWS Configuration
AWS.config.update({ region: "eu-west-3" });
const s3 = new AWS.S3();

const app = express();
let server;

// nodemailer
let transporter;

app.use(express.json());
app.use(express.static("client"));

app.use(
  cors({
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.get("/skills", (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, "data", "skills.json"));
    const skills = JSON.parse(data);
    res.json(skills);
  } catch (err) {
    const msg = "Error reading file";
    console.error(msg, err);
    res.status(500).send({ msg: msg, err: err });
  }
});

app.get("/projects", (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, "data", "projects.json"));
    const projects = JSON.parse(data);
    res.json(projects);
  } catch (err) {
    const msg = "Error reading projects file";
    console.error(msg, err);
    res.status(500).send({ msg: msg, err: err });
  }
});

app.post("/download-url", async (req, res) => {
  try {
    const { fileName } = req.body;
    console.log("bucketName:", config.bucketName);
    const params = {
      Bucket: config.bucketName,
      Key: fileName,
      Expires: 3600,
    };
    const url = s3.getSignedUrl("getObject", params);
    console.log("type of data of url:", typeof url);
    console.log("url:", url);
    res.json({ downloadUrl: url });
  } catch (err) {
    const msg = "Error generating download URL";
    console.error(msg, err);
    res.status(500).send({ msg: msg, err: err });
  }
});

app.post("/send-email", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const emailData = {
      from: config.email.sender,
      to: config.email.recipients,
      subject: `New message from ${name} (${email}) - ${subject}`,
      text: message,
    };
    await transporter.sendMail(emailData);
    res.status(200).send("Email sent successfully");
  } catch (err) {
    const msg = "Error sending email";
    console.error(msg, err);

    if (err.response) {
      console.error("SMTP Error Response:", err.response.toString());
    }
    res.status(500).send({ msg: msg, err: err });
  }
});

app.get("*", (req, res) => {
  const msg = "Path not defined";
  res.send({ msg: msg });
});

const initialize = async () => {
  try {
    config = await configFn.getConfig();
    config.email.recipients = config.email.recipients.split(",");
    app.use(cors(config.cors));

    // Nodemailer Configuration
    transporter = nodemailer.createTransport(config.email.credentials);
    transporter.verify(function (error, success) {
      if (error) {
        console.log("Server is not ready to receive messages");
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    // HTTPS Server Configuration
    const httpsOptions = {
      key: fs.readFileSync(config.httpsServer.privateKey),
      cert: fs.readFileSync(config.httpsServer.certificate),
    };

    server = https.createServer(httpsOptions, app);

    server.listen(config.port, () => {
      console.log(`Listening on port ${config.port}`);
    });
  } catch (err) {
    console.error("Error initializing server.\n", err);
  }
};

initialize();

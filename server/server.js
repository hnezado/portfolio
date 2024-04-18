const express = require("express");
// const aws = require("aws-sdk");
// const https = require("https");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
// const nodemailer = require("nodemailer");
require("dotenv").config();
const config = require("./config.js");

async function initialize() {
  const configEnd = await config;
  console.log("*** Config file content ***\n", config);
  console.log("emailCredentials:", config.emailCredentials);
  console.log("httpsServer:", config.httpsServer);
}

initialize();

// console.log("*** Config file content ***\n", config);

const app = express();

// HTTPS Server Configuration
// const httpsOptions = {
//   key: fs.readFileSync(config.httpsServer.privateKey),
//   cert: fs.readFileSync(config.httpsServer.certificate),
// };

app.use(express.json());
app.use(express.static("client"));
app.use(cors(config.cors));

// nodemailer configuration
// const transporter = nodemailer.createTransport(config.emailCredentials);
// transporter.verify(function (error, success) {
//   if (error) {
//     console.log("Server is not ready to receive messages");
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

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

// app.post("/send-email", async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body;
//     const emailData = {
//       from: process.env.PORTFOLIO_EMAIL_FROM,
//       to: process.env.PORTFOLIO_EMAIL_TO,
//       subject: `New message from ${name} (${email}) - ${subject}`,
//       text: message,
//     };
//     await transporter.sendMail(emailData);
//     res.status(200).send("Email sent successfully");
//   } catch (err) {
//     const msg = "Error sending email";
//     console.error(msg, err);

//     if (err.response) {
//       console.error("SMTP Error Response:", err.response.toString());
//     }
//     res.status(500).send({ msg: msg, err: err });
//   }
// });

app.get("*", (req, res) => {
  const msg = "Path not defined";
  res.send({ msg: msg });
});

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});

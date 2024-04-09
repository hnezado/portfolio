const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
// const nodemailer = require("nodemailer");
require("dotenv").config();
const config = require("./config.js");

const app = express();
const port = 3000;

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
    const msg = "Error reading file";
    console.error(msg, err);
    res.status(500).send({ msg: msg, err: err });
  }
});

app.post("/send-email", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
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
  res.send("Path not defined");
  //   res.sendFile("client/dist/index.html", { root: __dirname });
});

app.listen(port, "127.0.0.1", () => {
  console.log(`Listening on ${port}`);
});

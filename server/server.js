const express = require("express");
const https = require("https");
const fs = require("fs");
const fsPromises = require("fs/promises");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");
require('dotenv').config({ path: path.join(__dirname, '.env') });
const configFn = require("./config/default");

let config;

const app = express();
let server;

// nodemailer
let transporter;

app.use(express.json());
app.use(express.static("data"));

app.use(
  cors({
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.get("/profile-picture", (_, res) => {
  try {
    res.sendFile(path.join(__dirname, "data", "profile_picture.webp"));
  } catch (err) {
    const msg = "Error reading cv pdf";
    console.error(msg, err);
    res.status(500).send({ msg: msg, err: err });
  }
});

app.get("/cv", (_, res) => {
  try {
    res.sendFile(path.join(__dirname, "data", "cv_hector_martinez.pdf"));
  } catch (err) {
    const msg = "Error reading cv pdf";
    console.error(msg, err);
    res.status(500).send({ msg: msg, err: err });
  }
});

app.get("/skills", (_, res) => {
  try {
    res.sendFile(path.join(__dirname, "data", "skills.json"));
  } catch (err) {
    const msg = "Error reading file";
    console.error(msg, err);
    res.status(500).send({ msg: msg, err: err });
  }
});

app.get("/logo/:_name", (req, res) => {
  try {
    const logoName = req.params._name;
    const logoPath = path.join(
      __dirname,
      "data",
      "images",
      "logos",
      `${logoName}.svg`
    );
    res.sendFile(logoPath);
  } catch (err) {
    const msg = `Error reading logo`;
    console.error(msg, err);
    res.status(500).send({ msg, err });
  }
});

app.get("/projects", (_, res) => {
  try {
    const projectsFilePath = path.join(__dirname, "data", "projects.json");
    let projects = JSON.parse(fs.readFileSync(projectsFilePath));

    projects.forEach((project) => {
      const projectImagesPath = path.join(
        __dirname,
        "data",
        "images",
        "projects",
        project.name
      );

      if (fs.existsSync(projectImagesPath)) {
        project.numImages = fs
          .readdirSync(projectImagesPath)
          .filter((file) => file.endsWith(".gif")).length;
      } else {
        project.numImages = 0;
      }

      if (project.app && project.app.type === 'download') {
        const filePath = path.join(config.downloadsFolder, `${project.name}.zip`);
        if (fs.existsSync(filePath)) {
          project.app.fileRoute = `/downloads/${project.name}.zip`;
        }
      }
    });

    res.json(projects);
  } catch (err) {
    const msg = "Error reading projects file";
    console.error(msg, err);
    res.status(500).send({ msg: msg, err: err });
  }
});

app.get("/proj-icon/:_proj", (req, res) => {
  try {
    const proj = req.params._proj;
    if (!proj) {
      const msg = `Missing project parameter`;
      return res.status(400).send({ msg });
    }
    const iconPath = path.join(
      __dirname,
      "data",
      "images",
      "projects",
      proj,
      "icon.png"
    );
    if (fs.existsSync(iconPath)) {
      res.sendFile(iconPath);
    } else {
      res.status(404).send({ msg: "Icon not found" });
    }
  } catch (err) {
    const msg = "Error reading project icon";
    console.error(msg, err);
    res.status(500).send({ msg: msg, err: err });
  }
});

app.get("/proj-img", (req, res) => {
  try {
    const proj = req.query.proj;
    const img = req.query.img;
    if (!proj || !img) {
      const msg = `Missing project or image parameter in query`;
      return res.status(400).send({ msg });
    }
    res.sendFile(path.join(__dirname, "data", "images", "projects", proj, img));
  } catch (err) {
    const msg = "Error reading project image";
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

const initialize = async () => {
  try {
    config = await configFn.getConfig();
    app.use(cors(config.corsOptions));

    // Nodemailer Configuration
    // transporter = nodemailer.createTransport(config.email.credentials);
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

    // server = https.createServer(httpsOptions, app);

    app.use('/downloads', express.static(config.downloadsFolder));

    app.listen(config.port, () => {
      console.log(`Listening on port ${config.port}`);
    });

    app.get("/*", (_, res) => {
      const msg = "API route not defined";
      res.send({ msg: msg });
    });
  } catch (err) {
    console.error("Error initializing server.\n", err);
  }
};

initialize();

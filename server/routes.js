const express = require("express");
const path = require("path");
const fs = require("fs");

function registerRoutes(app, config) {
  // Static routes
  app.use(
    "/downloads",
    express.static(config.downloadsFolder, {
      dotfiles: "deny", // Do not serve hidden files (starting with '.')
      index: false, // Do not show dir list
      maxAge: "7d", // Cache for 7 days (improves performance)
      etag: true, // Allow conditional cache (If-None-Match)
      immutable: true, // Content doesn't change
    })
  );

  app.use(
    "/static",
    express.static(path.join(__dirname, "public"), {
      maxAge: 0, // disables browser caching (0ms data cached)
      etag: false, // disables ETag headers (files aren't cached based on hash)
    })
  );

  // API routes
  app.get("/cv", (req, res) => {
    const filePath = path.join(__dirname, "public", "cv_hector_martinez.pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="cv_hector_martinez.pdf"'
    );
    res.setHeader("Content-Type", "application/pdf");
    res.download(filePath);
  });

  app.get("/projects", (_, res) => {
    try {
      const projectsFilePath = path.join(__dirname, "public", "projects.json");
      let projects = JSON.parse(fs.readFileSync(projectsFilePath));

      projects.forEach((project) => {
        const projectImagesPath = path.join(
          __dirname,
          "public",
          "images",
          "projects",
          project.name
        );

        // Icon
        project.iconUrl = `${config.publicUrl}/static/images/projects/${project.name}/icon.png`;

        // Images
        project.imgsPaths = [];
        if (fs.existsSync(projectImagesPath)) {
          const files = fs
            .readdirSync(projectImagesPath)
            .filter((f) => f.match(/^img_\d+\.gif$/));
          files.sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)[0], 10);
            const numB = parseInt(b.match(/\d+/)[0], 10);
            return numA - numB;
          });
          project.imgsPaths = files.map(
            (file) =>
              `${config.publicUrl}/static/images/projects/${project.name}/${file}`
          );
        }

        // Download zip file route
        if (
          project.app &&
          project.app.type &&
          project.app.type === "download"
        ) {
          const filePath = path.join(
            config.downloadsFolder,
            `${project.name}.zip`
          );
          if (fs.existsSync(filePath)) {
            project.app.fileRoute = `/downloads/${project.name}.zip`;
          }
        }
      });

      res.json(projects);
    } catch (err) {
      console.error("Error reading projects file", err);
      res.status(500).send({ msg: "Error reading projects file", err });
    }
  });

  app.post("/send-email", async (req, res) => {
    const transporter = req.app.locals.transporter;

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
}
module.exports = { registerRoutes };

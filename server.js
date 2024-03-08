const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static("client/dist"));

app.get("/", (req, res) => {
  res.send("Hello world!");
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

app.get("/cv", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "data", "cv_hector_martinez.pdf"));
  } catch (err) {
    const msg = "Error sending file";
    console.error(msg, err);
    res.status(500).send({ msg: msg, err: err });
  }
});

app.get("*", (req, res) => {
  res.send("Path not defined");
  //   res.sendFile("client/dist/index.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});

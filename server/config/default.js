// Future development.js & production.js will import this file
// and they will include specific environment configuration

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const getConfig = async () => {
  return {
    port: process.env.PORT,
    downloadsFolder: process.env.DOWNLOADS_FOLDER,
    corsOptions: {
      origin: "*",
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
    },
    email: {
      credentials: {
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        logger: true,
      },
      sender: process.env.EMAIL_SENDER,
      recipients: process.env.EMAIL_RECIPIENTS.split(","),
    },
    // httpsServer: {
    //   certificate: "./localhost.pem",
    //   privateKey: "./localhost-key.pem",
    // }
  };
};

module.exports = { getConfig };

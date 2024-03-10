module.exports = {
  cors: {
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  },
  port: 8084,
  emailCredentials: {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.APP_PASS,
    },
    logger: true,
  },
};

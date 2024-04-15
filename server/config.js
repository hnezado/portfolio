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
      user: process.env.PORTFOLIO_EMAIL_FROM,
      pass: process.env.PORTFOLIO_EMAIL_APP_PASS,
    },
    logger: true,
  },
  httpsServer: {
    certificate: process.env.PORTFOLIO_CERTIFICATE_PATH,
    privateKey: process.env.PORTFOLIO_PRIVATE_KEY,
  },
};

const AWS = require("aws-sdk");

// AWS Configuration
AWS.config.update({ region: "eu-west-3" });
const ssm = new AWS.SSM();

const getParam = function (param) {
  const result = ssm.getParameter(
    { Name: param, WithDecryption: false },
    (err, data) => {
      try {
        const parameterValue = data.Parameter.Value;
        // console.log("Getting parameter value. ParameterValue:", parameterValue);
        return parameterValue;
      } catch (err) {
        console.error("Error obtaining parameter value", err);
      }
    }
  );
  console.log("getParam() result is:", result);
  return result;
};

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
      user: getParam("PORTFOLIO_EMAIL_FROM"),
      pass: getParam("PORTFOLIO_EMAIL_APP_PASS"),
    },
    logger: true,
  },
  httpsServer: {
    certificate: getParam("PORTFOLIO_CERTIFICATE_PATH"),
    privateKey: getParam("PORTFOLIO_PRIVATE_KEY"),
  },
};

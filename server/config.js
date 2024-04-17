const AWS = require("aws-sdk");

// AWS Configuration
AWS.config.update({ region: "eu-west-3" });
const ssm = new AWS.SSM();

async function getParam(param) {
  const result = await ssm.getParameter(
    { Name: param, WithDecryption: false },
    (err, data) => {
      try {
        const parameterValue = data.Parameter.Value;
        console.log("Getting parameter value. ParameterValue:", parameterValue);
        return parameterValue;
      } catch (err) {
        console.error("Error obtaining parameter value", err);
      }
    }
  );
  return result;
}

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
      user: await getParam("PORTFOLIO_EMAIL_FROM"),
      pass: await getParam("PORTFOLIO_EMAIL_APP_PASS"),
    },
    logger: true,
  },
  httpsServer: {
    certificate: await getParam("PORTFOLIO_CERTIFICATE_PATH"),
    privateKey: await getParam("PORTFOLIO_PRIVATE_KEY"),
  },
};

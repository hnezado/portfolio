const AWS = require("aws-sdk");

// AWS Configuration
AWS.config.update({ region: "eu-west-3" });
const ssm = new AWS.SSM();

const getParam = async (param) => {
  try {
    const data = await ssm
      .getParameter({ Name: param, WithDecryption: false })
      .promise();
    const parameterValue = data.Parameter.Value;
    return parameterValue;
  } catch (err) {
    console.error("Error obtaining parameter value", err);
    throw err;
  }
};

const getConfig = async () => {
  const email = {
    credentials: {
      service: "gmail",
      auth: {
        user: null,
        pass: null,
      },
      logger: true,
    },
    sender: null,
    recipients: null,
  };
  email.credentials.auth.user = await getParam("PORTFOLIO_EMAIL_FROM");
  email.credentials.auth.pass = await getParam("PORTFOLIO_EMAIL_APP_PASS");
  email.sender = await getParam("PORTFOLIO_EMAIL_FROM");
  email.recipients = await getParam("PORTFOLIO_EMAIL_TO");

  const httpsServer = {
    certificate: "C:/Users/Jekthor/Documents/https/hnezado.com/fullchain1.pem",
    privateKey: "C:/Users/Jekthor/Documents/https/hnezado.com/privkey1.pem",
  };

  const bucketName = await getParam("PORTFOLIO_APPS_BUCKET_NAME");

  return {
    port: 3100,
    cors: {
      origin: "*",
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
    },
    email,
    httpsServer,
    bucketName,
  };
};

module.exports = { getConfig };

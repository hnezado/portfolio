const AWS = require("aws-sdk");

// AWS Configuration
AWS.config.update({ region: "eu-west-3" });
const ssm = new AWS.SSM();

async function getParam(param) {
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
}

async function getConfig() {
  const email = {
    credentials: {
      service: "gmail",
      auth: {
        user: await getParam("PORTFOLIO_EMAIL_FROM"),
        pass: await getParam("PORTFOLIO_EMAIL_APP_PASS"),
      },
      logger: true,
    },
    sender: await getParam("PORTFOLIO_EMAIL_FROM"),
    recipients: await getParam("PORTFOLIO_EMAIL_TO"),
  };

  const httpsServer = {
    certificate: "C:/Users/Jekthor/Documents/https/hnezado.com/fullchain1.pem",
    privateKey: "C:/Users/Jekthor/Documents/https/hnezado.com/privkey1.pem",
  };

  return {
    cors: {
      origin: "*",
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
    },
    email,
    httpsServer,
    bucketName: await getParam("PORTFOLIO_APPS_BUCKET_NAME"),
  };
}

module.exports = getConfig();

const config = {
  serverUrl: process.env.NODE_ENV === "production"
    ? "https://hnezado.com:3100/api"
    : "http://192.168.1.50:3100/api",
};

export default config;
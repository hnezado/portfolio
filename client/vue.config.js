const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    allowedHosts: ["3.75.158.163", "3.125.183.140", "35.157.117.28"],
  },
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/main.css";`,
      },
    },
  },
});

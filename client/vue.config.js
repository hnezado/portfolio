const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    disableHostCheck: true,
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

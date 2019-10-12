// vue.config.js

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  // To run locally form the index.html, no server
  // Turn off server relative path.
  // publicPath and baseURL have the same functions
  // publicPath is used in vue CLI 3.3 and above, baseURL in older versions
  // baseURL is used in versions
  publicPath: "",
  //baseUrl: ''

  // Turn off multiple JS files
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()],
    // No need for splitting
    optimization: {
      splitChunks: false
    }
  },
  // Turn off multiple CSS files
  css: {
    extract: false
  },
  // Turn off additional .map files. this needs to be done in config\index.js
  productionSourceMap: false
};

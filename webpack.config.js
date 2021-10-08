const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      { test: /\.(jsx?)$/, use: "babel-loader" },
      { test: /\.(css)$/, use: ["style-loader", "css-loader"] },
    ],
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/index.html",
    }),
  ],
};

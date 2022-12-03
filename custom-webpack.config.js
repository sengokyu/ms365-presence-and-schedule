const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      // CLIENT_ID, TENANT_IDをソースに書きたくないので、
      // webpackの中から注入する
      CLIENT_ID: JSON.stringify(process.env["CLIENT_ID"]),
      TENANT_ID: JSON.stringify(process.env["TENANT_ID"]),
    }),
  ],
};

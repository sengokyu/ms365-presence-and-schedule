const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      // CLIENT_ID, TENANT_IDをソースに書きたくないので、
      // webpackの中から注入する
      CLIENT_ID: JSON.stringify(process.env["CLIENT_ID"]),
      TENANT_ID: JSON.stringify(process.env["TENANT_ID"]),
      STORAGE_API_URL: JSON.stringify(process.env["STORAGE_API_URL"]),
      FUNCTION_CODE: JSON.stringify(process.env["FUNCTION_CODE"]),
    }),
  ],
};

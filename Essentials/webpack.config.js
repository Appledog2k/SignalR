const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
  entry: "./client/index.ts",
  output: {
    path: path.resolve(__dirname, "wwwroot"),
    filename: "[name].[chunkhash].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // {
      //   test: /\.js$/,
      //   enforce: "pre",
      //   loader: "source-map-loader",
      //   exclude: [
      //     chặn việc tải source map của signalr
      //     path.resolve(__dirname, "node_modules/@microsoft/signalr"),
      //   ],
      // },
    ],
  },
  plugins: [
    new SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./client/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[chunkhash].css",
    }),
  ],
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "/src/index.tsx", // main js
  output: {
    path: path.resolve(__dirname, "build"), // output folder
    publicPath: "/",
    filename: "[name].[contenthash:5].js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: "assets/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "assets/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: "./",
    hot: true,
  },
};

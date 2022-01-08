const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const webpack = require('webpack')
module.exports = {
  mode: "development",
 
  output: {
    clean: true,
    filename: "[name].[contenthash].js"
  },
  target: "web",
  resolve: {
    fallback: {
      assert: false,
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      "BaseWorkerPool":false,
      "jest-worker":false,
      crypto: false,
      "crypto-browserify": false,
      util: false,
      buffer: false,
      vm: false,
      os: false,
      constants: false,
      child_process: false,
      worker_threads: false,
      inspector: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          minimize: true,
          sources: false,
        },
      },
      {
        test: /\.css$/,

        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets",
            },
          },
        ],
      },
    ],
  },
 
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new HtmlWebPackPlugin({
      filename: "./index.html",
      template: "./src/index.html"
      
    }),

    new HtmlWebPackPlugin({
      filename:"./events.html",
      template: "./src/events.html"
     
    }),

    new HtmlWebPackPlugin({
      filename:"./formViewver.html",
      template: "./src/formViewver.html"
     
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      ignoreOrder: true,
    }),

    new HtmlWebPackPlugin({
      filename:"./questionMaker.html",
      template: "./src/questionMaker.html"
     
    }),

    new CopyPlugin({
      patterns: [{ from: "src/assets/", to: "assets/" }],
    }),
  ],
};

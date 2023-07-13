/* eslint-disable id-length */
/* eslint-disable comma-dangle */
/* eslint-disable keyword-spacing */
/* eslint-disable brace-style */
/* eslint-disable indent */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const path = require("path");

module.exports = (env) => {
  env = env || {};
  return {
    name: "styles",
    mode: env.prod ? "production" : "development",
    entry: {
      base: "./resources/scss/main.scss",
    },
    module: {
      rules: [
        {
          test: /.\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: !env.prod,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: !env.prod,
                plugins: [require("autoprefixer")()],
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: !env.prod,
                outputStyle: env.prod ? "compressed" : "expanded",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        filename: "../../css/ceres-[name]" + (env.prod ? ".min" : "") + ".css",
      }),
    ],
    output: {
      path: path.resolve(__dirname, "../../resources/js/dist"),
    },
  };
};

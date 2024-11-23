module.exports = {
  entry: "./app/Communicator.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["communicatorUMD", "communicatorModularAMD", "communicatorModularCJS"],
  },
  output: {
    filename: "bundle.js",
  },
  devServer: {
    inline: false,
  },
};

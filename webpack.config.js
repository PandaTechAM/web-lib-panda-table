var path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: "/assets/",
  },
  module: {
    rules: [
        {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        }
    ],
  },
  externals: {
    react: "react"
  },
  stats: 'errors-only',
  resolve: {
    extensions: ['.ts', '.js', '.json', '.tsx']
}
};
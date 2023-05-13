const path = require('path');

module.exports = {
  entry: './src', // Replace './src/index.tsx' with your entry file
  output: {
    path: path.resolve(__dirname, 'dist/cjs'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
  },
};
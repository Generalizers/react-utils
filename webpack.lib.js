const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  entry: path.resolve('src', 'module.ts'),
  output: {
    path: path.resolve(__dirname, 'lib'),
    publicPath: '/',
    library: {
      name: 'react-utils',
      type: 'umd',
    },
    filename: 'module.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.lib.json',
            },
          },
        ],
      },
    ],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
});

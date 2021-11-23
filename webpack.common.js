const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const path = require('path');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    plugins: [
      new TsConfigPathsPlugin({
        configFile: path.resolve(__dirname, 'tsconfig.json'),
      }),
    ],
  },
};

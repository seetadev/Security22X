const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  return {
    ...config,
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_fnames: true,
            keep_classnames: true,
          },
        }),
      ],
    },
    stats: { warnings: false },
    ignoreWarnings: [/Failed to parse source map/],
    resolve: {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        fs: false,
        url: false,
        util: false,
        path: require.resolve('path-browserify'),
        stream: require.resolve('stream-browserify'),
        "crypto": require.resolve("crypto-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url"),
        buffer: require.resolve('buffer/'),
      },
    },
    plugins: [
      ...config.plugins,
      new webpack.ProvidePlugin({
        process: 'process/browser.js'
      }),
      new Dotenv(),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env)
      }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ]
  };
};
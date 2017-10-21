import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

import webpackConfig from './webpack.config.babel';

const compiler = webpack(webpackConfig);

export default () =>
  webpackDevMiddleware(compiler, {
    publicPath: '/assets/',
    noInfo: true,
    stats: { colors: true },
  });

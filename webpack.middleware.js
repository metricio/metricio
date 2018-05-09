import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

import webpackConfig from './webpack.config.babel';

const compiler = webpack(webpackConfig);

export default () => webpackDevMiddleware(compiler, {
  publicPath: '/dist/',
  noInfo: true,
  stats: 'errors-only',
});

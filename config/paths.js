import path from 'path';

const rootPath = process.platform === 'win32' ? process.cwd() : process.env.PWD;

const paths = {
  dashboards: path.join(rootPath, 'src/dashboards'),
  styles: path.join(rootPath, 'src/styles'),
  jobs: path.join(rootPath, 'src/jobs'),
  widgets: path.join(rootPath, 'src/widgets'),
  dist: path.join(rootPath, 'dist'),
  lib: path.join(rootPath, 'lib'),
};

export default paths;

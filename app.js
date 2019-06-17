
import bodyParser from 'body-parser';
import connectRedis from 'connect-redis';
import { createServer } from 'http';
import exphbs from 'express-handlebars';
import express from 'express';
import request from 'request-promise-native';
import session from 'express-session';
import socketIo from 'socket.io';
import logger from './lib/logger';
import config from './config';
import appMeta from './package.json';
import * as storage from './lib/storage';
import startJobs from './lib/jobs';
import webpackMiddleWare from './webpack.middleware';

['CIRCLE_CI_TOKEN', 'GITHUB_USER', 'GITHUB_TOKEN'].forEach(env => process.env[env] || logger('warn', `${env} environment variable is missing!`));

const env = process.env.NODE_ENV || 'development';
const RedisStore = connectRedis(session);
const app = express();
const server = createServer(app);
const io = socketIo(server, {});

const sessionMiddleware = session({
  store: new RedisStore({ client: storage.client }),
  secret: config.session.secret,
  key: appMeta.name,
  cookie: { secure: env !== 'development' },
  resave: true,
  logErrors: true,
  saveUninitialized: true,
});

app.use(sessionMiddleware);
app.use(bodyParser.json());

io.use((socket, next) => sessionMiddleware(socket.request, socket.request.res, next));

app.engine(
  'hbs',
  exphbs({
    defaultLayout: 'index',
    extname: '.hbs',
    layoutsDir: 'src/views/',
  })
);

app.set('view engine', 'hbs');
app.set('views', 'src/views');
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.render('index', {
    name: 'index',
  });
});

app.get('/:dashboard', (req, res) => {
  res.render('index', {
    name: req.params.dashboard,
    layout: false,
  });
});

app.post('/rebuild', (req, res) => {
  const url = `https://circleci.com/api/v1.1/project/github/${req.body.owner}/${req.body.reponame}/build`;

  request({
    body: {
      branch: req.body.branch,
    },
    method: 'POST',
    uri: url,
    qs: {
      'circle-token': process.env.CIRCLE_CI_TOKEN,
    },
    headers: {
      'User-Agent': 'Metricio - CircleCI',
    },
    json: true,
  })
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static('dist'));
} else {
  app.use(webpackMiddleWare());
}

server.listen(app.get('port'), () => {
  logger('info', `running on port: ${app.get('port')}`);
  startJobs(io);
});

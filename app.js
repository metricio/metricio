import { createServer } from 'http';
import express from 'express';
import exphbs from 'express-handlebars';
import session from 'express-session';
import connectRedis from 'connect-redis';
import socketIo from 'socket.io';

import webpackMiddleWare from './webpack.middleware';
import appMeta from './package.json';
import config from './config';
import logger from './lib/logger';
import * as storage from './lib/storage';
import startJobs from './lib/jobs';

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

io.use((socket, next) => sessionMiddleware(socket.request, socket.request.res, next));

app.engine(
  'hbs',
  exphbs({
    defaultLayout: 'index',
    extname: '.hbs',
    layoutsDir: 'src/views/',
  }),
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

if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static('dist'));
} else {
  app.use(webpackMiddleWare());
}

server.listen(app.get('port'), () => {
  logger('info', `running on port: ${app.get('port')}`);
  startJobs(io);
});

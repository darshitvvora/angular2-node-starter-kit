/**
 * Express configuration
 */


const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const path = require('path');
const lusca = require('lusca');
const cors = require('cors');
const config = require('./environment');
const session = require('express-session');
const sqldb = require('../conn/sqldb');
const oauthComponent = require('./../components/oauth/express');

const Store = require('connect-session-sequelize')(session.Store);

module.exports = function (app) {
  const env = app.get('env');

  if (env === 'development' || env === 'test') {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(morgan('dev'));
  }

  if (env === 'production') {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
  }

  // - only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use\, custom Nginx setup)
  app.enable('trust proxy');

  app.set('appPath', path.join(config.root, 'client'));
  app.use(express.static(app.get('appPath')));


  app.set('views', `${config.root}/server/views`);
  app.set('view engine', 'pug');
  app.use(cors());
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(methodOverride());
  app.use(cookieParser());


  // Persist sessions with MongoStore / sequelizeStore
  // We need to enable sessions for passport-twitter because it's an
  // oauth 1.0 strategy, and Lusca depends on sessions
  app.use(session({
    secret: 'laksdfkjlsd', //config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new Store({ db: sqldb.sequelize }),
  }));

  /**
   * Lusca - express src security
   * https://github.com/krakenjs/lusca
   */
  // if (env !== 'test' && !process.env.SAUCE_USERNAME) {
    app.use(lusca({
      csrf: {
        angular: true,
      },
      xframe: 'SAMEORIGIN',
      hsts: {
        maxAge: 31536000, // 1 year, in seconds
        includeSubDomains: true,
        preload: true,
      },
      xssProtection: true,
    }));
  // }

  if (env === 'development' || env === 'test') {
    app.use(errorHandler()); // Error handler - has to be last
  }

  oauthComponent(app);
};

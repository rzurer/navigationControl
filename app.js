'use strict';
var local, browserify, express, routes, config, app, application;
local = false;
browserify = require('browserify-middleware');
express = require('express');
routes = require('./modules/routes').routes();
config = require('./config');
app = express();
config.configure(app, express, browserify);
routes.initialize(app);
application = app.listen(3333);
if (local) {
    console.log('Express service listening on port %d, environment: %s', application.address().port, app.settings.env);
}
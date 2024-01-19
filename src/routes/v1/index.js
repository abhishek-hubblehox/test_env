const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const SchoolRoute = require('./school.route');
const newSurveyRoute = require('./add.new.survey.route');
const divisionRoute = require('./division.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/school',
    route: SchoolRoute,
  },
  {
    path: '/newsurvey',
    route: newSurveyRoute,
  },
  {
    path: '/division',
    route: divisionRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

const env = window.location.hostname === 'localhost' ? 'local' : 'depot';

const constants = {
  API_URI: '/Portal',
  TRIPS_API: '/pos/trips',
  ON_POINTS_API: '/pos/onPoints',
  OFF_POINTS_API: '/pos/offPoints',
};

if (env === 'local') {
  constants.API_URI = 'http://localhost:3030';
}

module.exports = constants;

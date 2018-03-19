const env = window.location.hostname === 'localhost' ? 'local' : 'depot';

const constants = {
  API_URI: '/Portal',
  TRIPS_API: '/pos/trips',
  EVENTS_API: '/pos/events',
};

if (env === 'local') {
  constants.API_URI = 'http://localhost:3030';
}

module.exports = constants;

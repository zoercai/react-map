const env = window.location.hostname === 'localhost' ? 'local' : 'depot';

const constants = {
  BLUE: 'rgb(48, 63, 159)',
  PINK: 'rgb(255, 64, 129)',
  ROUTER: {
    HOME: '/',
    REACT_COMMON: '/react-common',
    ANT: '/ant',
  },
  // APIs
  API_URI: '/Portal',
  PING_ENDPOINT: '/ping',
};

if (env === 'local') {
  constants.API_URI = 'http://localhost:3030';
}

module.exports = constants;

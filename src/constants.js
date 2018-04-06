const env = window.location.hostname === 'localhost' ? 'local' : 'depot';

const constants = {
  API_URI: '/Portal',
  SENSOR_FILTERS_API: '/pos/sensorFilters',
  VEHICLE_FILTERS_API: '/pos/vehicleFilters',
};

if (env === 'local') {
  constants.API_URI = 'http://localhost:3030';
}

module.exports = constants;

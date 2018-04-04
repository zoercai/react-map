// Route methods
const express = require('express');
const database = require('./controllers/database');

const route = express.Router();

route.get('/pos/trips', database.getTrips);
route.get('/pos/sensorFilters', database.getSensorFilters);
route.get('/pos/vehicleFilters', database.getVehicleFilters);
route.get('/pos/onPoints', database.getOnPoints);
route.get('/pos/offPoints', database.getOffPoints);

module.exports = route;

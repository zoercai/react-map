// Route methods
const express = require('express');
const database = require('./controllers/database');

const route = express.Router();

route.get('/pos/sensorFilters', database.getSensorFilters);
route.get('/pos/vehicleFilters', database.getVehicleFilters);

module.exports = route;

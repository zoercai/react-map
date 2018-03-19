// Route methods
const express = require('express');
const database = require('./controllers/database');

const route = express.Router();

route.get('/pos/trips', database.getTrips);
route.get('/pos/events', database.getEvents);

module.exports = route;

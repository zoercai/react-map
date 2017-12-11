// Route methods
const express = require('express');
const database = require('./controllers/database');

const route = express.Router();

route.get('/ping', database.ping);
route.post('/ping/:field', database.updatePing);

module.exports = route;

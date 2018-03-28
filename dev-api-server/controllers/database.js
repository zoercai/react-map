const trips = require('./eroadTrips.json');
const onPoints = require('./eroadOnPoints.json');
const offPoints = require('./eroadOffPoints.json');

exports.getTrips = ((req, res) => {
  setTimeout(() => { res.send(trips); }, 500);
});

exports.getOnPoints = ((req, res) => {
  setTimeout(() => { res.send(onPoints); }, 500);
});

exports.getOffPoints = ((req, res) => {
  setTimeout(() => { res.send(offPoints); }, 500);
});

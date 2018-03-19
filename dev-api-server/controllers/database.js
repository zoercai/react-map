const trips = require('./lines.json');
const events = require('./points.json');

exports.getTrips = ((req, res) => {
  setTimeout(() => { res.send(trips); }, 500);
});

exports.getEvents = ((req, res) => {
  setTimeout(() => { res.send(events); }, 500);
});

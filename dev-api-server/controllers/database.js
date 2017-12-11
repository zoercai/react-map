const data = require('./data.json');

const TIMEOUT_DURATION = 500;

exports.ping = ((req, res) => {
  setTimeout(() => {
    res.send(data.ping);
  }, TIMEOUT_DURATION);
});

exports.updatePing = ((req, res) => {
  setTimeout(() => {
    const field = req.params.field;
    data.ping[field] = req.body;
    res.send(data.ping);
  }, TIMEOUT_DURATION);
});

'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactHotLoader = require('react-hot-loader');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(
  _reactHotLoader.AppContainer,
  null,
  _react2.default.createElement(_app2.default, null)
), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./app', function () {
    var NextApp = require('./app').default; // eslint-disable-line global-require
    (0, _reactDom.render)(_react2.default.createElement(
      _reactHotLoader.AppContainer,
      null,
      _react2.default.createElement(NextApp, null)
    ), document.getElementById('root'));
  });
}
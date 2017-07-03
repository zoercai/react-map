'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _app_bar = require('react-toolbox/lib/app_bar');

var _app_bar2 = _interopRequireDefault(_app_bar);

var _navigation = require('react-toolbox/lib/navigation');

var _navigation2 = _interopRequireDefault(_navigation);

var _Counter = require('./Counter');

var _Counter2 = _interopRequireDefault(_Counter);

var _CounterSave = require('./CounterSave');

var _CounterSave2 = _interopRequireDefault(_CounterSave);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CounterContainer = function (_Component) {
  _inherits(CounterContainer, _Component);

  function CounterContainer() {
    _classCallCheck(this, CounterContainer);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  CounterContainer.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _app_bar2.default,
        { title: 'Counter App' },
        _react2.default.createElement(
          _navigation2.default,
          { type: 'horizontal' },
          _react2.default.createElement(_CounterSave2.default, null)
        )
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default.container },
        _react2.default.createElement(_Counter2.default, null)
      )
    );
  };

  return CounterContainer;
}(_react.Component);

exports.default = CounterContainer;
module.exports = exports['default'];
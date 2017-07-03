'use strict';

exports.__esModule = true;

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _card = require('react-toolbox/lib/card');

var _button = require('react-toolbox/lib/button');

var _store = require('../../store');

var _store2 = _interopRequireDefault(_store);

var _CounterDisplay = require('./CounterDisplay');

var _CounterDisplay2 = _interopRequireDefault(_CounterDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Counter = (0, _mobxReact.observer)(_class = function (_Component) {
  _inherits(Counter, _Component);

  function Counter() {
    _classCallCheck(this, Counter);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Counter.prototype.increment = function increment() {
    _store2.default.increment(1);
  };

  Counter.prototype.decrement = function decrement() {
    _store2.default.decrement(1);
  };

  Counter.prototype.render = function render() {
    return _react2.default.createElement(
      _card.Card,
      { style: { width: '350px', marginTop: '2em' } },
      _react2.default.createElement(_card.CardTitle, { title: 'Counter' }),
      _react2.default.createElement(
        _card.CardText,
        null,
        _react2.default.createElement(_CounterDisplay2.default, { count: _store2.default.count }),
        _react2.default.createElement(
          'div',
          { id: 'increments' },
          'increments: ',
          _store2.default.increments
        ),
        _react2.default.createElement(
          'div',
          { id: 'decrements' },
          'decrements: ',
          _store2.default.decrements
        )
      ),
      _react2.default.createElement(
        _card.CardActions,
        null,
        _react2.default.createElement(_button.IconButton, { id: 'increment', icon: 'add', onClick: this.increment }),
        _react2.default.createElement(_button.IconButton, { id: 'decrement', icon: 'remove', onClick: this.decrement })
      )
    );
  };

  return Counter;
}(_react.Component)) || _class;

exports.default = Counter;
module.exports = exports['default'];
'use strict';

exports.__esModule = true;

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _button = require('react-toolbox/lib/button');

var _store = require('../../store');

var _store2 = _interopRequireDefault(_store);

var _api = require('../../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CounterSave = (0, _mobxReact.observer)(_class = function (_Component) {
  _inherits(CounterSave, _Component);

  function CounterSave() {
    _classCallCheck(this, CounterSave);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  CounterSave.prototype.save = function save() {
    _api2.default.saveFile(_store2.default.saveFile);
  };

  CounterSave.prototype.load = function load() {
    return _api2.default.getSaveFile().then(function (saveFile) {
      _store2.default.loadSaveFile(saveFile);
    });
  };

  CounterSave.prototype.render = function render() {
    var buttonStyle = {
      color: 'white',
      fontWeight: '700'
    };
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_button.Button, { id: 'save', onClick: this.save, label: 'Save', style: buttonStyle }),
      _react2.default.createElement(_button.Button, { id: 'load', onClick: this.load, label: 'Load', style: buttonStyle })
    );
  };

  return CounterSave;
}(_react.Component)) || _class;

exports.default = CounterSave;
module.exports = exports['default'];
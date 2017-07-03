'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('react-toolbox/lib/button');

var _reactCommon = require('react-common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExampleForm = (_temp = _class = function (_Form) {
  _inherits(ExampleForm, _Form);

  function ExampleForm() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ExampleForm);

    return _possibleConstructorReturn(this, _Form.call(this, data));
  }

  // Fields that will be included in this form


  return ExampleForm;
}(_reactCommon.Form), _class.fields = [[_reactCommon.BooleanField, { name: 'BooleanField', label: 'BooleanField in SubField', required: false }], [_reactCommon.CharField, { name: 'CharField', label: 'CharField in SubField', required: false }], [_reactCommon.ChoiceField, {
  name: 'ChoiceField',
  label: 'ChoiceField in SubField',
  options: ['Option 1', 'Option 2', 'Option 3'],
  required: false
}]], _temp);

var CommonExample = function (_React$Component) {
  _inherits(CommonExample, _React$Component);

  function CommonExample() {
    _classCallCheck(this, CommonExample);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  CommonExample.prototype.render = function render() {
    var form = new ExampleForm();
    return _react2.default.createElement(
      'div',
      { style: { background: '#eeeeee' } },
      _react2.default.createElement(_button.Button, { icon: 'download', label: 'Download', accent: true }),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'form',
          { id: 'form' },
          _react2.default.createElement(
            'section',
            null,
            _react2.default.createElement(
              'div',
              null,
              form.fields.BooleanField.render()
            ),
            _react2.default.createElement(
              'div',
              null,
              form.fields.ChoiceField.render()
            ),
            _react2.default.createElement(
              'div',
              null,
              form.fields.CharField.render()
            )
          )
        )
      )
    );
  };

  return CommonExample;
}(_react2.default.Component);

exports.default = CommonExample;
module.exports = exports['default'];
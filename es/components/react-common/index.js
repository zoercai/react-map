var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import { Form, BooleanField, CharField, ChoiceField } from 'react-common';

var ExampleForm = (_temp = _class = function (_Form) {
  _inherits(ExampleForm, _Form);

  function ExampleForm() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ExampleForm);

    return _possibleConstructorReturn(this, _Form.call(this, data));
  }

  // Fields that will be included in this form


  return ExampleForm;
}(Form), _class.fields = [[BooleanField, { name: 'BooleanField', label: 'BooleanField in SubField', required: false }], [CharField, { name: 'CharField', label: 'CharField in SubField', required: false }], [ChoiceField, {
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
    return React.createElement(
      'div',
      { style: { background: '#eeeeee' } },
      React.createElement(Button, { icon: 'download', label: 'Download', accent: true }),
      React.createElement(
        'div',
        null,
        React.createElement(
          'form',
          { id: 'form' },
          React.createElement(
            'section',
            null,
            React.createElement(
              'div',
              null,
              form.fields.BooleanField.render()
            ),
            React.createElement(
              'div',
              null,
              form.fields.ChoiceField.render()
            ),
            React.createElement(
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
}(React.Component);

export { CommonExample as default };
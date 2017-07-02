var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { PINK, BLUE } from '../../constants';

var CounterDisplay = (_temp2 = _class = function (_Component) {
  _inherits(CounterDisplay, _Component);

  function CounterDisplay() {
    var _temp, _this, _ret;

    _classCallCheck(this, CounterDisplay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      active: false
    }, _this.toggleActive = function () {
      _this.setState(function (state) {
        return {
          active: !state.active
        };
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  CounterDisplay.prototype.style = function style() {
    var color = PINK;
    if (this.state.active) {
      color = BLUE;
    }
    return {
      color: color,
      textAlign: 'center',
      fontWeight: '700',
      fontSize: '3em',
      userSelect: 'none',
      cursor: 'default'
    };
  };

  CounterDisplay.prototype.render = function render() {
    return React.createElement(
      'div',
      { style: this.style(), onClick: this.toggleActive },
      React.createElement(
        'span',
        { id: 'count' },
        this.props.count
      )
    );
  };

  return CounterDisplay;
}(Component), _class.defaultProps = {
  count: 0
}, _temp2);
process.env.NODE_ENV !== "production" ? CounterDisplay.propTypes = {
  count: React.PropTypes.number
} : void 0;


export default CounterDisplay;
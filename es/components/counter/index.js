function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Counter from './Counter';
import CounterSave from './CounterSave';
import styles from './styles.scss';

var CounterContainer = function (_Component) {
  _inherits(CounterContainer, _Component);

  function CounterContainer() {
    _classCallCheck(this, CounterContainer);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  CounterContainer.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        AppBar,
        { title: 'Counter App' },
        React.createElement(
          Navigation,
          { type: 'horizontal' },
          React.createElement(CounterSave, null)
        )
      ),
      React.createElement(
        'div',
        { className: styles.container },
        React.createElement(Counter, null)
      )
    );
  };

  return CounterContainer;
}(Component);

export default CounterContainer;
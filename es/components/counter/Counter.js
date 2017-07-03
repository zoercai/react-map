var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { IconButton } from 'react-toolbox/lib/button';
import Store from '../../store';
import CounterDisplay from './CounterDisplay';

var Counter = observer(_class = function (_Component) {
  _inherits(Counter, _Component);

  function Counter() {
    _classCallCheck(this, Counter);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Counter.prototype.increment = function increment() {
    Store.increment(1);
  };

  Counter.prototype.decrement = function decrement() {
    Store.decrement(1);
  };

  Counter.prototype.render = function render() {
    return React.createElement(
      Card,
      { style: { width: '350px', marginTop: '2em' } },
      React.createElement(CardTitle, { title: 'Counter' }),
      React.createElement(
        CardText,
        null,
        React.createElement(CounterDisplay, { count: Store.count }),
        React.createElement(
          'div',
          { id: 'increments' },
          'increments: ',
          Store.increments
        ),
        React.createElement(
          'div',
          { id: 'decrements' },
          'decrements: ',
          Store.decrements
        )
      ),
      React.createElement(
        CardActions,
        null,
        React.createElement(IconButton, { id: 'increment', icon: 'add', onClick: this.increment }),
        React.createElement(IconButton, { id: 'decrement', icon: 'remove', onClick: this.decrement })
      )
    );
  };

  return Counter;
}(Component)) || _class;

export default Counter;
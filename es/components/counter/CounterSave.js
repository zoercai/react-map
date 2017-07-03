var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-toolbox/lib/button';
import Store from '../../store';
import API from '../../api';

var CounterSave = observer(_class = function (_Component) {
  _inherits(CounterSave, _Component);

  function CounterSave() {
    _classCallCheck(this, CounterSave);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  CounterSave.prototype.save = function save() {
    API.saveFile(Store.saveFile);
  };

  CounterSave.prototype.load = function load() {
    return API.getSaveFile().then(function (saveFile) {
      Store.loadSaveFile(saveFile);
    });
  };

  CounterSave.prototype.render = function render() {
    var buttonStyle = {
      color: 'white',
      fontWeight: '700'
    };
    return React.createElement(
      'div',
      null,
      React.createElement(Button, { id: 'save', onClick: this.save, label: 'Save', style: buttonStyle }),
      React.createElement(Button, { id: 'load', onClick: this.load, label: 'Load', style: buttonStyle })
    );
  };

  return CounterSave;
}(Component)) || _class;

export default CounterSave;
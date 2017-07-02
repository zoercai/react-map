import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import BoilerplateApp from './app';

render(React.createElement(
  AppContainer,
  null,
  React.createElement(BoilerplateApp, null)
), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./app', function () {
    var NextApp = require('./app').default; // eslint-disable-line global-require
    render(React.createElement(
      AppContainer,
      null,
      React.createElement(NextApp, null)
    ), document.getElementById('root'));
  });
}
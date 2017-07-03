import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default; // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}

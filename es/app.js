import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import CounterContainer from './components/counter';
import CommonExample from './components/react-common';
import Constants from './constants';
import styles from './styles.scss';

var App = function App(_ref) {
  var rootUri = _ref.rootUri;
  return React.createElement(
    Router,
    null,
    React.createElement(
      'div',
      null,
      React.createElement(
        AppBar,
        null,
        React.createElement(
          Navigation,
          { className: styles.nav },
          React.createElement(
            Link,
            { to: '' + rootUri + Constants.ROUTER.HOME },
            'Home'
          ),
          React.createElement(
            Link,
            { to: '' + rootUri + Constants.ROUTER.REACT_COMMON },
            'React Common Examples'
          )
        )
      ),
      React.createElement(Route, { exact: true, path: '' + rootUri + Constants.ROUTER.HOME, component: CounterContainer }),
      React.createElement(Route, { path: '' + rootUri + Constants.ROUTER.REACT_COMMON, component: CommonExample })
    )
  );
};

process.env.NODE_ENV !== "production" ? App.propTypes = {
  rootUri: React.PropTypes.string
} : void 0;
App.defaultProps = {
  rootUri: ''
};

export default App;
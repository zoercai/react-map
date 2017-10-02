import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { Provider } from 'mobx-react';
import CounterStore from './stores/CounterStore';
import CounterContainer from './components/counter';
import CommonExample from './components/react-common';
import AntExample from './components/ant';
import Constants from './constants';
import styles from './styles.scss';

const App = ({ rootUri }) => (
  <Provider counterStore={new CounterStore()}>
    <Router>
      <div>
        <AppBar>
          <Navigation className={styles.nav}>
            <Link to={`${rootUri}${Constants.ROUTER.HOME}`}>Home</Link>
            <Link to={`${rootUri}${Constants.ROUTER.REACT_COMMON}`}>React Common Examples</Link>
            <Link to={`${rootUri}${Constants.ROUTER.ANT}`}>Ant Examples</Link>
          </Navigation>
        </AppBar>

        <Route exact path={`${rootUri}${Constants.ROUTER.HOME}`} component={CounterContainer} />
        <Route path={`${rootUri}${Constants.ROUTER.REACT_COMMON}`} component={CommonExample} />
        <Route path={`${rootUri}${Constants.ROUTER.ANT}`} component={AntExample} />
      </div>
    </Router>
  </Provider>
);

App.propTypes = {
  rootUri: PropTypes.string,
};
App.defaultProps = {
  rootUri: '',
};

export default App;

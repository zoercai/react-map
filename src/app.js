import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { Provider } from 'mobx-react';
import CounterStore from './stores/CounterStore';
import CounterContainer from './components/counter';
import CommonExample from './components/react-common';
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
          </Navigation>
        </AppBar>

        <Route exact path={`${rootUri}${Constants.ROUTER.HOME}`} component={CounterContainer} />
        <Route path={`${rootUri}${Constants.ROUTER.REACT_COMMON}`} component={CommonExample} />
      </div>
    </Router>
  </Provider>
);

App.propTypes = {
  rootUri: React.PropTypes.string,
};
App.defaultProps = {
  rootUri: '',
};

export default App;

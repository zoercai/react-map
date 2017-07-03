import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Counter from './Counter';
import CounterSave from './CounterSave';
import styles from './styles.scss';

class CounterContainer extends Component {
  render() {
    return (
      <div>
        <AppBar title="Counter App">
          <Navigation type="horizontal">
            <CounterSave />
          </Navigation>
        </AppBar>
        <div className={styles.container}>
          <Counter />
        </div>
      </div>
    );
  }
}

export default CounterContainer;

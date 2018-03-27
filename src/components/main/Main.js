import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './main.css';
import FilterDialog from '../filterbar/FilterDialogue';
import Map from '../map/Map';

@inject('store')
@observer
class Main extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className={cn(styles.container, styles.mainDisplay)}>
        <FilterDialog active={this.props.store.getFilterDialogActive()} />
        <div className={styles.main}>
          <Map />
        </div>
      </div>
    );
  }
}

export default Main;

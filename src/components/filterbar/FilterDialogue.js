import React from 'react';
import cn from 'classnames';
import { Button, IconButton } from 'react-toolbox/lib/button';
import { NavDrawer } from 'react-toolbox';
import FontIcon from 'react-toolbox/lib/font_icon';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import styles from './toolbar.css';
// import posStyles from '../../styles.scss';
import FilterData from './FilterData';
import tripIcon from './tripIcon.png';

@inject('store') @observer
class FilterDialogue extends React.Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    store: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      form: new FilterData(this.props.store.activeFilters || {}, this.props.store),
    };
  }

  state = {
    form: new FilterData(this.props.store.activeFilters || {}, this.props.store),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.active === true && this.props.active === false) {
      this.setState({
        form: new FilterData(this.props.store.activeFilters || {}, this.props.store),
      });
    }
  }

  apply = (form) => {
    this.props.store.setActiveFilters({
      sensorName: form.fields.sensorName.value,
      vehicleId: form.fields.vehicleId.value,
    });
    this.props.store.closeFilterDialog();
  }

  clearAll = () => {
    this.setState({
      form: new FilterData({}, this.props.store),
    });
  }

  render() {
    const form = this.state.form;
    const drawerStyle = styles.drawer;
    const dropDownStyle = styles.dropDown;
    const scrollableStyle = styles.scrollable;
    const overlayStyle = this.props.store.filterDialogActive ? styles.overlayActive : styles.overlay;

    const content = (
      <form
        id="FilterForm"
        autoComplete="off"
        noValidate
      >
        <fieldset>
          <div className={scrollableStyle}>
            <div className={styles.filterHeaderContainer}>
              <p className={styles.filterTitle}>Filters</p>
              <IconButton icon="close" className={styles.closeButton} id="closeFilterDialogButton" onClick={this.props.store.closeFilterDialog} ripple={false} />
              <Button label="Clear All" className={cn(styles.button, styles.clearAll)} id="clearFilterDialogButton" onClick={() => this.clearAll()} ripple={false} />
            </div>

            <div className={cn(styles.topHeaderContainer, styles.headerContainer)}>
              <img className={styles.icon} src={tripIcon} alt="tripIcon" />
              <p className={styles.header}>Trip</p>
            </div>
            <div className={cn(styles.container, styles.sensor)}>
              <p className={styles.subHeader}>Sensor</p>
              <div>{ form.fields.sensorName.render() }</div>
            </div>
            <div className={styles.headerContainer}>
              <FontIcon value="settings" className={styles.fontIcon} />
              <p className={cn(styles.header, styles.vehicleHeader)}>Vehicle</p>
            </div>
            <div className={styles.container}>
              <div className={cn(styles.subContainer, dropDownStyle)}>{ form.fields.vehicleId.render() }</div>
            </div>
            <div className={styles.actionButtons}>
              <Button label="Apply Filters" className={cn(styles.button, styles.rightButton, styles.apply)} id="applyFilterDialogButton" onClick={() => this.apply(form)} />
            </div>
          </div>
        </fieldset>
      </form>
    );

    return (

      <NavDrawer
        active={this.props.store.getFilterDialogActive()}
        onOverlayClick={this.props.store.closeFilterDialog}
        className={drawerStyle}
        theme={{ scrim: overlayStyle }}
      >
        {content}
      </NavDrawer>
    );
  }
}

export default FilterDialogue;

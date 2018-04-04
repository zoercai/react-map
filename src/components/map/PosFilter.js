import React from 'react';
import _ from 'lodash';
import { observer, inject } from 'mobx-react';
import Chip from 'react-toolbox/lib/chip';
import { Button } from 'react-toolbox/lib/button';
import PropTypes from 'prop-types';
import styles from './posFilter.css';

@inject('store') @observer class PosFilter extends React.Component {
  static propTypes = {
    setFilters: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
  };

  generateFilter(filterType, optionType) {
    return _.map(this.props.store.activeFilters[filterType], id => (
      ({ label: id, id, type: filterType, key: `${filterType}${id}` })
    ));
  }

  render() {
    const filters = [];
    const filtersBeforeRemoval = _.concat(
      this.generateFilter('sensorName', 'sensorsFilterOptions'),
      this.generateFilter('vehicleId', 'vehicleNameFilterOptions'),
    );

    filtersBeforeRemoval.forEach((filter) => {
      if (filter.label !== null) {
        filters.push(filter);
      }
    });

    this.props.setFilters(filters);

    return (
      <div className={styles.header}>
        <div className={styles.filterHeader}>
          <Button icon="tune" label="Filters" raised primary onClick={this.props.store.openFilterDialog} id="PosFilterDialogButton" className={styles.filterButton} ripple={false} />
        </div>
        <section id="activeFilters" className={styles.activeFilterChips}>
          {filters.map((filter, index) => (
            <Chip
              id={`activeFilterChip${index}`}
              key={`${filter.id}${filter.type}`}
              deletable
              className={styles.filterChip}
              theme={{ deleteIcon: styles.chipDeleteIcon, delete: styles.chipDelete }}
              onDeleteClick={() => {
                // TODO this needs refactoring
                this.props.store.removeActiveFilter(filter.id, filter.type);
                _.remove(filters, activeFilter => activeFilter.id === filter.id);
                this.props.setFilters(filters);
              }}
            >
              <span className={styles.chipLabel} id={`activeFilterLabel${index}`} onClick={this.handleToggle} >
                {filter.label}
              </span>
            </Chip>
          ))}
        </section>
      </div>
    );
  }
}

export default PosFilter;

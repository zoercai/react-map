import React from 'react';
import _ from 'lodash';
import { observer, inject } from 'mobx-react';
import Chip from 'react-toolbox/lib/chip';
import { Button } from 'react-toolbox/lib/button';
import { snackbarInBody, constants as CommonConstants } from 'react-common';
import PropTypes from 'prop-types';
import styles from './posFilter.css';

@inject('store') @observer class PosFilter extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };

//   generateFilter(filterType, optionType) {
//     return _.map(this.props.store.activeFilters[filterType], id => (
//       ({ label: this.props.store.getFilterDisplayName(optionType, id), id, type: filterType, key: `${filterType}${id}` })
//     ));
//   }

  render() {
    const filters = [];
    // const filtersBeforeRemoval = _.concat(
    //   this.generateFilter('sensors', 'sensorsFilterOptions'),
    //   this.generateFilter('vehicleIds', 'vehicleNameFilterOptions'),
    //   this.generateFilter('groupIds', 'groupNameFilterOptions'),
    // );

    // filtersBeforeRemoval.forEach((filter) => {
    //   if (filter.label !== null) {
    //     filters.push(filter);
    //   }
    // });

    return (
      <div className={styles.header}>
        <div className={styles.filterHeader}>
          <Button icon="tune" label="Filters" flat primary onClick={this.props.store.openFilterDialog} id="PosFilterDialogButton" className={styles.filterButton} ripple={false} />
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
                this.props.store.removeActiveFilter(filter.id, filter.type);
                this.props.store.getActiveVehiclesAction().catch(() => {
                  snackbarInBody({
                    id: 'deletingActiveFilterErrorSnackbar',
                    label: 'An error occurred while loading your proof of service data. Please try again later.',
                    action: CommonConstants.SNACKBAR_DISMISS,
                    type: 'cancel',
                    timeout: CommonConstants.SNACKBAR_ERROR_TIMEOUT,
                    styles: null,
                  });
                });
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

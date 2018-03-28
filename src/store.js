import { observable, action } from 'mobx';
import _ from 'lodash';
import API from './api';

class Store {
  @observable loadingTrips = false;
  @observable onPoints = {};
  @observable offPoints = {};
  @observable trips = {};
  @observable loadingEvents = false;
  @observable events = {};
  @observable filterDialogActive = false;
  @observable filterOptions = {
    sensorsFilterOptions: [],
    vehicleNameFilterOptions: [],
  };
  @observable activeFilters = {
    sensorsFilterOptions: [],
    vehicleNameFilterOptions: [],
  };

  @action getOnPointsAction = () => {
    this.loadingTrips = true;
    return API.getOnPoints().then((payload) => {
      this.onPoints = payload;
      this.loadingTrips = false;
      return payload;
    });
  }

  @action getOffPointsAction = () => {
    this.loadingTrips = true;
    return API.getOffPoints().then((payload) => {
      this.offPoints = payload;
      this.loadingTrips = false;
      return payload;
    });
  }

  @action getTripsAction = () => {
    this.loadingTrips = true;
    return API.getTrips().then((payload) => {
      this.trips = payload;

      // Set sensor filter options
      const sensorOptions = new Set();
      payload.features.forEach((feature) => {
        if (feature.properties.sensorName !== '' && feature.properties.sensorName !== null) {
          sensorOptions.add(feature.properties.sensorName);
        }
      });
      this.setSensorFilterOptions(Array.from(sensorOptions));

      // Set vehicle filter options
      const vehicleOptions = new Set();
      payload.features.forEach((feature) => {
        if (feature.properties.vehicleId !== '' && feature.properties.vehicleId !== null) {
          vehicleOptions.add(feature.properties.vehicleId);
        }
      });
      this.setVehicleFilterOptions(Array.from(vehicleOptions));

      this.loadingTrips = false;
      return payload;
    });
  }

  @action openFilterDialog = () => {
    this.filterDialogActive = true;
  }

  @action closeFilterDialog = () => {
    this.filterDialogActive = false;
  }

  getFilterDialogActive() {
    return this.filterDialogActive;
  }

  @action setSensorFilterOptions = (sensorFilterOptions) => {
    this.filterOptions.sensorsFilterOptions = sensorFilterOptions;
  }

  getSensorsFilterOptions() {
    return this.filterOptions.sensorsFilterOptions;
  }

  @action setVehicleFilterOptions = (vehicleFilterOptions) => {
    this.filterOptions.vehicleNameFilterOptions = vehicleFilterOptions;
  }

  getVehicleNameFilterOptions() {
    return this.filterOptions.vehicleNameFilterOptions;
  }

  getActiveFilters() {
    return this.filterOptions.activeFilters;
  }

  @action setActiveFilters = (payload) => {
    this.activeFilters = payload;
  }

  @action removeActiveFilter(id, type) {
    _.remove(this.activeFilters[type], activeFilterId => activeFilterId === id);
  }

  getFilterDisplayName(optionType, id) {
    for (let i = 0; i < this.filterOptions[optionType].length; i += 1) {
      if (id.toString() === this.filterOptions[optionType][i].toString()) {
        return this.filterOptions[optionType][i];
      }
    }
    return null;
  }
}

export default Store;

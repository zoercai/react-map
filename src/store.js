import { observable, action } from 'mobx';
import _ from 'lodash';
import API from './api';

class Store {
  @observable loadingTrips = false;
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

  @action openFilterDialog = () => {
    this.filterDialogActive = true;
  }

  @action closeFilterDialog = () => {
    this.filterDialogActive = false;
  }

  getFilterDialogActive() {
    return this.filterDialogActive;
  }

  getSensorsFilterOptions() {
    return this.filterOptions.sensorFilterOptions;
  }

  getSensorFiltersAction = () => API.getSensorFilters().then((payload) => {
    this.setSensorFilterOptions(payload);
    return payload;
  })

  @action setSensorFilterOptions = (payload) => {
    this.filterOptions.sensorFilterOptions = payload
      .map(sensor => this.formatSensorFilters(sensor));
  }

  formatSensorFilters = function formatSensorFilters(sensor) {
    return {
      label: sensor.sensor_name.trim(),
      value: sensor.sensor_name.trim(),
      type: 'Sensor',
    };
  }

  getVehicleNameFilterOptions() {
    return this.filterOptions.vehicleNameFilterOptions;
  }

  getVehicleFiltersAction = () => API.getVehicleFilters().then((payload) => {
    this.setVehicleFilterOptions(payload);
    return payload;
  })

  @action setVehicleFilterOptions = (payload) => {
    this.filterOptions.vehicleNameFilterOptions = payload
      .map(vehicle => this.formatVehicleFilters(vehicle));
  }

  formatVehicleFilters = function formatVehicleFilters(vehicle) {
    return {
      label: vehicle.machine_id.trim(),
      value: vehicle.machine_id.trim(),
    };
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

  // getFilterDisplayName(optionType, id) {
  //   for (let i = 0; i < this.filterOptions[optionType].length; i += 1) {
  //     if (id.toString() === this.filterOptions[optionType][i].toString()) {
  //       return this.filterOptions[optionType][i];
  //     }
  //   }
  //   return null;
  // }
}

export default Store;

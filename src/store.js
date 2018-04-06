import { observable, action, toJS } from 'mobx';
import _ from 'lodash';
import API from './api';

class Store {
  @observable filterDialogActive = false;
  @observable filterOptions = {
    sensorsFilterOptions: [],
    vehicleNameFilterOptions: [],
  };
  @observable activeFilters = {
    sensorsFilterOptions: [],
    vehicleNameFilterOptions: [],
  };

  // Sensor filter options
  getSensorFiltersAction = () => API.getSensorFilters().then((payload) => {
    this.setSensorFilterOptions(payload);
    return payload;
  })

  @action setSensorFilterOptions = (payload) => {
    this.filterOptions.sensorFilterOptions = payload
      .map(sensor => this.formatSensorFilters(sensor));
    this.filterOptions.sensorFilterOptions = _.sortBy(this.filterOptions.sensorFilterOptions, 'label');
  }

  formatSensorFilters = function formatSensorFilters(sensor) {
    return {
      label: sensor.sensor_name.trim(),
      value: sensor.sensor_name.trim(),
      type: 'Sensor',
    };
  }

  getSensorsFilterOptions() {
    return this.filterOptions.sensorFilterOptions;
  }

  // Vehicle filter options
  getVehicleFiltersAction = () => API.getVehicleFilters().then((payload) => {
    this.setVehicleFilterOptions(payload);
    return payload;
  })

  @action setVehicleFilterOptions = (payload) => {
    this.filterOptions.vehicleNameFilterOptions = payload
      .map(vehicle => this.formatVehicleFilters(vehicle));
    this.filterOptions.vehicleNameFilterOptions = _.sortBy(this.filterOptions.vehicleNameFilterOptions, 'label');
  }

  formatVehicleFilters = function formatVehicleFilters(vehicle) {
    return {
      label: vehicle.machine_id.trim(),
      value: vehicle.machine_id.trim(),
      type: 'Vehicle Name',
    };
  }

  getVehicleNameFilterOptions() {
    return this.filterOptions.vehicleNameFilterOptions;
  }

  // Filter Dialog
  @action openFilterDialog = () => {
    this.filterDialogActive = true;
  }

  @action closeFilterDialog = () => {
    this.filterDialogActive = false;
  }

  getFilterDialogActive() {
    return this.filterDialogActive;
  }

  // Active filters
  getActiveFilters() {
    return toJS(this.activeFilters);
  }

  @action setActiveFilters = (payload) => {
    this.activeFilters = payload;
  }

  @action removeActiveFilter(id, type) {
    _.remove(this.activeFilters[type], activeFilterId => activeFilterId === id);
  }
}

export default Store;

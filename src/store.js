import { observable, action } from 'mobx';
import API from './api';

class Store {
  // @observable layersVisibility = [];
  @observable loadingTrips = false;
  @observable trips = {};
  @observable loadingEvents = false;
  @observable events = {};
  @observable filterDialogActive = false;
  @observable filterOptions = {
    sensorsFilterOptions: [],
    vehicleNameFilterOptions: [],
    groupNameFilterOptions: [],
  };
  @observable activeFilters = {};

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

  @action getEventsAction = () => {
    this.loadingEvents = true;
    return API.getEvents().then((payload) => {
      this.events = payload;
      this.loadingEvents = false;
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

  getGroupNameFilterOptions() {
    return this.filterOptions.groupNameFilterOptions;
  }

  @action setActiveFilters = (payload) => {
    this.activeFilters = payload;
  }
}

export default Store;

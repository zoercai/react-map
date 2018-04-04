import { constants as CommonConstants } from 'react-common';
import Constants from './constants';

export default {
  getTrips() {
    return fetch(`${Constants.API_URI}${Constants.TRIPS_API}`,
      CommonConstants.GET_JSON_FETCH_CONFIG,
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  },

  getSensorFilters() {
    return fetch(`${Constants.API_URI}${Constants.SENSOR_FILTERS_API}`,
      CommonConstants.GET_JSON_FETCH_CONFIG,
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  },

  getVehicleFilters() {
    return fetch(`${Constants.API_URI}${Constants.VEHICLE_FILTERS_API}`,
      CommonConstants.GET_JSON_FETCH_CONFIG,
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  },

  getOnPoints() {
    return fetch(`${Constants.API_URI}${Constants.ON_POINTS_API}`,
      CommonConstants.GET_JSON_FETCH_CONFIG,
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  },

  getOffPoints() {
    return fetch(`${Constants.API_URI}${Constants.OFF_POINTS_API}`,
      CommonConstants.GET_JSON_FETCH_CONFIG,
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  },
};

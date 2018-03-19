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

  getEvents() {
    return fetch(`${Constants.API_URI}${Constants.EVENTS_API}`,
      CommonConstants.GET_JSON_FETCH_CONFIG,
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  },
};

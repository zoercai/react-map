import { observable, action } from 'mobx';
import API from './api';

class Store {
  // @observable layersVisibility = [];
  @observable loadingTrips = false;
  @observable trips = {};
  @observable loadingEvents = false;
  @observable events = {};

  // @action toggleLayerVisibility(layer) {
  //   if (this.layersVisibility[layer] === 'visible') {
  //     this.layersVisibility[layer] = 'none';
  //   } else {
  //     this.layersVisibility[layer] = 'visible';
  //   }
  // }

  @action getTripsAction = () => {
    this.loadingTrips = true;
    return API.getTrips().then((payload) => {
      this.trips = payload;
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
}

export default Store;

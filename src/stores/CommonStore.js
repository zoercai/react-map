import { observable, action } from 'mobx';
import API from '../api';

export const Constants = {
  STATE: {
    PENDING: 'PENDING',
    DONE: 'DONE',
    ERROR: 'ERROR',
  },
};

class CommonStore {
  @observable ping = {};
  @observable state = Constants.STATE.PENDING;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  fetchPing() {
    return API.fetchPing().then(
      action('fetchSuccess', (ping) => {
        this.ping = ping;
        this.state = Constants.STATE.DONE;
      }),
    ).catch(
      action('fetchError', () => {
        this.state = Constants.STATE.ERROR;
      }),
    );
  }
}

export default CommonStore;

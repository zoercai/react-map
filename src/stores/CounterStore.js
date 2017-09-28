import { observable, computed, action } from 'mobx';

class CounterStore {
  @observable increments = 0;
  @observable decrements = 0;

  @computed get count() {
    return this.increments - this.decrements;
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  reset() {
    this.increments = 0;
    this.decrements = 0;
  }

  increment(i) {
    this.increments = this.increments + i;
  }

  decrement(i) {
    this.decrements = this.decrements + i;
  }

  @computed get saveFile() {
    return {
      increments: this.increments,
      decrements: this.decrements,
    };
  }

  @action loadSaveFile(saveFile) {
    this.increments = saveFile.increments;
    this.decrements = saveFile.decrements;
  }
}

export default CounterStore;

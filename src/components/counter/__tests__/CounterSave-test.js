import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import CounterSave from '../CounterSave';
import CounterStore from '../../../stores/CounterStore';
import API from '../../../api';

chai.use(chaiEnzyme());

describe('CounterSave', () => {
  let wrapper;
  let fakes;
  let counterStore;
  beforeEach(() => {
    counterStore = new CounterStore();
    wrapper = shallow(<CounterSave.wrappedComponent counterStore={counterStore} />);
    fakes = sinon.collection;
  });
  afterEach(() => {
    wrapper.unmount();
    fakes.restore();
  });
  describe('#save', () => {
    it('calls API.saveFile with the saveFile from the Store when clicked', () => {
      counterStore.increments = 3;
      counterStore.decrements = 2;
      const apiSpy = fakes.stub(API, 'saveFile');
      wrapper.find('#save').simulate('click');
      expect(apiSpy.calledOnce).to.be.true;
      expect(API.saveFile.getCall(0).args[0]).to.deep.equal(counterStore.saveFile);
    });
  });

  describe('load functionality', () => {
    it('#load calls load()', () => {
      wrapper.unmount();
      const loadStub = fakes.stub(CounterSave.wrappedComponent.prototype, 'load').returns(true); // we need to spy or stub on a method in a component before we mount it
      wrapper = mount(<CounterSave counterStore={counterStore} />);
      wrapper.find('#load').simulate('click');
      expect(loadStub.calledOnce).to.be.true;
    });

    it('load() calls counterStore.loadSaveFile using the saveFile from API.saveFile()', () => {
      const saveFile = {
        increments: 6,
        decrements: 3,
      };
      const apiStub = fakes.stub(API, 'getSaveFile').returns(Promise.resolve(saveFile));
      const storeSpy = fakes.stub(counterStore, 'loadSaveFile');
      return wrapper.instance().load().then(() => { // for testing async Promises you need to return the promise for mocha to pick it up
        expect(apiStub.calledOnce).to.be.true;
        expect(storeSpy.calledOnce).to.be.true;
      });
    });
  });
});

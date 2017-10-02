import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Counter from '../Counter';
import CounterStore from '../../../stores/CounterStore';

chai.use(chaiEnzyme());

describe('Counter', () => {
  let wrapper;
  let fakes;
  let counterStore;

  beforeEach(() => {
    counterStore = new CounterStore();
    wrapper = shallow(<Counter.wrappedComponent counterStore={counterStore} />);
    fakes = sinon.collection;
  });

  afterEach(() => {
    wrapper.unmount();
    fakes.restore();
  });
  describe('render()', () => {
    it('displays increments', () => {
      counterStore.increments = 1;
      expect(wrapper.find('#increments')).to.contain.text('1');
    });

    it('displays decrements', () => {
      counterStore.decrements = 1;
      expect(wrapper.find('#decrements')).to.have.text('decrements: 1');
    });
  });
  describe('#increment', () => {
    it('calls Store.increment(1) when clicked', () => {
      const storeSpy = fakes.stub(counterStore, 'increment');
      wrapper.find('#increment').simulate('click');
      expect(storeSpy.calledOnce).to.equal(true);
      expect(counterStore.increment.getCall(0).args[0]).to.equal(1);
    });
  });
});

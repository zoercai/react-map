import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import CounterDisplay from '../CounterDisplay';
import { PINK, BLUE } from '../../../constants';

chai.use(chaiEnzyme());

describe('CounterDisplay', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CounterDisplay />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe('render()', () => {
    it('displays count from props', () => {
      wrapper.setProps({
        count: 1,
      });
      expect(wrapper.find('#count')).to.have.text('1');
    });
  });
  describe('state', () => {
    it('click toggles active state', () => {
      expect(wrapper.state('active')).is.false;
      wrapper.simulate('click');
      expect(wrapper.state('active')).is.true;
      wrapper.simulate('click');
      expect(wrapper.state('active')).is.false;
    });
  });
  describe('style()', () => {
    it('returns a blue color if state is active', () => {
      wrapper.setState({
        active: true,
      });
      const style = wrapper.instance().style();
      expect(style).to.have.property('color').which.equals(BLUE);
    });

    it('returns a pink color if state is not active', () => {
      wrapper.setState({
        active: false,
      });
      const style = wrapper.instance().style();
      expect(style).to.have.property('color').which.equals(PINK);
    });
  });
});

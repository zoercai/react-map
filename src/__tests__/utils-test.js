import { expect } from 'chai';
import { addition } from '../utils';

describe('utils', () => {
  describe('addition()', () => {
    it('1 and 2 and returns 3', () => {
      expect(addition(1, 2)).to.equal(3);
    });
  });

  describe('chai examples', () => {
    // See the docs http://chaijs.com/api/
    it('has some cool nesting assertions', () => {
      const integers = {
        odd: [1, 3, 5, 7, 9],
        even: [2, 4, 6, 8],
      };
      expect(integers)
        .to.have.property('odd')
        .to.be.an('array')
        .with.length(5)
        .that.includes(7)
        .and.includes(9)
        .and.does.not.include(2);
      expect(integers)
        .to.have.nested.property('even[2]')
        .to.equal(6);
    });
  });
});

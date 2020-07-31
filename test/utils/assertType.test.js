const
  should = require('should'),
  assert = require('../../lib/utils/assertType'),
  {BadRequestError} = require('../../lib/errors/badRequestError');

describe('#assertType', () => {
  describe('#assertArray', () => {
    it('should return an empty array if null/undefined is provided', () => {
      should(assert.assertArray('foo', null, 'string')).eql([]);
      should(assert.assertArray('foo', undefined, 'string')).eql([]);
    });

    it('should return a copy of the provided array', () => {
      const arr = ['foo'];

      should(assert.assertArray('foo', arr, 'string'))
        .eql(arr)
        .not.equal(arr);
    });

    it('should filter null/undefined entries', () => {
      should(assert.assertArray('foo', ['foo', null, undefined, 'bar'], 'string'))
        .match(['foo', 'bar']);
    });

    it('should throw if the provided data is not an array', () => {
      for (const wrong of [{}, 'foo', 123, true, false]) {
        should(() => assert.assertArray('foo', wrong, 'string'))
          .throw(BadRequestError, {message: 'Attribute foo must be of type "array"'});
      }
    });

    it('should throw if the provided array contains a value of an unexpected type', () => {
      console.log({BadRequestError})
      for (const wrong of [{}, [], 123, true, false]) {
        const arr = ['foo', wrong, 'bar'];
        should(() => assert.assertArray('foo', arr, 'string'))
          .throw(BadRequestError, {message: 'Attribute foo must contain only values of type "string"'});
      }
    });
  });
});

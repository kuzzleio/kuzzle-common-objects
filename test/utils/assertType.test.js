const
  should = require('should'),
  assert = require('../../lib/utils/assertType'),
  ParseError = require('../../lib/errors/parseError');

describe('#assertType', () => {
  describe('#assertUnitTypeObject', () => {
    it('should infer the type from the first property', () => {
      should(() => {
        assert.assertUniTypeObject('test', {
          foo: ['bar'],
          baz: true
        });

      }).throw(ParseError);
    });

    it('should detect object of arrays', () => {
      const data = {
        a: [1],
        b: [2, 4],
        c: 42,

      };

      should(() => assert.assertUniTypeObject('test', data, 'array'))
        .throw(ParseError);
    });
  });

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
          .throw(ParseError, {message: 'Attribute foo must be of type "array"'});
      }
    });

    it('should throw if the provided array contains a value of an unexpected type', () => {
      for (const wrong of [{}, [], 123, true, false]) {
        const arr = ['foo', wrong, 'bar'];
        should(() => assert.assertArray('foo', arr, 'string'))
          .throw(ParseError, {message: 'Attribute foo must contain only values of type "string"'});
      }
    });
  });
});

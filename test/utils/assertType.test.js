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
});

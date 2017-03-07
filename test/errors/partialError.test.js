'use strict';

const
  should = require('should'),
  PartialError = require.main.require('lib/errors/partialError');

describe('#PartialError', () => {
  it('should create a well-formed object with no body provided', () => {
    let err = new PartialError('foobar');

    should(err.message).be.eql('foobar');
    should(err.status).be.eql(206);
    should(err.name).be.eql('PartialError');
    should(err.errors).be.undefined();
    should(err.count).be.undefined();
  });

  it('should create a well-formed object with a body provided', () => {
    let err = new PartialError('foobar', ['foo', 'bar']);

    should(err.message).be.eql('foobar');
    should(err.status).be.eql(206);
    should(err.name).be.eql('PartialError');
    should(err.errors).be.eql(['foo', 'bar']);
    should(err.count).be.eql(2);
  });

  it('should serialize correctly', () => {
    let err = JSON.parse(JSON.stringify(new PartialError('foobar', ['foo', 'bar'])));

    should(err.message).be.eql('foobar');
    should(err.status).be.eql(206);
    should(err.errors).be.eql(['foo', 'bar']);
    should(err.count).be.eql(2);
  });
});

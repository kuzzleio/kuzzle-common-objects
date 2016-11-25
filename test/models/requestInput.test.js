'use strict';

const
  should = require('should'),
  RequestInput = require.main.require('lib/models/requestInput');

describe('#RequestContext', () => {
  it('should defaults to null all properties', () => {
    let input = new RequestInput({});

    should(input.metadata).be.null();
    should(input.body).be.null();
    should(input.controller).be.null();
    should(input.action).be.null();
    should(input.resource.index).be.null();
    should(input.resource.collection).be.null();
    should(input.resource._id).be.null();
    should(input.args).be.an.Object().and.be.empty();
  });

  it('should dispatch data correctly across properties', () => {
    let
      data = {
        metadata: {foo: 'bar'},
        body: {some: 'content'},
        controller: 'controller',
        action: 'action',
        index: 'index',
        collection: 'collection',
        _id: 'id',
        foo: 'bar',
        bar: 'foo'
      },
      input = new RequestInput(data);

    should(input.metadata).be.exactly(data.metadata);
    should(input.body).be.exactly(data.body);
    should(input.controller).eql('controller');
    should(input.action).eql('action');
    should(input.resource.index).eql('index');
    should(input.resource.collection).eql('collection');
    should(input.resource._id).eql('id');
    should(input.args).match({
      foo: 'bar',
      bar: 'foo'
    });
  });

  it('should throw if invalid data is provided', () => {
    should(function () { new RequestInput(); }).throw('Input request data must be a non-null object');
    should(function () { new RequestInput(null); }).throw('Input request data must be a non-null object');
    should(function () { new RequestInput([]); }).throw('Input request data must be a non-null object');
    should(function () { new RequestInput('abc'); }).throw('Input request data must be a non-null object');
    should(function () { new RequestInput(123); }).throw('Input request data must be a non-null object');
    should(function () { new RequestInput(true); }).throw('Input request data must be a non-null object');
  });

  it('should throw if invalid metadata is provided', () => {
    should(function () { new RequestInput({metadata: []}); }).throw('metadata must be null, undefined, or be a non-empty object');
    should(function () { new RequestInput({metadata: 123}); }).throw('metadata must be null, undefined, or be a non-empty object');
    should(function () { new RequestInput({metadata: false}); }).throw('metadata must be null, undefined, or be a non-empty object');
    should(function () { new RequestInput({metadata: 'foobar'}); }).throw('metadata must be null, undefined, or be a non-empty object');
  });
});

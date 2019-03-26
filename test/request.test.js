'use strict';

const
  should = require('should'),
  KuzzleError = require('../lib/errors/kuzzleError'),
  InternalError = require('../lib/errors/internalError'),
  Request = require('../lib/request'),
  RequestContext = require('../lib/models/requestContext'),
  RequestInput = require('../lib/models/requestInput');

describe('#Request', () => {
  let rq;

  beforeEach(() => {
    rq = new Request({});
  });

  it('should defaults other properties correctly', () => {
    should(rq.status).eql(102);
    should(rq.context).be.instanceOf(RequestContext);
    should(rq.input).be.instanceOf(RequestInput);
    should(rq.result).be.null();
    should(rq.error).be.null();
  });

  it('should initialize the request object with the provided options', () => {
    let
      result = {foo: 'bar'},
      error = new InternalError('foobar'),
      options = {
        status: 666,
        result,
        error,
        connectionId: 'connectionId',
        protocol: 'protocol',
        token: {token: 'token'},
        user: { user: 'user' }
      },
      request = new Request({}, options);

    should(request.status).eql(666);
    should(request.result).be.exactly(result);
    should(request.error).be.exactly(error);
    should(request.error).be.instanceOf(KuzzleError);
    should(request.error.message).be.exactly(error.message);
    should(request.error.stack).be.exactly(error.stack);
    should(request.error.status).be.exactly(request.error.status);
    should(request.context.protocol).eql('protocol');
    should(request.context.connectionId).eql('connectionId');
    should(request.context.token).match({token: 'token'});
    should(request.context.user).match({user: 'user'});
  });

  it('should instanciate a new KuzzleError object from a serialized error', () => {
    let
      result = {foo: 'bar'},
      error = new InternalError('foobar'),
      options = {
        status: 666,
        result,
        error: error.toJSON(),
        connectionId: 'connectionId',
        protocol: 'protocol',
        token: {token: 'token'},
        user: { user: 'user' }
      },
      request = new Request({}, options);

    should(request.status).eql(666);
    should(request.result).be.exactly(result);
    should(request.error).be.instanceOf(KuzzleError);
    should(request.error.message).be.exactly(error.message);
    should(request.error.stack).be.exactly(error.stack);
    should(request.error.status).be.exactly(request.error.status);
    should(request.context.protocol).eql('protocol');
    should(request.context.connectionId).eql('connectionId');
    should(request.context.token).match({token: 'token'});
    should(request.context.user).match({user: 'user'});
  });

  it('should throw if a non-object options argument is provided', () => {
    should(function () { new Request({}, []); }).throw('Request options must be an object');
    should(function () { new Request({}, 'foobar'); }).throw('Request options must be an object');
    should(function () { new Request({}, 123.45); }).throw('Request options must be an object');
  });

  it('should throw if an invalid optional status is provided', () => {
    should(function () { new Request({}, {status: []}); }).throw('Attribute status must be an integer');
    should(function () { new Request({}, {status: {}}); }).throw('Attribute status must be an integer');
    should(function () { new Request({}, {status: 'foobar'}); }).throw('Attribute status must be an integer');
    should(function () { new Request({}, {status: 123.45}); }).throw('Attribute status must be an integer');
  });

  it('should set an error properly', () => {
    let foo = new KuzzleError('bar', 666);

    rq.setError(foo);

    should(rq.error).be.exactly(foo);
    should(rq.status).eql(666);

    should(rq.error.toJSON()).match({status: foo.status, message: foo.message});
  });

  it('should wrap a plain Error object into an InternalError one', () => {
    let foo = new Error('bar');

    rq.setError(foo);

    should(rq.error).not.be.exactly(foo);
    should(rq.error).be.instanceOf(InternalError);
    should(rq.error.message).eql('bar');
    should(rq.error.status).eql(500);
    should(rq.status).eql(500);
  });

  it('should throw if attempting to set a non-error object as a request error', () => {
    should(function () { rq.setError('foo'); }).throw(/^cannot set non-error object.*$/);
  });

  it('should set the provided result with default status 200', () => {
    let result = {foo: 'bar'};
    rq.setResult(result);

    should(rq.result).be.exactly(result);
    should(rq.status).eql(200);
  });

  it('should set a custom status code if one is provided', () => {
    let result = {foo: 'bar'};
    rq.setResult(result, {status: 666});

    should(rq.result).be.exactly(result);
    should(rq.status).eql(666);
  });

  it('should throw if trying to set an error object as a result', () => {
    should(function () { rq.setResult(new Error('foobar')); }).throw(/cannot set an error/);
  });

  it('should throw if trying to set a non-integer status', () => {
    should(function () { rq.setResult('foobar', {status: {}}); }).throw('Attribute status must be an integer');
    should(function () { rq.setResult('foobar', {status: []}); }).throw('Attribute status must be an integer');
    should(function () { rq.setResult('foobar', {status: true}); }).throw('Attribute status must be an integer');
    should(function () { rq.setResult('foobar', {status: 123.45}); }).throw('Attribute status must be an integer');
  });

  it('should throw if trying to set some non-object headers', () => {
    should(() => { rq.setResult('foobar', {headers: 42}); }).throw('Attribute headers must be of type "object"');
    should(() => { rq.setResult('foobar', {headers: { a: true }}); }).throw('Attribute headers must be of type "object" and have all its properties of type string.\nExpected "headers.a" to be of type "string", but go "boolean".');
    should(() => { rq.setResult('foobar', {headers:  'bar'}); }).throw('Attribute headers must be of type "object"');
    should(() => { rq.setResult('foobar', {headers:  true}); }).throw('Attribute headers must be of type "object"');
  });

  it('should set the raw response indicator if provided', () => {
    let result = {foo: 'bar'};

    should(rq.response.raw).be.false();

    rq.setResult(result, {raw: true});

    should(rq.result).be.exactly(result);
    should(rq.response.raw).be.true();
  });

  it('should build a well-formed response', () => {
    let
      result = {foo: 'bar'},
      responseHeaders = {
        'X-Foo': 'bar',
        'X-Bar': 'baz'
      },
      error = new InternalError('foobar'),
      data = {
        index: 'idx',
        collection: 'collection',
        controller: 'controller',
        action: 'action',
        _id: 'id',
        volatile: {
          some: 'meta'
        }
      },
      request = new Request(data),
      response;

    request.setResult(result, {status: 201, headers: responseHeaders});
    request.setError(error);

    response = request.response;

    should(response.status).eql(500);
    should(response.error).be.exactly(error);
    should(response.requestId).eql(request.id);
    should(response.controller).eql(data.controller);
    should(response.action).eql(data.action);
    should(response.collection).eql(data.collection);
    should(response.index).eql(data.index);
    should(response.volatile).match(data.volatile);
    should(response.headers).match(responseHeaders);
    should(response.result).be.exactly(result);
  });

  it('should serialize the request correctly', () => {
    let
      result = {foo: 'bar'},
      error = new InternalError('foobar'),
      data = {
        body: {some: 'body'},
        timestamp: 'timestamp',
        index: 'idx',
        collection: 'collection',
        controller: 'controller',
        action: 'action',
        _id: 'id',
        volatile: {
          some: 'meta'
        },
        foo: 'bar'
      },
      options = {
        status: 666,
        connection: {
          id: 'connectionId',
          protocol: 'protocol',
          url: 'url',
          foobar: 'barfoo',
          ips: ['i', 'p', 's'],
          headers: {foo: 'args.headers'}
        }
      },
      request = new Request(data, options),
      serialized;

    request.setResult(result);
    request.setError(error);

    serialized = request.serialize();

    should(serialized.data.body).match({some: 'body'});
    should(serialized.data.volatile).match({some: 'meta'});
    should(serialized.data.controller).be.eql('controller');
    should(serialized.data.action).be.eql('action');
    should(serialized.data.index).be.eql('idx');
    should(serialized.data.collection).be.eql('collection');
    should(serialized.data._id).be.eql('id');
    should(serialized.data.timestamp).be.eql('timestamp');
    should(serialized.data.foo).be.eql('bar');

    should(serialized.options.connection).match(options.connection);

    should(serialized.options.error).match(error);
    should(serialized.options.result).match(result);
    should(serialized.options.status).be.eql(500);

    should(serialized.headers).match({foo: 'args.headers'});

    const newRequest = new Request(serialized.data, serialized.options);
    should(newRequest.response.toJSON()).match(request.response.toJSON());
    should(newRequest.timestamp).be.eql('timestamp');
  });

  it('should clear the request error and status correctly', () => {
    const
      result = {foo: 'bar'},
      error = new InternalError('foobar'),
      data = {
        body: {some: 'body'},
        timestamp: 'timestamp',
        index: 'idx',
        collection: 'collection',
        controller: 'controller',
        action: 'action',
        _id: 'id',
        volatile: {
          some: 'meta'
        },
        foo: 'bar',
        headers: {foo: 'args.header'}
      },
      request = new Request(data);

    request.input.headers = {foo: 'input.header'};
    request.setResult(result);
    request.setError(error);

    should(request.error).be.instanceOf(InternalError);

    request.clearError();

    should(request.error).be.eql(null);
    should(request.status).eql(200);
  });
});

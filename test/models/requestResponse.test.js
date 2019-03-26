'use strict';

const
  should = require('should'),
  ParseError = require('../../lib/errors/parseError'),
  Request = require('../../lib/request'),
  RequestResponse = require('../../lib/models/requestResponse');

describe('#RequestResponse', () => {
  let req;

  beforeEach(() => {
    req = new Request({
      index: 'index',
      collection: 'collection',
      controller: 'controller',
      action: 'action'
    });
  });

  describe('#constructor', () => {
    it('should populate a valid response object', () => {
      let response = new RequestResponse(req);

      should(response.status).be.exactly(req.status);
      should(response.error).be.exactly(req.error);
      should(response.requestId).be.exactly(req.id);
      should(response.controller).be.exactly(req.input.controller);
      should(response.action).be.exactly(req.input.action);
      should(response.collection).be.exactly(req.input.resource.collection);
      should(response.index).be.exactly(req.input.resource.index);
      should(response.volatile).be.exactly(req.input.volatile);
      should(response.headers).be.exactly(req['responseHeaders\u200b']);
      should(response.result).be.exactly(req.result);
    });

    it('should throw if we try to extend the response', () => {
      let response = new RequestResponse(req);

      should(() => { response.foo = 'bar'; }).throw(TypeError);
    });
  });

  describe('#properties', () => {
    it('should set the request status', () => {
      const response = new RequestResponse(req);

      response.status = 666;
      should(req.status).be.exactly(666);
    });

    it('should set the request error', () => {
      const
        error = new ParseError('test'),
        response = new RequestResponse(req);

      response.error = error;
      should(req.error).be.exactly(error);
      should(req.status).be.exactly(error.status);
    });

    it('should set the request result', () => {
      const
        result = {foo: 'bar'},
        response = new RequestResponse(req);

      response.result = result;
      should(req.result).be.exactly(result);
    });
  });

  describe('headers', () => {
    let response;

    beforeEach(() => {
      response = new RequestResponse(req);
    });

    it('should set headers', () => {
      response.setHeader('X-Foo', 'Bar');
      response.setHeader('X-Bar', 'Baz');

      should(response.headers).match({
        'X-Foo': 'Bar',
        'X-Bar': 'Baz'
      });

      // set-cookie is a special key stored as an array
      response.setHeader('Set-Cookie', 'test');
      should(response.headers['Set-Cookie'])
        .be.an.Array()
        .have.length(1);
      should(response.headers['Set-Cookie'][0])
        .be.exactly('test');

      response.setHeader('Set-Cookie', 'test2');
      should(response.headers['Set-Cookie'][1])
        .be.exactly('test2');

      // special headers cannot be duplicated
      [
        'age',
        'authorization',
        'content-length',
        'content-type',
        'etag',
        'expires',
        'from',
        'host',
        'if-modified-since',
        'if-unmodified-since',
        'last-modified, location',
        'max-forwards',
        'proxy-authorization',
        'referer',
        'retry-after',
        'user-agent'
      ].forEach(name => {
        response.setHeader(name, 'foobar');
        response.setHeader(name, 'foobar');
        should(response.headers[name])
          .be.exactly('foobar');
      });

      // regular headers value are coma separated
      response.setHeader('X-Baz', 'Foo');
      response.setHeader('X-Baz', 'Bar');

      should(response.headers['X-Baz'])
        .be.exactly('Foo, Bar');

      // setHeaders adds received headers to current ones
      response.setHeaders({
        test: 'test',
        banana: '42'
      });

      should(response.headers)
        .have.property('X-Foo');
      should(response.headers.test)
        .be.exactly('test');
      should(response.headers.banana)
        .be.exactly('42');

      // setHeaders does nothing if null is given
      response.setHeaders(null);

      // removeHeader
      response.removeHeader('X-Foo');
      should(response.headers)
        .not.have.property('X-Foo');

      // getHeader should be case-insensitive
      should(response.getHeader('x-bAr'))
        .be.exactly('Baz');
    });

    it('should throw if setHeader is called with non-string parameters', () => {
      [
        {},
        1.42,
        true,
        []
      ].forEach(param => {
        should(() => response.setHeader(param, 'test')).throw(ParseError);
        should(() => response.setHeader('test', param)).throw(ParseError);
      });
    });

    it('should throw if setHeaders is called with an object containing non-string properties', () => {
      [
        {},
        1.42,
        true,
        []
      ].forEach(param => {
        should(() => {
          response.setHeaders({
            foo: 'bar',
            baz: param
          });
        }).throw(ParseError);
      });
    });
  });

  describe('toJSON', () => {
    it('should return a valid JSON object in Kuzzle format', () => {
      let response = new RequestResponse(req);

      response.setHeader('x-foo', 'bar');

      should(response.toJSON()).have.properties(['raw', 'status', 'requestId', 'content', 'headers']);
      should(response.toJSON().content).have.properties([
        'error',
        'requestId',
        'controller',
        'action',
        'collection',
        'index',
        'volatile',
        'result'
      ]);
      should(response.toJSON().raw).be.false();
      should(response.toJSON().headers).match({'x-foo': 'bar'});
    });

    it('should return a valid JSON object in raw format', () => {
      let response = new RequestResponse(req);

      response.raw = true;
      response.setHeader('x-foo', 'bar');
      response.result = 'foobar';
      response.status = 666;

      should(response.toJSON()).have.properties(['raw', 'content', 'headers']);
      should(response.toJSON().status).be.eql(666);
      should(response.toJSON().content).be.eql('foobar');
      should(response.toJSON().raw).be.true();
      should(response.toJSON().headers).match({'x-foo': 'bar'});
    });
  });

});

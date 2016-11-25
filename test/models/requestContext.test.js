'use strict';

const
  should = require('should'),
  RequestContext = require.main.require('lib/models/requestContext');

describe('#RequestContext', () => {
  let rqc;

  beforeEach(() => {
    rqc = new RequestContext();
  });

  it('should build a well-formed object', () => {
    should(rqc).have.enumerable('connectionId');
    should(rqc).have.enumerable('protocol');
    should(rqc).have.enumerable('token');
    should(rqc).have.enumerable('user');
  });
});

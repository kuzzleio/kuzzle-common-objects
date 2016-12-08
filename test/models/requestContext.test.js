'use strict';

const
  should = require('should'),
  RequestContext = require.main.require('lib/models/requestContext');

describe('#RequestContext', () => {
  it('should initialize itself with provided options', () => {
    let context = new RequestContext({
      connectionId: 'connectionId',
      protocol: 'protocol',
      token: {token: 'token'},
      user: {user: 'user'}
    });

    should(context.connectionId).eql('connectionId');
    should(context.protocol).eql('protocol');
    should(context.token).match({token: 'token'});
    should(context.user).match({user: 'user'});
  });

  it('should throw if an invalid argument type is provided', () => {
    // string arguments
    ['connectionId', 'protocol'].forEach(k => {
      should(function () { new RequestContext({[k]: {}}); }).throw(`Attribute ${k} must be of type "string"`);
      should(function () { new RequestContext({[k]: []}); }).throw(`Attribute ${k} must be of type "string"`);
      should(function () { new RequestContext({[k]: 132}); }).throw(`Attribute ${k} must be of type "string"`);
      should(function () { new RequestContext({[k]: true}); }).throw(`Attribute ${k} must be of type "string"`);
    });

    // object arguments
    ['token', 'user'].forEach(k => {
      should(function () { new RequestContext({[k]: 'foobar'}); }).throw(`Attribute ${k} must be of type "object"`);
      should(function () { new RequestContext({[k]: []}); }).throw(`Attribute ${k} must be of type "object"`);
      should(function () { new RequestContext({[k]: 132}); }).throw(`Attribute ${k} must be of type "object"`);
      should(function () { new RequestContext({[k]: true}); }).throw(`Attribute ${k} must be of type "object"`);
    });
  });
});

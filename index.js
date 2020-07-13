module.exports.Request = require('./lib/request');
const { RequestInput } = require('./lib/models/requestInput');
const { RequestContext } = require('./lib/models/requestContext');
const { RequestResponse } = require('./lib/models/requestResponse');
const { Request } = require('./lib/request');

module.exports = {
  models: {
    Request,
    RequestInput,
    RequestContext,
    RequestResponse
  },
  errors: require('./lib/errors')
};

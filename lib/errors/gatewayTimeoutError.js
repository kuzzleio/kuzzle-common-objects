const KuzzleError = require('./kuzzleError');

class GatewayTimeoutError extends KuzzleError {
  constructor (message) {
    super(message, 504);
  }

  get name () {
    return 'GatewayTimeoutError';
  }
}

module.exports = GatewayTimeoutError;

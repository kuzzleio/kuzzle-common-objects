const KuzzleError = require('./kuzzleError');

class GatewayTimeoutError extends KuzzleError {
  constructor(message, errorName, code) {
    super(message, 504, errorName, code);
  }

  get name () {
    return 'GatewayTimeoutError';
  }
}

module.exports = GatewayTimeoutError;

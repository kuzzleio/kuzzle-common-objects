const { KuzzleError } = require('./kuzzleError');

class GatewayTimeoutError extends KuzzleError {
  constructor(message, id, code) {
    super(message, 504, id, code);
  }
}

module.exports = GatewayTimeoutError;

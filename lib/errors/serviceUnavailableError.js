const KuzzleError = require('./kuzzleError');

class ServiceUnavailable extends KuzzleError {
  constructor (message) {
    super(message, 503);
  }

  get name () {
    return 'ServiceUnavailable';
  }
}

module.exports = ServiceUnavailable;

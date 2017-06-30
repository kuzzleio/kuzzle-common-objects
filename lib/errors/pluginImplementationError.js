const KuzzleError = require('./kuzzleError');

class PluginImplementationError extends KuzzleError {
  constructor (message) {
    super(message, 500);
    this.message += '\nThis is probably not a Kuzzle error, but a problem with a plugin implementation.';
  }

  get name () {
    return 'PluginImplementationError';
  }
}

module.exports = PluginImplementationError;

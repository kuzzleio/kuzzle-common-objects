const KuzzleError = require('./kuzzleError');

class PluginImplementationError extends KuzzleError {
  constructor(message, errorName, code) {
    super(message, 500, errorName, code);
    this.message += '\nThis is probably not a Kuzzle error, but a problem with a plugin implementation.';
  }

  get name () {
    return 'PluginImplementationError';
  }
}

module.exports = PluginImplementationError;

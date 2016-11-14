module.exports = {
  badRequestError: require('./badRequestError'),
  forbiddenError: require('./forbiddenError'),
  gatewayTimeoutError: require('./gatewayTimeoutError'),
  internalError: require('./internalError'),
  kuzzleError: require('./kuzzleError'),
  notFoundError: require('./notFoundError'),
  parseError: require('./parseError'),
  partialError: require('./partialError'),
  pluginImplementationError: require('./pluginImplementationError'),
  serviceUnavailableError: require('./serviceUnavailableError'),
  sizeLimitError: require('./sizeLimitError'),
  unauthorizedError: require('./unauthorizedError')
};

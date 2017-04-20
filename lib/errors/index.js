module.exports = {
  BadRequestError: require('./badRequestError'),
  ExternalServiceError: require('./externalServiceError'),
  ForbiddenError: require('./forbiddenError'),
  GatewayTimeoutError: require('./gatewayTimeoutError'),
  InternalError: require('./internalError'),
  KuzzleError: require('./kuzzleError'),
  NotFoundError: require('./notFoundError'),
  ParseError: require('./parseError'),
  PartialError: require('./partialError'),
  PluginImplementationError: require('./pluginImplementationError'),
  ServiceUnavailableError: require('./serviceUnavailableError'),
  SizeLimitError: require('./sizeLimitError'),
  UnauthorizedError: require('./unauthorizedError')
};

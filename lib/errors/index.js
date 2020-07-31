module.exports = {
  KuzzleError: require('./kuzzleError').KuzzleError,
  BadRequestError: require('./badRequestError').BadRequestError,
  ExternalServiceError: require('./externalServiceError').ExternalServiceError,
  ForbiddenError: require('./forbiddenError').ForbiddenError,
  GatewayTimeoutError: require('./gatewayTimeoutError').GatewayTimeoutError,
  InternalError: require('./internalError').InternalError,
  NotFoundError: require('./notFoundError').NotFoundError,
  ParseError: require('./parseError').ParseError,
  PartialError: require('./partialError').PartialError,
  PluginImplementationError: require('./pluginImplementationError').PluginImplementationError,
  ServiceUnavailableError: require('./serviceUnavailableError').ServiceUnavailableError,
  SizeLimitError: require('./sizeLimitError').SizeLimitError,
  UnauthorizedError: require('./unauthorizedError').UnauthorizedError,
  PreconditionError: require('./preconditionError').PreconditionError,
  TooManyRequestsError: require('./tooManyRequestsError').TooManyRequestsError
};

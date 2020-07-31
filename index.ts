import * as ImportRequestInput from './lib/models/requestInput';
import * as ImportRequestContext from './lib/models/requestContext';
import * as ImportRequestResponse from './lib/models/requestResponse';
import * as ImportRequest from './lib/request';

import * as ImportKuzzleError from './lib/errors/kuzzleError';
import * as ImportUnauthorizedError from 'lib/errors/unauthorizedError';
import * as ImportTooManyRequestsError from 'lib/errors/tooManyRequestsError';
import * as ImportSizeLimitError from 'lib/errors/sizeLimitError';
import * as ImportServiceUnavailableError from 'lib/errors/serviceUnavailableError';
import * as ImportPreconditionError from 'lib/errors/preconditionError';
import * as ImportPluginImplementationError from 'lib/errors/pluginImplementationError';
import * as ImportPartialError from 'lib/errors/partialError';
import * as ImportNotFoundError from 'lib/errors/notFoundError';
import * as ImportInternalError from 'lib/errors/internalError';
import * as ImportGatewayTimeoutError from 'lib/errors/gatewayTimeoutError';
import * as ImportForbiddenError from 'lib/errors/forbiddenError';
import * as ImportExternalServiceError from 'lib/errors/externalServiceError';
import * as ImportBadRequestError from 'lib/errors/badRequestError';

export namespace models {
  export class Request extends ImportRequest.Request {}
  export class RequestResponse extends ImportRequestResponse.RequestResponse {}
  export class RequestContext extends ImportRequestContext.RequestContext {}
  export class RequestInput extends ImportRequestInput.RequestInput {}
}

export namespace errors {
  export class KuzzleError extends ImportKuzzleError.KuzzleError {}
  export class UnauthorizedError extends ImportUnauthorizedError.UnauthorizedError {}
  export class TooManyRequestsError extends ImportTooManyRequestsError.TooManyRequestsError {}
  export class SizeLimitError extends ImportSizeLimitError.SizeLimitError {}
  export class ServiceUnavailableError extends ImportServiceUnavailableError.ServiceUnavailableError {}
  export class PreconditionError extends ImportPreconditionError.PreconditionError {}
  export class PluginImplementationError extends ImportPluginImplementationError.PluginImplementationError {}
  export class PartialError extends ImportPartialError.PartialError {}
  export class NotFoundError extends ImportNotFoundError.NotFoundError {}
  export class InternalError extends ImportInternalError.InternalError {}
  export class GatewayTimeoutError extends ImportGatewayTimeoutError.GatewayTimeoutError {}
  export class ForbiddenError extends ImportForbiddenError.ForbiddenError {}
  export class ExternalServiceError extends ImportExternalServiceError.ExternalServiceError {}
  export class BadRequestError extends ImportBadRequestError.BadRequestError {}
}

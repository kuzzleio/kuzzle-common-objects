import { RequestInput } from './lib/models/requestInput';
import { RequestContext } from './lib/models/requestContext';
import { RequestResponse } from './lib/models/requestResponse';
import { Request } from './lib/request';
import * as kuzzleErrors from './lib/errors';

export const models = {
  Request,
  RequestInput,
  RequestContext,
  RequestResponse
};

export const errors = kuzzleErrors;

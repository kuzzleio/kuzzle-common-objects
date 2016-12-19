[![Build Status](https://travis-ci.org/kuzzleio/kuzzle-common-objects.svg?branch=master)](https://travis-ci.org/kuzzleio/kuzzle-common-objects)
[![codecov](https://codecov.io/gh/kuzzleio/kuzzle-common-objects/branch/master/graph/badge.svg)](https://codecov.io/gh/kuzzleio/kuzzle-common-objects)

# Kuzzle common objects

Common objects shared to various Kuzzle components and plugins.

**Table of contents:**

  - [`Request`](#request)
    - [`new Request(data, [options])`](#new-requestdata-options)
    - [Attributes](#attributes)
    - [Methods](#methods)
      - [`serialize()`](#serialize)
      - [`setError(error)`](#seterrorerror)
      - [`setResult(result, [options = null])`](#setresultresult-options--null)
    - [Example](#example)
  - [`RequestResponse`](#requestresponse)
    - [Attributes](#attributes-1)
    - [Methods](#methods-1)
      - [`getHeader(name)`](#getheadername)
      - [`getHeaders()`](#getheaders)
      - [`removeHeader(name)`](#removeheadername)
      - [`setHeader(name, value)`](#setheadername-value)
  - [`models.RequestContext`](#modelsrequestcontext)
    - [`new RequestContext([options])`](#new-requestcontextoptions)
    - [Attributes](#attributes-2)
  - [`models.RequestInput`](#modelsrequestinput)
    - [`new RequestInput(data)`](#new-requestinputdata)
    - [Attributes](#attributes-3)
  - [`errors.KuzzleError`](#errorskuzzleerror)
  - [`errors.BadRequestError`](#errorsbadrequesterror)
  - [`errors.ForbiddenError`](#errorsforbiddenerror)
  - [`errors.GatewayTimeoutError`](#errorsgatewaytimeouterror)
  - [`errors.InternalError`](#errorsinternalerror)
  - [`errors.NotFoundError`](#errorsnotfounderror)
  - [`errors.ParseError`](#errorsparseerror)
  - [`errors.PartialError`](#errorspartialerror)
  - [`errors.PluginImplementationError`](#errorspluginimplementationerror)
  - [`errors.ServiceUnavailableError`](#errorsserviceunavailableerror)
  - [`errors.SizeLimitError`](#errorssizelimiterror)
  - [`errors.UnauthorizedError`](#errorsunauthorizederror)

## `Request`

This constructor is used to transform an [API request](http://kuzzle.io/api-reference/?websocket#common-attributes) into a standardized Kuzzle request.

### `new Request(data, [options])`

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`data`|`object`| Passed to [RequestInput](#modelsrequestinput) constructor |
| `options` | `object` | Optional initialization parameters |

`options` may contain the following attributes:

| Name | Type | Description                      |
|------|------|----------------------------------|
| `connectionId` | `string` | Passed to [RequestContext](#modelsrequestcontext) constructor |
| `error` | `KuzzleError` or `Error` | Invokes [setError](#seterrorerror) at initialization |
| `protocol` | `string` | Passed to [RequestContext](#modelsrequestcontext) constructor |
| `requestId` | `string` | Initializes the `id` property |
| `result` | *(varies)* | Invokes [setResult](#setresultresult-options--null) at initialization |
| `status` | `integer` | HTTP error code |
| `token` | `object` | Passed to [RequestContext](#modelsrequestcontext) constructor |
| `user` | `object` | Passed to [RequestContext](#modelsrequestcontext) constructor |

### Attributes

**Read-only**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `timestamp` | integer | Request creation timestamp |

**Writable**

| Name | Type | default | Description                      |
|------|------|---------|----------------------------------|
| `context` | `RequestContext` | [RequestContext](#modelsrequestcontext) object | Request connection context |
| `error` | `KuzzleError` | `null` | Request error, if any |
| `id` | `string` | Auto-generated UUID | Request unique identifier |
| `input` | `RequestInput` | [RequestInput](#modelsrequestinput) object | Request's parameters |
| `result` | *(varies)* | `null` | Request result, if any |
| `status` | `integer` | `102` | HTTP status code |

Any undefined attribute from the list above will be set to null.

Please refer to our [API Reference](http://kuzzle.io/api-reference/?websocket) for a complete list of controllers-actions and their purposes.

**Getters**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `response` | `RequestResponse` | Response view of the request, standardized as the expected [Kuzzle API response](http://kuzzle.io/api-reference/?websocket#kuzzle-response) |

### Methods

#### `serialize()`

Serializes the `Request` object into a pair of POJOs that can be sent across the network, and then used to rebuild another equivalent `Request` object.

**Example**

```js
let foo = request.serialize();
let bar = new Request(foo.data, foo.options);
```

#### `setError(error)`

Adds an error to the request, and sets the request's status to the error one.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `error` | `KuzzleError` or `Error` | Error object to set |

If a `KuzzleError` is provided, the request's status attribute is set to the error one.

Otherwise, the provided error is encapsulated into a [InternalError](#errorsinternalerror) object, and the request's status is set to 500.

#### `setResult(result, [options = null])`

Sets the request's result.
 
**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `result` | *(varies)* | Request's result |
| `options` | `object` | Optional parameters |

The `options` argument may contain the following properties:

| Name | Type | Description                      | Default |
|------|------|----------------------------------|---------|
| `status` | `integer` | HTTP status code | `200` |
| `headers` | `object` | Protocol specific headers | `null` |
| `raw` | `boolean` | Asks Kuzzle to send the provided result directly, instead of encapsulating it in a Kuzzle response | `false` |

### Example

```js
const Request = require('kuzzle-common-objects').Request;

let request = new Request({
  controller: 'write',
  action: 'create',
  index: 'foo',
  collection: 'bar',
  _id: 'some document ID',
  body: {
    document: 'content'
  },
  metadata: {
    some: 'volatile data'
  },
  foo: 'bar'
});

console.dir(request.serialize(), {depth: null});
```

Result:

```
{ data: 
   { timestamp: 1482143102957,
     requestId: '26d4ec6d-aafb-4ef8-951d-47666e5cf3ba',
     jwt: null,
     metadata: { some: 'volatile data' },
     body: { document: 'content' },
     controller: 'write',
     action: 'create',
     index: 'foo',
     collection: 'bar',
     _id: 'some document ID',
     foo: 'bar' },
  options: 
   { connectionId: null,
     protocol: null,
     result: null,
     error: null,
     status: 102 } }
```

## `RequestResponse`

This object is not exposed and can only be retrieved using the `Request.response` getter.

Network protocol specific headers can be added to the response. If the protocol can handle them, these headers will be used to configure the response sent to the client.    
As Kuzzle supports the HTTP protocol natively, this object handles HTTP headers special cases. Other network protocols headers are stored in raw format, and protocol plugins need to handle their own specific headers manually.

Header names are case insensitive.

**Example**

```
if (request.context.protocol === 'http') {
  request.response.setHeader('Content-Type', 'text/plain');
}
```

### Attributes

**Writable**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `action` | `string` | Parent request invoked controller action |
| `collection` | `string` | Parent request data collection |
| `controller` | `string` | Parent request invoked controller |
| `error` | `KuzzleError` | Response error, or `null` |
| `metadata` | `object` | Parent request metadata |
| `index` | `string` | Parent request data index |
| `requestId` | `string` | Parent request unique identifier |
| `result` | `*` | Response result, or `null` |
| `status` | `integer` | Response HTTP status code |

### Methods

#### `getHeader(name)`

Returns the value registered for the response header `name`

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `name` | `string` | Header name |

#### `getHeaders()`

Returns an object describing all currently registered headers on that response.

**Example**

```
if (request.context.protocol === 'http') {
  request.response.setHeader('Content-Type', 'text/plain');
  
  /*
    Prints:
    { "Content-Type": "text/plain" }
   */
  console.log(request.response.getHeaders());
}
```

#### `removeHeader(name)`

Removes header `name` from the response headers.

#### `setHeader(name, value)`

Adds a header `name` with value `value` to the response headers.

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `name` | `string` | Header name |
| `value` | `string` | Header value |

For standard headers, if `name` already exists, then the provided `value` will be concatenated to the existing value, separated by a comma.  

As Kuzzle implements HTTP natively, this behavior changes for some HTTP specific headers, to comply with the norm. For instance `set-cookie` values are amended in an array, and other headers like `user-agent` or `host` can store only 1 value. 


## `models.RequestContext`

This constructor is used to create a connection context used by `Request`.
 
### `new RequestContext([options])`

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
| `options` | `object` | Optional initialization parameters |

`options` may contain the following attributes:

| Name | Type | Description                      |
|------|------|----------------------------------|
| `connectionId` | `string` | Client's connection unique ID |
| `protocol` | `string` | Network protocol name |
| `token` | `object` | Kuzzle internal authorization token object |
| `user` | `object` | Kuzzle internal user info object |

### Attributes

| Name | Type | Description                      |
|------|------|----------------------------------|
| `connectionId` | `string` | Client's connection unique ID |
| `protocol` | `string` | Network protocol name |
| `token` | `object` | Kuzzle internal authorization token object |
| `user` | `object` | Kuzzle internal user info object |

## `models.RequestInput`

Contains the request's input data 

### `new RequestInput(data)`

**Arguments**

| Name | Type | Description                      |
|------|------|----------------------------------|
|`data`|`object`| Standardized API request (see Websocket requests for instance) |

`data` may contain some or all of the following attributes:

| Name | Type | Description                      |
|------|------|----------------------------------|
|`_id`|`string`| Document unique identifier |
|`action`|`string`| Kuzzle action to perform |
|`body`|`object`| Contains request specific data (document content, search queries, ...) |
|`collection` |`string` | Data collection |
|`controller` |`string`| Kuzzle controller handling the action to perform |
|`index` |`string`| Data index |
|`metadata`|`object`| Client's request specific metadata |
|`jwt`|`string`| JWT Authentication token |

Other attributes may be defined and will automatically be added to the `args` object.

### Attributes

**Read-only**

The following attributes can be set after the object has been built, but once set, they cannot be changed:

| Name | Type | Default | Description                      |
|------|------|---------|----------------------------------|
| `action` | `string` | `null` | Controller's action to execute |
| `controller` | `string` | `null` | Kuzzle's controller to invoke |

**Writable**

| Name | Type | Default | Description                      |
|------|------|---------|----------------------------------|
| `args` | `object` | *(empty)* | Contains specific request arguments |
| `body` | `object` | `null` | Request's body (for instance, the content of a document) |
| `metadata` | `object` | `null` | Request [metadata](http://kuzzle.io/api-reference/?websocket#sending-metadata) |
| `resource._id` | `string` | `null` | Document unique identifier |
| `resource.collection` | `string` | `null` | Data collection |
| `resource.index` | `string` | `null` | Data index |
| `jwt` | `string` | `null` | JWT Authentication token |

## `errors.KuzzleError`

Inherits from `Error`. Abstract class inherited by Kuzzle error objects.

This class should only be used to create new Kuzzle error objects.

## `errors.BadRequestError`

**Status Code:** `400`

Used to notify about badly formed requests.

```js
const errors = require('kuzzle-common-objects').errors;

let err = new errors.BadRequestError('error message');
```

## `errors.ForbiddenError`

**Status Code:** `403`

Used when a user tries to use resources beyond his access rights.

```js
const errors = require('kuzzle-common-objects').errors;

let err = new errors.ForbiddenError('error message');
```

## `errors.GatewayTimeoutError`

**Status Code:** `504`

Used when a plugin takes too long to perform a task.

```js
const errors = require('kuzzle-common-objects').errors;

let err = new errors.GatewayTimeoutError('error message');
```

## `errors.InternalError`

**Status Code:** `500`

Standard generic error. Used mainly for uncatched exceptions.

```js
const errors = require('kuzzle-common-objects').errors;

let err = new errors.InternalError('error message');
```

## `errors.NotFoundError`

**Status Code:** `404`

Used when asked resources cannot be found.

```js
const errors = require('kuzzle-common-objects').errors;

let err = new errors.NotFoundError('error message');
```

## `errors.ParseError`

**Status Code:** `400`

Used when a provided resource cannot be interpreted.

```js
const errors = require('kuzzle-common-objects').errors;

let err = new errors.ParseError('error message');
```

## `errors.PartialError`

**Status Code:** `206`

Used when a request only partially succeeded.

The constructor takes an additional `array` argument containing a list of failed parts.

```js
const errors = require('kuzzle-common-objects').errors;

let err = new errors.PartialError('error message', [{this: 'failed'}, {andThis: 'failed too'}]);
```


## `errors.PluginImplementationError`

**Status Code:** `500`

Used when a plugin fails.

```js
const errors = require('kuzzle-common-objects').errors;

let err = new errors.PluginImplementationError('error message');
```

## `errors.ServiceUnavailableError`

**Status Code:** `503`

Used when a service cannot respond because it is temporarily unavailable.

```js
const errors = require('kuzzle-common-objects').errors;

let err = new errors.ServiceUnavailableError('error message');
```

## `errors.SizeLimitError`

**Status Code:** `413`

Used to notify about requests exceeding maximum limits.

```js
const errors = require('kuzzle-common-objects').errors;

let err = new errors.SizeLimitError('error message');
```

## `errors.UnauthorizedError`

**Status Code:** `401`

Used when a user fails a login attempt.

```js
const errors = require('kuzzle-common-objects').errors;

let err = new errors.UnauthorizedError('error message');
```

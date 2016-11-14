[![Build Status](https://travis-ci.org/kuzzleio/kuzzle-common-objects.svg?branch=master)](https://travis-ci.org/kuzzleio/kuzzle-common-objects)
[![codecov](https://codecov.io/gh/kuzzleio/kuzzle-common-objects/branch/master/graph/badge.svg)](https://codecov.io/gh/kuzzleio/kuzzle-common-objects)

# Kuzzle common objects

Common objects shared to various Kuzzle components and plugins.

# Table of content

- [`Models.RequestObject`](#modelsrequestobject)
    - [`RequestObject(data)`](#requestobjectdata)
      - [Arguments](#arguments)
      - [RequestObject attributes](#requestobject-attributes)
      - [Example](#example)
- [`Models.ResponseObject`](#modelsresponseobject)
    - [`ResponseObject(requestObject, responseData)`](#responseobjectrequestobject-responsedata)
      - [Arguments](#arguments-1)
      - [ResponseObject attributes](#responseobject-attributes)
    - [`toJson()`](#tojson)
    - [Example](#example-1)
- [`Errors.badRequestError`](#errorsbadrequesterror)
- [`Errors.forbiddenError`](#errorsforbiddenerror)
- [`Errors.gatewayTimeoutError`](#errorsgatewaytimeouterror)
- [`Errors.internalError`](#errorsinternalerror)
- [`Errors.notFoundError`](#errorsnotfounderror)
- [`Errors.parseError`](#errorsparseerror)
- [`Errors.partialError`](#errorspartialerror)
- [`Errors.pluginImplementationError`](#errorspluginimplementationerror)
- [`Errors.serviceUnavailableError`](#errorsserviceunavailableerror)
- [`Errors.sizeLimitError`](#errorssizelimiterror)
- [`Errors.unauthorizedError`](#errorsunauthorizederror)


## `Models.RequestObject`

This constructor is used to transform an [API request](http://kuzzle.io/api-reference/?websocket#common-attributes) into a standardized Kuzzle request.

#### `RequestObject(data)`

##### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
|`data`|`object`| Data containing the necessary attributes to perform an API request |

Where `data` may contain some or all of the following attributes:

| Name | Type | Description                      |
|------|------|----------------------------------|
|`action`|`string`| Kuzzle action to perform |
|`collection` |`string` | Data collection |
|`controller` |`string`| Kuzzle controller handling the action to perform |
|`_id`|`string`| Document unique identifier |
|`body`|`object`| Contains request specific data (document content, search queries, ...) |
|`index` |`string`| Data index |
|`metadata`|`object`| Contains request specific metadata |
|`timestamp`|`integer`| Request timestamp |


##### RequestObject attributes

| Name | Type | Description                      |
|------|------|----------------------------------|
|`RequestObject.action`|`string`| Kuzzle action to perform |
|`RequestObject.collection` |`string` | Data collection |
|`RequestObject.controller` |`string`| Kuzzle controller handling the action to perform |
|`RequestObject.data._id`|`string`| Document unique identifier |
|`RequestObject.data.body`|`object`| Contains request specific data (document content, search queries, ...) |
|`RequestObject.index` |`string`| Data index |
|`RequestObject.metadata`|`object`| Contains request specific metadata |
|`RequestObject.timestamp`|`integer`| Request timestamp |


Please refer to our [API Reference](http://kuzzle.io/api-reference/?websocket) for a complete list of controllers-actions and their purposes.

##### Example

```js
var RequestObject = require('kuzzle-common-objects').Models.requestObject;

var requestObject = new RequestObject({
  controler: 'write',
  action: 'create',
  index: 'foo',
  collection: 'bar',
  _id: 'some document ID',
  body: {
    document: 'content'
  },
  metadata: {
    some: 'volatile data'
  }
});
```

## `Models.ResponseObject`

This constructor creates a standardized Kuzzle Response object from a `RequestObject` and response data.

#### `ResponseObject(requestObject, responseData)`

##### Arguments

| Name | Type | Description                      |
|------|------|----------------------------------|
|`requestObject`|`RequestObject object`| The request object that generated the response data |
|`responseData`|`object`| Plain-old JSON object containing the request's results |

##### ResponseObject attributes

| Name | Type | Description                      |
|------|------|----------------------------------|
|`action`|`string`| Kuzzle action to perform |
|`collection` |`string` | Data collection |
|`controller` |`string`| Kuzzle controller handling the action to perform |
|`data._id`|`string`| Document unique identifier |
|`data.body`|`object`| Contains response data (document content, search results, ...) |
|`error`|`Error object`| In case of error, contains the error object |
|`index` |`string`| Data index |
|`metadata`|`object`| Contains request specific metadata |
|`status`|`integer`| Request status, using [HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) |
|`timestamp`|`integer`| Request timestamp |


#### `toJson()`

Transforms the `ResponseObject` object into a plain-old JSON object following [Kuzzle standard response format](http://kuzzle.io/api-reference/?websocket#kuzzle-response)

#### Example

```js
var ResponseObject = require('kuzzle-common-objects').Models.responseObject;

var responseObject = new ResponseObject(requestObject, {response: 'data'});
```

## `Errors.badRequestError`

**Status Code:** `400`

Used to notify about badly formed requests.

```js
var err = new require('kuzzle-common-objects').Errors.badRequestError('error message');
```

## `Errors.forbiddenError`

**Status Code:** `403`

Used when a user tries to use resources beyond his access rights.

```js
var err = new require('kuzzle-common-objects').Errors.forbiddenError('error message');
```

## `Errors.gatewayTimeoutError`

**Status Code:** `504`

Used when a plugin takes too long to perform a task.

```js
var err = new require('kuzzle-common-objects').Errors.gatewayTimeoutError('error message');
```

## `Errors.internalError`

**Status Code:** `500`

Standard generic error. Used for uncatched exceptions.

```js
var err = new require('kuzzle-common-objects').Errors.internalError('error message');
```

## `Errors.notFoundError`

**Status Code:** `404`

Used when asked resources cannot be found.

```js
var err = new require('kuzzle-common-objects').Errors.notFoundError('error message');
```

## `Errors.parseError`

**Status Code:** `400`

Used when a provided resource cannot be interpreted.

```js
var err = new require('kuzzle-common-objects').Errors.parseError('error message');
```

## `Errors.partialError`

**Status Code:** `206`

Used when a request only partially succeeded.

The constructor takes an additional `array` argument containing a list of failed parts.

```js
var err = new require('kuzzle-common-objects').Errors.partialError('error message', [{this: 'failed'}, {andThis: 'failed too'}]);
```


## `Errors.pluginImplementationError`

**Status Code:** `500`

Used when a plugin fails.

```js
var err = new require('kuzzle-common-objects').Errors.pluginImplementationError('error message');
```

## `Errors.serviceUnavailableError`

**Status Code:** `503`

Used when a resource cannot respond because it is temporarily unavailable.

```js
var err = new require('kuzzle-common-objects').Errors.serviceUnavailableError('error message');
```

## `Errors.sizeLimitError`

**Status Code:** `413`

Used to notify about requests exceeding maximum limits.

```js
var err = new require('kuzzle-common-objects').Errors.sizeLimitError('error message');
```

## `Errors.unauthorizedError`

**Status Code:** `401`

Used when a user fails a login attempt.

```js
var err = new require('kuzzle-common-objects').Errors.unauthorizedError('error message');
```

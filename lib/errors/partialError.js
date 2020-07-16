const { KuzzleError } = require('./kuzzleError');

class PartialError extends KuzzleError {
  constructor(message, body, id, code) {
    if (code === undefined && typeof id === 'number') {
      code = id;
      id = body;
      body = [];
    }
    else if (body === undefined) {
      body = [];
    }

    super(message, 206, id, code);

    this.errors = body;
    this.count = body.length;
  }

  toJSON () {
    const serialized = super.toJSON();

    serialized.errors = this.errors;
    serialized.count = this.count;

    return serialized;
  }
}

module.exports = PartialError;

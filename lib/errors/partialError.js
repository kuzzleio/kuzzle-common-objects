"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialError = void 0;
const kuzzleError_1 = require("./kuzzleError");
class PartialError extends kuzzleError_1.KuzzleError {
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
    toJSON() {
        const serialized = super.toJSON();
        serialized.errors = this.errors;
        serialized.count = this.count;
        return serialized;
    }
}
exports.PartialError = PartialError;
//# sourceMappingURL=partialError.js.map
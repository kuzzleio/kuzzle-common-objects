"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const kuzzleError_1 = require("./kuzzleError");
class NotFoundError extends kuzzleError_1.KuzzleError {
    constructor(message, id, code) {
        super(message, 404, id, code);
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=notFoundError.js.map
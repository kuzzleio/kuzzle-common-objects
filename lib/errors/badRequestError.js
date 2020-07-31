"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const kuzzleError_1 = require("./kuzzleError");
class BadRequestError extends kuzzleError_1.KuzzleError {
    constructor(message, id, code) {
        super(message, 400, id, code);
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=badRequestError.js.map
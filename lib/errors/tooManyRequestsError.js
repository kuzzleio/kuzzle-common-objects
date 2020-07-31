"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooManyRequestsError = void 0;
const kuzzleError_1 = require("./kuzzleError");
class TooManyRequestsError extends kuzzleError_1.KuzzleError {
    constructor(message, id, code) {
        super(message, 429, id, code);
    }
}
exports.TooManyRequestsError = TooManyRequestsError;
//# sourceMappingURL=tooManyRequestsError.js.map
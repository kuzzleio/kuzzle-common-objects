"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreconditionError = void 0;
const kuzzleError_1 = require("./kuzzleError");
class PreconditionError extends kuzzleError_1.KuzzleError {
    constructor(message, id, code) {
        super(message, 412, id, code);
    }
}
exports.PreconditionError = PreconditionError;
//# sourceMappingURL=preconditionError.js.map
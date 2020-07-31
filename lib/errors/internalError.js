"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = void 0;
const kuzzleError_1 = require("./kuzzleError");
class InternalError extends kuzzleError_1.KuzzleError {
    constructor(message, id, code) {
        super(message, 500, id, code);
    }
}
exports.InternalError = InternalError;
//# sourceMappingURL=internalError.js.map
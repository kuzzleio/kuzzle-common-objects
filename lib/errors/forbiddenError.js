"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
const kuzzleError_1 = require("./kuzzleError");
class ForbiddenError extends kuzzleError_1.KuzzleError {
    constructor(message, id, code) {
        super(message, 403, id, code);
    }
}
exports.ForbiddenError = ForbiddenError;
//# sourceMappingURL=forbiddenError.js.map
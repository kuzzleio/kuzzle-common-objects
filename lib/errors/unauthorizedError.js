"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const kuzzleError_1 = require("./kuzzleError");
class UnauthorizedError extends kuzzleError_1.KuzzleError {
    constructor(message, id, code) {
        super(message, 401, id, code);
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=unauthorizedError.js.map
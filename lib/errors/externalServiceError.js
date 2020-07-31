"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalServiceError = void 0;
const kuzzleError_1 = require("./kuzzleError");
class ExternalServiceError extends kuzzleError_1.KuzzleError {
    constructor(message, id, code) {
        super(message, 500, id, code);
    }
}
exports.ExternalServiceError = ExternalServiceError;
//# sourceMappingURL=externalServiceError.js.map
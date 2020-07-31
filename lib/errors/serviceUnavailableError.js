"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUnavailableError = void 0;
const kuzzleError_1 = require("./kuzzleError");
class ServiceUnavailableError extends kuzzleError_1.KuzzleError {
    constructor(message, id, code) {
        super(message, 503, id, code);
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
//# sourceMappingURL=serviceUnavailableError.js.map
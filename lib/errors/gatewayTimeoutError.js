"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayTimeoutError = void 0;
const kuzzleError_1 = require("./kuzzleError");
class GatewayTimeoutError extends kuzzleError_1.KuzzleError {
    constructor(message, id, code) {
        super(message, 504, id, code);
    }
}
exports.GatewayTimeoutError = GatewayTimeoutError;
//# sourceMappingURL=gatewayTimeoutError.js.map
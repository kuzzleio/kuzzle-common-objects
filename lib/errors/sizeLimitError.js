"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeLimitError = void 0;
const kuzzleError_1 = require("./kuzzleError");
class SizeLimitError extends kuzzleError_1.KuzzleError {
    constructor(message, id, code) {
        super(message, 413, id, code);
    }
}
exports.SizeLimitError = SizeLimitError;
//# sourceMappingURL=sizeLimitError.js.map
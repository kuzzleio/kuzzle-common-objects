"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseError = void 0;
const kuzzleError_1 = require("./kuzzleError");
/**
 * @deprecated since Kuzzle 1.4.1, BadRequestError should be used instead
 */
class ParseError extends kuzzleError_1.KuzzleError {
    constructor(message, id, code) {
        super(message, 400, id, code);
    }
}
exports.ParseError = ParseError;
//# sourceMappingURL=parseError.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginImplementationError = void 0;
const kuzzleError_1 = require("./kuzzleError");
class PluginImplementationError extends kuzzleError_1.KuzzleError {
    constructor(message, id, code) {
        super(message, 500, id, code);
        this.message += '\nThis is probably not a Kuzzle error, but a problem with a plugin implementation.';
    }
}
exports.PluginImplementationError = PluginImplementationError;
//# sourceMappingURL=pluginImplementationError.js.map
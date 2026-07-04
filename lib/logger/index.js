"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formats = void 0;
const flat_1 = require("flat");
const logfmt_1 = __importDefault(require("logfmt"));
const verror_1 = require("verror");
const winston_1 = require("winston");
const { combine, timestamp, label, printf, colorize, json } = winston_1.format;
const maskData = __importStar(require("maskdata"));
const LOG_FORMAT = process.env.LOG_FORMAT;
const LOG_MAX_DEPTH = process.env.LOG_MAX_DEPTH;
const LOG_SILENT = process.env.LOG_SILENT;
const LOG_MASK_SYMBOL = process.env.LOG_MASK_SYMBOL;
const LOG_LEVEL = process.env.LOG_LEVEL;
const logFormat = (LOG_FORMAT ?? 'logfmt');
const maxDepth = (LOG_MAX_DEPTH ? parseInt(LOG_MAX_DEPTH) : 3);
const silent = (LOG_SILENT || false);
const maskSymbol = (LOG_MASK_SYMBOL ?? '*');
const formats = (tag) => {
    return {
        logfmt: combine(label({ label: tag }), timestamp(), colorize(), printf((info) => {
            const { timestamp, label, level, message, ...data } = info;
            const logData = { ...data['data'], stacktrace: data['stacktrace'] };
            Object.keys(logData).forEach((key) => logData[key] === undefined && delete logData[key]);
            const logOptions = { maxDepth };
            return `[${timestamp}] ${message} level=${level} label=${label} ${logfmt_1.default.stringify((0, flat_1.flatten)(logData, logOptions))}`;
        })),
        json: combine(label({ label: tag }), timestamp(), json()),
    };
};
exports.formats = formats;
const maskRequestData = (input, maskedFields) => {
    const maskJSONOptions = {
        genericStrings: [{ fields: maskedFields, config: { maskWith: maskSymbol } }],
    };
    return maskData.maskJSON2(input, maskJSONOptions);
};
const logger = (tag, loggerLevel) => {
    const level = (loggerLevel ?? LOG_LEVEL ?? 'debug');
    const taggedFormats = (0, exports.formats)(tag);
    const format = logFormat === 'logfmt' ? taggedFormats.logfmt : taggedFormats.json;
    const log = (0, winston_1.createLogger)({
        level,
        format,
        transports: [new winston_1.transports.Console()],
        silent,
    });
    const error = (message, err, data, maskedFields) => {
        const stacktrace = verror_1.VError.fullStack(err);
        data = maskedFields ? maskRequestData(data, maskedFields) : data;
        log.error(message, { data, stacktrace });
    };
    const info = (message, data, maskedFields) => {
        data = maskedFields ? maskRequestData(data, maskedFields) : data;
        log.info(message, { data });
    };
    const debug = (message, data, maskedFields) => {
        data = maskedFields ? maskRequestData(data, maskedFields) : data;
        log.debug(message, { data });
    };
    return { debug, info, error };
};
exports.default = logger;
//# sourceMappingURL=index.js.map
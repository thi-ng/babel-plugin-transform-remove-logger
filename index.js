"use strict";

const ti = require("thing-iterators");

function makePatterns(levels) {
    return [...ti.mapcat((p) => [`*.LOGGER.${p}`, `LOGGER.${p}`, `*.logger.${p}`, `logger.${p}`], levels)];
}


exports.__esModule = true;

exports.default = function () {
    const patterns = makePatterns((process.env.LOG_LEVELS || "fine").split(","));
    return {
        visitor: {
            CallExpression: function CallExpression(path) {
                const callee = path.get("callee");
                if (ti.some((p) => callee.matchesPattern(p, true), patterns)) {
                    path.remove();
                }
            }
        }
    };
};

module.exports = exports["default"];
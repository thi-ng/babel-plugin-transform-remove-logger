"use strict";

const ti = require("thing-iterators");

function makePatterns(levels) {
    return [...ti.mapcat((p) => [`*.LOGGER.${p}`, `LOGGER.${p}`, `*.logger.${p}`, `logger.${p}`], levels)];
}

exports.__esModule = true;

exports.default = function () {
    return {
        visitor: {
            CallExpression(path, state) {
                if (!this.patterns) {
                    this.patterns = makePatterns((state.opts.levels || "fine,debug").split(","));
                }
                const callee = path.get("callee");
                if (ti.some((p) => callee.matchesPattern(p, true), this.patterns)) {
                    if (path.parent.type !== "ConditionalExpression") {
                        path.remove();
                    } else {
                        path.replaceWithSourceString("undefined");
                    }
                }
            }
        },
    };
};

module.exports = exports["default"];

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMasonryUtilityClass = getMasonryUtilityClass;
exports.default = void 0;

var _core = require("@mui/core");

function getMasonryUtilityClass(slot) {
  return (0, _core.generateUtilityClass)('MuiMasonry', slot);
}

const masonryClasses = (0, _core.generateUtilityClasses)('MuiMasonry', ['root']);
var _default = masonryClasses;
exports.default = _default;
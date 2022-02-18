"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMasonryItemUtilityClass = getMasonryItemUtilityClass;
exports.default = void 0;

var _core = require("@mui/core");

function getMasonryItemUtilityClass(slot) {
  return (0, _core.generateUtilityClass)('MuiMasonryItem', slot);
}

const masonryItemClasses = (0, _core.generateUtilityClasses)('MuiMasonryItem', ['root']);
var _default = masonryItemClasses;
exports.default = _default;
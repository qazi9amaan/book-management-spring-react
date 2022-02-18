"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimelineSeparatorUtilityClass = getTimelineSeparatorUtilityClass;
exports.default = void 0;

var _core = require("@mui/core");

function getTimelineSeparatorUtilityClass(slot) {
  return (0, _core.generateUtilityClass)('MuiTimelineSeparator', slot);
}

const timelineSeparatorClasses = (0, _core.generateUtilityClasses)('MuiTimelineSeparator', ['root']);
var _default = timelineSeparatorClasses;
exports.default = _default;
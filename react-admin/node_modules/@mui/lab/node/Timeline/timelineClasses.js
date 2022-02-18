"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimelineUtilityClass = getTimelineUtilityClass;
exports.default = void 0;

var _core = require("@mui/core");

function getTimelineUtilityClass(slot) {
  return (0, _core.generateUtilityClass)('MuiTimeline', slot);
}

const timelineClasses = (0, _core.generateUtilityClasses)('MuiTimeline', ['root', 'positionLeft', 'positionRight', 'positionAlternate']);
var _default = timelineClasses;
exports.default = _default;
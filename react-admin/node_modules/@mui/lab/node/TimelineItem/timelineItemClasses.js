"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimelineItemUtilityClass = getTimelineItemUtilityClass;
exports.default = void 0;

var _core = require("@mui/core");

function getTimelineItemUtilityClass(slot) {
  return (0, _core.generateUtilityClass)('MuiTimelineItem', slot);
}

const timelineItemClasses = (0, _core.generateUtilityClasses)('MuiTimelineItem', ['root', 'positionLeft', 'positionRight', 'positionAlternate', 'missingOppositeContent']);
var _default = timelineItemClasses;
exports.default = _default;
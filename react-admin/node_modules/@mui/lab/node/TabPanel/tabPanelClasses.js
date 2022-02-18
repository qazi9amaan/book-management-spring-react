"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTabPanelUtilityClass = getTabPanelUtilityClass;
exports.default = void 0;

var _core = require("@mui/core");

function getTabPanelUtilityClass(slot) {
  return (0, _core.generateUtilityClass)('MuiTabPanel', slot);
}

const tabPanelClasses = (0, _core.generateUtilityClasses)('MuiTabPanel', ['root']);
var _default = tabPanelClasses;
exports.default = _default;
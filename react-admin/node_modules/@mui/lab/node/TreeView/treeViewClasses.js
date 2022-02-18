"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTreeViewUtilityClass = getTreeViewUtilityClass;
exports.default = void 0;

var _core = require("@mui/core");

function getTreeViewUtilityClass(slot) {
  return (0, _core.generateUtilityClass)('MuiTreeView', slot);
}

const treeViewClasses = (0, _core.generateUtilityClasses)('MuiTreeView', ['root']);
var _default = treeViewClasses;
exports.default = _default;
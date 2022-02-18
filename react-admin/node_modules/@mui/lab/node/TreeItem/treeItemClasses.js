"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTreeItemUtilityClass = getTreeItemUtilityClass;
exports.default = void 0;

var _core = require("@mui/core");

function getTreeItemUtilityClass(slot) {
  return (0, _core.generateUtilityClass)('MuiTreeItem', slot);
}

const treeItemClasses = (0, _core.generateUtilityClasses)('MuiTreeItem', ['root', 'group', 'content', 'expanded', 'selected', 'focused', 'disabled', 'iconContainer', 'label']);
var _default = treeItemClasses;
exports.default = _default;
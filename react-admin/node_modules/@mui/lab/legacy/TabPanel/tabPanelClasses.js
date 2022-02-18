import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getTabPanelUtilityClass(slot) {
  return generateUtilityClass('MuiTabPanel', slot);
}
var tabPanelClasses = generateUtilityClasses('MuiTabPanel', ['root']);
export default tabPanelClasses;
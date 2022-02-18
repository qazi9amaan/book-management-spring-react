import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getTabPanelUtilityClass(slot) {
  return generateUtilityClass('MuiTabPanel', slot);
}
const tabPanelClasses = generateUtilityClasses('MuiTabPanel', ['root']);
export default tabPanelClasses;
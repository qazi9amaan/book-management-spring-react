import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getMasonryUtilityClass(slot) {
  return generateUtilityClass('MuiMasonry', slot);
}
var masonryClasses = generateUtilityClasses('MuiMasonry', ['root']);
export default masonryClasses;
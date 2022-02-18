import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getMasonryItemUtilityClass(slot) {
  return generateUtilityClass('MuiMasonryItem', slot);
}
var masonryItemClasses = generateUtilityClasses('MuiMasonryItem', ['root']);
export default masonryItemClasses;
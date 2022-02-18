import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getMasonryItemUtilityClass(slot) {
  return generateUtilityClass('MuiMasonryItem', slot);
}
const masonryItemClasses = generateUtilityClasses('MuiMasonryItem', ['root']);
export default masonryItemClasses;
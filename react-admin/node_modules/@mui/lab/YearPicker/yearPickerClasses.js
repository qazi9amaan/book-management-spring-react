import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getYearPickerUtilityClass(slot) {
  return generateUtilityClass('MuiYearPicker', slot);
}
const yearPickerClasses = generateUtilityClasses('MuiYearPicker', ['root']);
export default yearPickerClasses;
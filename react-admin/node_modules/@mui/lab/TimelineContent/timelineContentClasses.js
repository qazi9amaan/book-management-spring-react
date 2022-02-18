import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getTimelineContentUtilityClass(slot) {
  return generateUtilityClass('MuiTimelineContent', slot);
}
const timelineContentClasses = generateUtilityClasses('MuiTimelineContent', ['root', 'positionLeft', 'positionRight', 'positionAlternate']);
export default timelineContentClasses;
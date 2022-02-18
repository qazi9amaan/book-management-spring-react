import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getTimelineOppositeContentUtilityClass(slot) {
  return generateUtilityClass('MuiTimelineOppositeContent', slot);
}
const timelineOppositeContentClasses = generateUtilityClasses('MuiTimelineOppositeContent', ['root', 'positionLeft', 'positionRight', 'positionAlternate']);
export default timelineOppositeContentClasses;
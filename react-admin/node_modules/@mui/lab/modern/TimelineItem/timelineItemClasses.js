import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getTimelineItemUtilityClass(slot) {
  return generateUtilityClass('MuiTimelineItem', slot);
}
const timelineItemClasses = generateUtilityClasses('MuiTimelineItem', ['root', 'positionLeft', 'positionRight', 'positionAlternate', 'missingOppositeContent']);
export default timelineItemClasses;
import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getTimelineConnectorUtilityClass(slot) {
  return generateUtilityClass('MuiTimelineConnector', slot);
}
const timelineConnectorClasses = generateUtilityClasses('MuiTimelineConnector', ['root']);
export default timelineConnectorClasses;
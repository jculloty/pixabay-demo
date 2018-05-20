// eslint-disable-next-line import/prefer-default-export
export const camalCaseToDisplayedName = (word) => word
  .replace(/([A-Z])/g, ' $1') // add spaces before each capital letter
  .replace(/^./, (firstLetter) => firstLetter.toUpperCase());

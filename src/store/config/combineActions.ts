/* eslint-disable @typescript-eslint/no-explicit-any */
const combineActions = (actions: any) => (dispatch: any) => {
  const interableActions = Object.entries(actions).map((entry: any[]) => {
    const moduleKey = entry[1];

    const functions = Object.entries(moduleKey).map((fnEntry: any) => [
      fnEntry[0],
      fnEntry[1](dispatch),
    ]);
    return [entry[0], Object.fromEntries(functions)];
  });
  return Object.fromEntries(interableActions);
};

export default combineActions;

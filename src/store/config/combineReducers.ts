/* eslint-disable @typescript-eslint/no-explicit-any */
const reducersEntriesKeys = (appReducers: any) => {
  const reducersKeys = Object.keys(appReducers);

  return { reducersKeys, reducers: appReducers };
};

const mergeStateFromReducers = (args: any) => {
  const { reducersKeys, reducers, appState, actions } = args;

  return reducersKeys.reduce((newState: any, key: any) => {
    const reducer = reducers[key];
    const reducerState = appState[key];
    const newReducerState = reducer(reducerState, { ...actions });

    return { ...newState, [key]: newReducerState };
  }, {});
};

const combineReducers = (appReducers: any) => {
  const { reducersKeys, reducers } = reducersEntriesKeys(appReducers);
  return (appState = {}, action: any) => {
    return mergeStateFromReducers({ reducersKeys, reducers, appState, action });
  };
};

export default combineReducers;

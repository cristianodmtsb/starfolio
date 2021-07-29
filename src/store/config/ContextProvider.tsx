/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useReducer, FC } from 'react';
import { Provider, Consumer } from './configContextRedux';

interface Props {
  initialState?: any;
}

export default (rootReducers: any /* rootActions: any */) => {
  /* >>>> FILE REDUCERS <<<< */

  const ContextProvider: FC<Props> = ({ children, initialState = {} }: any) => {
    const [state, dispatch] = useReducer(rootReducers, initialState);

    return (
      <Provider
        value={{ state, dispatch /* actions: rootActions(dispatch) */ }}
      >
        <Consumer>{() => children}</Consumer>
      </Provider>
    );
  };

  return ContextProvider;
};

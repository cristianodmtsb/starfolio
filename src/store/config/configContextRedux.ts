import { createContext, useContext } from 'react';
import configUseActions from './useActions';
import configUseDispatch from './useDispatch';
import configUseSelector from './useSelector';

const Context = createContext({});

export const { Provider, Consumer } = Context;

export const useActions = configUseActions(useContext, Context);
export const useDispatch = configUseDispatch(useContext, Context);
export const useSelector = configUseSelector(useContext, Context);

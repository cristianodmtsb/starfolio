import createContextProvider from './config/ContextProvider';
import rootReducers from './rootReducer';
export * from './config/configContextRedux';

export default () => createContextProvider(rootReducers);

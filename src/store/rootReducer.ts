import combineReducers from './config/combineReducers';
import vegetableReducer from './modules/vegetable/vegetable.reducer';

const rootReducers = combineReducers({
  vegetable: vegetableReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

export default rootReducers;

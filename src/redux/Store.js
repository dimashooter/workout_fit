import { combineReducers, configureStore } from '@reduxjs/toolkit';
import exerciseSlice from './slice';
import dashboardSlice from './dashboardSlice';
const rootReducer = combineReducers({
  exerciseSlice,
  dashboardSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

const useAppDispatch = () => store.dispatch;

export { useAppDispatch };

export default store;

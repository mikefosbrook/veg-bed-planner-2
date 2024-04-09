import { combineReducers } from '@reduxjs/toolkit';
import bedReducer from './bedSlice';

const rootReducer = combineReducers({
  bed: bedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

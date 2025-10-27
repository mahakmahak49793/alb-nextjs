// redux/reducers/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import astrologerReducer from './astrologerReducer';
// Import other reducers as needed

const rootReducer = combineReducers({
  astrologerReducer,
  // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

// redux/reducers/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import astrologerReducer from './astrologerReducer';
import commonReducer from './commonReducer';
import dashboardReducer from './dashboardReducer';
// Import other reducers as needed

const rootReducer = combineReducers({
  astrologerReducer,
  commonReducer,
  dashboardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

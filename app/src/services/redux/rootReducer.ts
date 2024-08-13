import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

const RootReducer = combineReducers({
  userReducer,
});

export default RootReducer;

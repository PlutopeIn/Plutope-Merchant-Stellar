import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import AdminReducer from '../features/slices/admin/adminSlice'

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  admin: AdminReducer,
  //   user: UserReducer,
  //  if we need to use more reducers
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);

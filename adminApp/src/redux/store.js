import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import productReducer from "./productRedux";
import wishlistReducer from "./wishlistRedux";
import orderReducer from './orderRedux';
import imageReducer from './imageRedux';
import localforage from 'localforage';
import { usersApi } from './usersApi';
import userReducer from './userSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: localforage,
  // storage,
};

const appReducer = combineReducers({
  user: userReducer, 
  product: productReducer,
  wishlist: wishlistReducer,
  order: orderReducer,
  image: imageReducer,
  [usersApi.reducerPath]: usersApi.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'user/logoutSuccess') state = undefined;
  return appReducer(state, action);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore ({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(usersApi.middleware),
});

export let persistor = persistStore(store);
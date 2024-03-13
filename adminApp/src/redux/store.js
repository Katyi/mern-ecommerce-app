import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import localforage from 'localforage';
import { usersApi } from './usersApi';
import { productsApi } from './productsApi';
import { ordersApi } from './ordersApi';
import { wishlistsApi } from './wishlistsApi';
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
  storage: localforage
};

const appReducer = combineReducers({
  user: userReducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [wishlistsApi.reducerPath]: wishlistsApi.reducer,
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
    }).concat([usersApi.middleware, productsApi.middleware, ordersApi.middleware, wishlistsApi.middleware]),
});

export let persistor = persistStore(store);
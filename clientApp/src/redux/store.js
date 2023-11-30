import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import cartsReducer from "./cartsRedux";
import ordersReduser from "./ordersRedux";
import wishlistsReduser from "./wishlistsRedux";

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
  storage,
};

// const rootReducer = combineReducers({ 
//   user: userReducer,
//   carts: cartsReducer,
//   orders: ordersReduser,
//   wishlists: wishlistsReduser,
// });

const appReducer = combineReducers({ 
  user: userReducer,
  carts: cartsReducer,
  orders: ordersReduser,
  wishlists: wishlistsReduser,
});
const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') state = undefined;
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
    }),
});

export let persistor = persistStore(store);

import { configureStore } from '@reduxjs/toolkit';
import contactsSlice from './contactsSlice';
import authSlice from './authSlice';
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

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const middleware = getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
    auth: persistReducer(authPersistConfig, authSlice.reducer),
  },
  middleware,
});

export const persistor = persistStore(store);

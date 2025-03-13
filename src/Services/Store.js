import { configureStore,combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/AuthSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web



// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};


// Combine your reducers (add more slices if needed)
const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers can be added here
});
// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Optionally add middleware or devTools configuration here
});

// Create the persistor instance
export const persistor = persistStore(store);
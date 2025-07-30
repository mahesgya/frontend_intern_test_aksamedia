import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/auth.slice"
import dataReducer from './slices/data.slice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import {configureStore} from "@reduxjs/toolkit";
import authReducer from './features/auth/auth-slice';
import userReducer from './features/user/user-slice';

export const globalStore = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer
  },
})

export type RootState = ReturnType<typeof globalStore.getState>
export type AppDispatch = typeof globalStore.dispatch
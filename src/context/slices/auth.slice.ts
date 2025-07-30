import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import LocalStorageService from '../../services/local.storage';

export type Theme = 'light' | 'dark' | 'system';

interface User {
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  theme: Theme;
}

const persistedAuthState = LocalStorageService.loadState<AuthState>('authState');

const initialState: AuthState = {
  user: persistedAuthState?.user ?? null,
  isAuthenticated: persistedAuthState?.isAuthenticated ?? false,
  theme: persistedAuthState?.theme ?? 'system',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      LocalStorageService.saveState('authState', state);
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      LocalStorageService.saveState('authState', state);
    },
    updateUserName: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.name = action.payload;
        LocalStorageService.saveState('authState', state);
      }
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      LocalStorageService.saveState('authState', state);
    },
  },
});

export const { loginSuccess, logoutSuccess, updateUserName, setTheme } = authSlice.actions;
export default authSlice.reducer;
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Item } from '../../types';
import LocalStorage from '../../services/local.storage';

interface DataState {
  items: Item[];
}

const DATA_STORAGE_KEY = 'crudData';

const mockData: Item[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User Name ${i + 1}`,
  email: `user${i + 1}@example.com`,
}));

const initialState: DataState = {
  items: LocalStorage.loadState<Item[]>(DATA_STORAGE_KEY) ?? mockData,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<Item, 'id'>>) => {
      const newId = Date.now() + Math.floor(Math.random() * 1000);
      const newItem: Item = { id: newId, ...action.payload };
      state.items.unshift(newItem);
      LocalStorage.saveState(DATA_STORAGE_KEY, state.items);
    },
    updateItem: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        LocalStorage.saveState(DATA_STORAGE_KEY, state.items);
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      LocalStorage.saveState(DATA_STORAGE_KEY, state.items);
    },
  },
});

export const { addItem, updateItem, deleteItem } = dataSlice.actions;
export default dataSlice.reducer;
import { configureStore, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const price = Number(newItem.price); 
      state.items.push(newItem);
      state.totalQuantity++;
      state.totalAmount += price; 
    },

    removeItem(state, action) {
      const id = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === id);
      if (existingItemIndex >= 0) {
        const existingItem = state.items[existingItemIndex];
        state.totalQuantity--;
        state.totalAmount -= Number(existingItem.price); // ✅ 
        state.items.splice(existingItemIndex, 1);
      }
    },
  },
});

const store = configureStore({
  reducer: 
     cartSlice.reducer, // 
  
});

export const cartActions = cartSlice.actions;
export default store;

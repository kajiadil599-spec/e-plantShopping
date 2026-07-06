import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array to store plant items added to the cart
  },
  reducers: {
    // Adds an item or updates quantity if it already exists
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    
    // Removes an item completely based on its name identifier
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    
    // Updates item quantity directly using action.payload values
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Action creators exported for component usage
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Default reducer export for store.js configuration
export default CartSlice.reducer;
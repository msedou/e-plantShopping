import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addItem: (state, action) => {
        const newItem = action.payload;
        const existingItem = state.items.find(item => item.name === newItem.name);
        if (!existingItem) {
            // If item doesn't exist in cart, add it as a new entry
            state.items.push({
              name: newItem.name,
              image: newItem.image,
              description: newItem.description,
              cost: newItem.cost,
              quantity: 1, // Initial quantity is set to 1
            });
            state.totalQuantity++;
          }else{
            // If item already exists, just increase its quantity
            existingItem.quantity++;
            state.totalQuantity++;
          }
    
    },
    removeItem: (state, action) => {
        const name = action.payload;
        const existingItem = state.items.find(item => item.name === name);
  
        if (existingItem) {
          if (existingItem.quantity === 1) {
            // If quantity is 1, remove the item from the cart
            state.items = state.items.filter(item => item.name !== name);
            state.totalQuantity--;
          } else {
            // Decrease the item quantity by 1
            existingItem.quantity--;
            state.totalQuantity--;
          }
        }
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
  
        if (existingItem) {
          // Adjust the total quantity by the difference
          state.totalQuantity += quantity - existingItem.quantity;
          existingItem.quantity = quantity; // Update the item's quantity
        }

    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

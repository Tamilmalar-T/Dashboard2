import { createSlice } from "@reduxjs/toolkit";

// Utility to load cart items from localStorage
const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Initial state
const initialState = {
  cartItems: loadCartFromStorage(),
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.cartItems.find(item => item._id === action.payload._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseQty: (state, action) => {
      const item = state.cartItems.find(item => item._id === action.payload);
      if (item) item.quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseQty: (state, action) => {
      const item = state.cartItems.find(item => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

// Export actions
export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart
} = bookingSlice.actions;

export default bookingSlice.reducer;

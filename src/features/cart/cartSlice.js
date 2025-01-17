import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Productos en el carrito
  totalItems: 0, // Cantidad total de productos
  totalPrice: 0, // Precio total del carrito
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;

      // Verificar si el producto ya está en el carrito
      const existingProduct = state.items.find((item) => item.id === product.id);

      if (existingProduct) {
        // Incrementar la cantidad si ya existe
        existingProduct.quantity += 1;
      } else {
        // Agregar el producto al carrito con una cantidad inicial de 1
        state.items.push({ ...product, quantity: 1 });
      }

      // Actualizar totales
      state.totalItems += 1;
      state.totalPrice += product.price;
    },
    removeFromCart(state, action) {
      const productId = action.payload;

      // Buscar el producto en el carrito
      const existingProduct = state.items.find((item) => item.id === productId);

      if (existingProduct) {
        // Restar la cantidad y precio del producto
        state.totalItems -= existingProduct.quantity;
        state.totalPrice -= existingProduct.price * existingProduct.quantity;

        // Eliminar el producto del carrito
        state.items = state.items.filter((item) => item.id !== productId);
      }
    },
    clearCart(state) {
      // Resetear el carrito
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

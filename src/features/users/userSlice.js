// users/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

// Estado inicial
const initialState = {
  currentUser: null, // Información del usuario autenticado
  isAuthenticated: false, // Indica si el usuario está autenticado
};

// Slice para manejar el estado del usuario
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Acción para iniciar sesión
    login(state, action) {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    // Acción para cerrar sesión
    logout(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    // Acción para actualizar datos del usuario
    updateUser(state, action) {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    initializeUser(state) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);

          // Verificar si el token ha expirado
          if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem('token'); // Eliminar el token expirado
            return;
          }

          // Inicializar el estado con los datos del token
          state.currentUser = decodedToken;
          state.isAuthenticated = true;
        } catch (error) {
          console.error('Error al decodificar el token:', error);
        }
      }
    },
  },
});

export const { login, logout, updateUser, initializeUser } = userSlice.actions;

export default userSlice.reducer;

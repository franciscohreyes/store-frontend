import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import BusinessPage from './pages/BusinessPage';
import BusinessDashboard from './pages/BusinessDashboard';
import CustomerDashboard from './pages/CustomerDashboard';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Rutas protegidas para Negocio */}
        <Route
          path="/business/*"
          element={
            <PrivateRoute role="Negocio">
              <BusinessDashboard />
            </PrivateRoute>
          }
        />

        {/* Rutas protegidas para Cliente */}
        <Route
          path="/my-orders"
          element={
            <PrivateRoute role="Cliente">
              <CustomerDashboard />
            </PrivateRoute>
          }
        />

        {/* Ruta protegida */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<HomePage />} />

        <Route
          path="/negocio/:id"
          element={
            <PrivateRoute>
              <BusinessPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />

        {/* Ruta pública */}
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

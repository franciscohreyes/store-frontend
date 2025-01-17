import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const CheckoutPage = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);

      // Validar que todos los productos pertenecen al mismo negocio
      const businessIds = [...new Set(items.map((item) => item.businessId))];
      if (businessIds.length !== 1) {
        throw new Error('Todos los productos deben pertenecer al mismo negocio para realizar el pedido.');
      }

      const businessId = businessIds[0];
      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

      // Preparar el cuerpo de la solicitud
      const orderData = {
        businessId,
        userId: decodedToken.id,
        products: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        subtotal: (totalPrice / 1.16).toFixed(2),
        iva: (totalPrice - totalPrice / 1.16).toFixed(2),
        total: totalPrice.toFixed(2),
        quantity: totalQuantity,
      };

      // Crear la orden
      const orderResponse = await API.post('/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { orderId } = orderResponse.data;

      // Realizar el pago
      await API.put(
        '/orders/pay',
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Vaciar el carrito
      dispatch(clearCart());

      setSuccess(true);
      navigate('/success'); // Redirigir a una página de éxito
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error al procesar el pago.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-700">Tu carrito está vacío</h2>
        <p className="text-gray-500 mt-2">
          Parece que no tienes productos para pagar. ¡Agrega algo primero!
        </p>
        <a
          href="/"
          className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
        >
          Ir a la tienda
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resumen del Pago</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p>Cantidad: {item.quantity}</p>
              <p className="text-blue-600 font-bold">Precio: ${item.price}</p>
            </div>
            <p className="text-gray-700">
              Subtotal: ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-lg font-bold">Subtotal: ${(totalPrice / 1.16).toFixed(2)}</p>
        <p className="text-lg font-bold">IVA (16%): ${(totalPrice - totalPrice / 1.16).toFixed(2)}</p>
        <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Procesando...' : 'Pagar'}
        </button>

        {success && (
          <p className="text-green-500 mt-4">Pago realizado con éxito. ¡Gracias por tu compra!</p>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;

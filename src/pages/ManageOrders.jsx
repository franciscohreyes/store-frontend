import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../api';
import { jwtDecode } from 'jwt-decode';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const businessId = decodedToken.id; // Extraer el businessId del token

      const response = await API.get(`/orders?businessId=${businessId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data.data);
    } catch (error) {
      toast.error('Error al cargar las órdenes');
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      await API.put(`/orders/${orderId}/cancel`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Orden cancelada exitosamente');
      fetchOrders();
    } catch (error) {
      toast.error('Error al cancelar la orden');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');

      await API.delete(`/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Orden eliminada exitosamente');
      fetchOrders();
    } catch (error) {
      toast.error('Error al eliminar la orden');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestión de Órdenes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Cliente</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Subtotal</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">IVA</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Total</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No hay órdenes disponibles
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.customerName || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    ${parseFloat(order.subtotal).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    ${parseFloat(order.iva).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    ${parseFloat(order.total).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.status}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div className="flex space-x-2">
                      {order.status !== 'Cancelada' && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Cancelar
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;

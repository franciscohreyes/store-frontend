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
      const businessId = decodedToken.id; // Extraer el `businessId` del token

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
      await API.put(`/orders/cancel`, { orderId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Orden cancelada exitosamente');
      fetchOrders(); // Actualizar la lista de órdenes
    } catch (error) {
      toast.error('Error al cancelar la orden');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      await API.delete(`/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Orden eliminada exitosamente');
      fetchOrders(); // Actualizar la lista de órdenes
    } catch (error) {
      toast.error('Error al eliminar la orden');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestión de Órdenes</h2>
      <table className="w-full border-collapse border border-gray-200 shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Cliente</th>
            <th className="border border-gray-300 px-4 py-2">Total</th>
            <th className="border border-gray-300 px-4 py-2">Estado</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                No hay órdenes disponibles
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                <td className="border border-gray-300 px-4 py-2">{order.userId}</td>
                <td className="border border-gray-300 px-4 py-2">${parseFloat(order.total).toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                <td className="border border-gray-300 px-4 py-2">
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
  );
};

export default ManageOrders;

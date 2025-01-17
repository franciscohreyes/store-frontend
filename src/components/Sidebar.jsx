import React from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaClipboardList, FaShoppingBag } from 'react-icons/fa';

const Sidebar = ({ role }) => {
  const isBusiness = role === 'Negocio';

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-lg font-bold">Panel de Control</h2>
      </div>
      <nav className="mt-4 space-y-1">
        {isBusiness ? (
          <>
            <Link
              to="/business/products"
              className="flex items-center px-4 py-2 hover:bg-gray-700 transition"
            >
              <FaBox className="mr-2 text-lg" />
              Productos
            </Link>
            <Link
              to="/business/orders"
              className="flex items-center px-4 py-2 hover:bg-gray-700 transition"
            >
              <FaClipboardList className="mr-2 text-lg" />
              Órdenes
            </Link>
          </>
        ) : (
          <Link
            to="/my-orders"
            className="flex items-center px-4 py-2 hover:bg-gray-700 transition"
          >
            <FaShoppingBag className="mr-2 text-lg" />
            Mis Órdenes
          </Link>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;

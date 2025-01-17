import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ManageProducts from './ManageProducts';
import ManageOrders from './ManageOrders';

const BusinessDashboard = () => {
  return (
    <div className="flex">
      <Sidebar role="Negocio" />
      <main className="flex-grow p-6">
        <Routes>
          <Route path="products" element={<ManageProducts />} />
          <Route path="orders" element={<ManageOrders />} />
        </Routes>
      </main>
    </div>
  );
};

export default BusinessDashboard;

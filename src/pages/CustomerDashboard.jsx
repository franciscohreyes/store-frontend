import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const CustomerDashboard = () => {
  return (
    <div className="flex">
      <Sidebar role="Cliente" />
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-6">Mis Órdenes</h1>
        <Routes>
          <Route path="/my-orders" element={<div>Lista de Mis Órdenes</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default CustomerDashboard;

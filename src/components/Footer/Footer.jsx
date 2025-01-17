import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 dark:bg-gray-800 antialiased">
      <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
        &copy; 2025{' '}
        . Todos los derechos reservados.
      </p>
      <div className="flex justify-center items-center space-x-1">
      </div>
    </footer>
  );
};

export default Footer;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

const HomePage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para obtener la lista de negocios
    const fetchBusinesses = async () => {
      try {
        const response = await API.get('/businesses');
        console.log(response.data.data);
        setBusinesses(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  if (loading) {
    return <p className="text-center">Cargando negocios...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="text-center p-4">
      <h1 className="text-3xl font-bold text-blue-600">¡Bienvenido a la Tienda!</h1>
      <p className="mt-2 text-gray-600">Explora nuestros productos y disfruta de la experiencia.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {businesses.map((business) => (
          <div
            key={business.id}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold text-blue-600">{business.name}</h2>
            <p className="text-gray-600">{business.address}</p>
            <Link
              to={`/negocio/${business.id}`}
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Ver Productos
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
};

export default HomePage;

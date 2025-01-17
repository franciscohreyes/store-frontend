import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; // Importar toast de react-toastify
import API from '../api';
import { fetchProductsByBusiness } from '../features/products/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import Card from '../components/Card/Card';

const BusinessPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsByBusiness(id));
  }, [dispatch, id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await API.get(`/products?businessId=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data.data);
      } catch (err) {
        setError(err.message);
        toast.error('Error al cargar los productos.', {
          position: 'top-right',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const handleAddToCart = (product) => {
    if (product.stock === 0) {
      toast.warn('Este producto no tiene stock disponible.', {
        position: 'top-right',
      });
      return;
    }
    dispatch(addToCart(product));
    toast.success(`${product.name} se ha añadido al carrito.`, {
      position: 'top-right',
    });
  };

  if (loading) return <p className="text-center">Cargando productos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  // Mostrar mensaje si no hay productos
  if (products.length === 0) {
    return (
      <p className="text-center text-gray-700">
        No hay productos disponibles para este negocio.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product.id} title={product.name}>
            <p className="text-gray-600">
              {product.description || 'Descripción no disponible para este producto.'}
            </p>
            <p className="text-blue-600 font-bold">${product.price}</p>
            {/* Estado de stock */}
            <p
              className={`font-medium ${
                product.stock > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {product.stock > 0 ? 'Stock disponible' : 'Sin stock'}
            </p>

            {/* Botón para añadir al carrito */}
            <button
              className={`mt-2 px-4 py-2 ${
                product.stock > 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400'
              } text-white rounded transition duration-300`}
              onClick={() => handleAddToCart(product)}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? 'Añadir al Carrito' : 'Sin Stock'}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BusinessPage;

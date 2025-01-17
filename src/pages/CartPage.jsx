import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';

const CartPage = () => {
  const { items, totalItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Producto eliminado del carrito.');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Carrito vaciado.');
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('No hay productos en el carrito para proceder al pago.');
    } else {
      navigate('/checkout');
    }
  };

  // Calcular el subtotal y el IVA
  const subtotal = totalPrice;
  const iva = subtotal * 0.16;
  const totalWithIva = subtotal + iva;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <svg
          className="h-20 w-20 text-gray-400 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2m13.6 0h2l-.4 2M7 13h10l4-8H5L7 13zm0 0l-1.1 5.4a1 1 0 001 1.6h10.2a1 1 0 001-1.6L17 13H7z"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-gray-700">Tu carrito está vacío</h2>
        <p className="text-gray-500 mt-2">
          Parece que aún no has agregado ningún producto. ¡Explora nuestros artículos ahora!
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
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Carrito de Compras</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          {/* Productos en el carrito */}
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                >
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <a href="#" className="shrink-0 md:order-1">
                      <img className="h-20 w-20 dark:hidden" src={item.image || '#'} alt={item.name} />
                      <img className="hidden h-20 w-20 dark:block" src={item.image || '#'} alt={item.name} />
                    </a>

                    <div className="text-end md:order-4 md:w-32">
                      <p className="text-base font-bold text-gray-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                      <p className="text-base font-medium text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-base font-medium text-gray-900 dark:text-white">{item.description}</p>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                          onClick={() => handleRemove(item.id)}
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen de la compra */}
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">Resumen de la compra</p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">${subtotal.toFixed(2)}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">IVA (16%)</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">${iva.toFixed(2)}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">${totalWithIva.toFixed(2)}</dd>
                  </dl>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Proceder a Pagar
              </button>
              <button
                onClick={handleClearCart}
                className="w-full flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { login } from '../features/users/userSlice';
import API from '../api';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validaciones con Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('La contraseña es obligatoria'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await API.post('/users/auth/login', values);
        const { token } = response.data;

        // Guarda el token en localStorage
        localStorage.setItem('token', token);

        // Decodifica el token para obtener el rol del usuario
        const decodedToken = jwtDecode(token);

        // Actualiza el estado global del usuario con los datos decodificados
        dispatch(login(decodedToken));

        // Redirige según el rol del usuario
        if (decodedToken.role === 'Negocio') {
          navigate('/business');
        } else if (decodedToken.role === 'Cliente') {
          navigate('/');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error en el inicio de sesión:', error.response?.data || error.message);
        setErrors({ general: error.response?.data?.message || 'Error al iniciar sesión' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h1>

        {formik.errors.general && (
          <div className="text-red-500 text-center mb-4">{formik.errors.general}</div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
            Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 border ${
              formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 border ${
              formik.touched.password && formik.errors.password
                ? 'border-red-500'
                : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {formik.isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
        </button>

        <p className="text-center text-gray-600 mt-4">
          ¿Aún no tienes una cuenta?{' '}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Registrarse ahora
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

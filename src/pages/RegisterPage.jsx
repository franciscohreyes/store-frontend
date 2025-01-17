import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom'; // Importar Link para redirigir
import API from '../api';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    role: 'Cliente', // Valor por defecto
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'El nombre debe tener al menos 2 caracteres.')
      .max(50, 'El nombre no puede exceder los 50 caracteres.')
      .required('El nombre es obligatorio.'),
    email: Yup.string()
      .email('Debe ser un correo electrónico válido.')
      .required('El correo es obligatorio.'),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres.')
      .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula.')
      .matches(/[a-z]/, 'Debe contener al menos una letra minúscula.')
      .matches(/[0-9]/, 'Debe contener al menos un número.')
      .matches(/[!@#$%^&*]/, 'Debe contener al menos un carácter especial (!@#$%^&*).')
      .required('La contraseña es obligatoria.'),
    role: Yup.string().required('El rol es obligatorio.'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await API.post('/users/auth/register', values);
      toast.success('Usuario registrado con éxito.', { position: 'top-right' });
      resetForm();
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Error al registrar el usuario.',
        { position: 'top-right' }
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Crear cuenta</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium">
                  Nombre
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium">
                  Correo Electrónico
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-medium">
                  Contraseña
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="role" className="block text-gray-700 font-medium">
                  Rol
                </label>
                <Field
                  as="select"
                  id="role"
                  name="role"
                  className="mt-1 w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Cliente">Cliente</option>
                  <option value="Negocio">Negocio</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isSubmitting ? 'Registrando...' : 'Registrarse'}
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-center text-gray-600 mt-4">
          ¿Ya tienes una cuenta?{' '}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Iniciar sesión ahora
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

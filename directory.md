# Estructura de directorios

```md
store-frontend/
├── public/
│   ├── index.html    
├── src/
│   ├── api/          # Conexión con el backend (Axios)
│   ├── components/   # Componentes reutilizables (botones, tarjetas, etc.)
│   ├── features/     # Módulos por dominio (productos, carrito, usuarios)
│   ├── hooks/        # Custom hooks (gestión de datos, efectos, etc.)
│   ├── pages/        # Vistas principales (Home, Producto, Checkout)
│   ├── redux/        # Store y slices (Redux Toolkit)
│   ├── styles/       # Configuración de TailwindCSS
│   ├── tests/        # Pruebas unitarias con Jest y React Testing Library
│   ├── utils/        # Funciones auxiliares
│   └── index.js      # Punto de entrada
├── tailwind.config.js
├── package.json
└── .env              # Variables de entorno
```

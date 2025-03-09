# inesis-frontend
Repositorio del codigo fuente del frontend de la aplicacion web para INESIS.

## Estructura a seguir en el repositorio

### La nomenclatura a seguir para los componentes y archivos es PascalCase

La estructura de carpetas del proyecto se organiza de la siguiente manera:

```
project-root/
├── public/                   # Archivos públicos como index.html, favicon, etc.
│   └── index.html            # Archivo principal de HTML
├── src/                      # Código fuente de la aplicación
│   ├── assets/               # Recursos estáticos como imágenes, estilos, etc.
│   ├── components/           # Componentes reutilizables
│   ├── hooks/                # Custom hooks
│   ├── layouts/              # Layouts generales de la app
│   ├── pages/                # Páginas o vistas principales
│   ├── services/             # Servicios para manejar API calls
│   ├── store/                # Configuración de estado global (e.g., Redux, Context)
│   ├── utils/                # Funciones y utilidades
│   ├── App.js                # Componente principal de la aplicación
|   ├── index.css             # CSS 
│   ├── index.js              # Punto de entrada de la aplicación
│   └── routes.js             # Configuración de rutas
├── .env                      # Variables de entorno
├── .gitignore                # Archivos a ignorar por Git
├── package.json              # Dependencias y scripts
└── README.md                 # Documentación del proyecto
```

### Descripción de cada carpeta

- **public/**: Contiene los archivos públicos que no se procesan por Webpack, como `index.html` y favicon.
  
- **src/**: Contiene todo el código fuente de la aplicación, incluyendo:

  - **assets/**: Archivos estáticos (imágenes, fuentes, estilos globales).
  
  - **components/**: Componentes reutilizables y atómicos (botones, formularios, etc.).

  - **hooks/**: Hooks personalizados para reutilizar lógica entre componentes.

  - **layouts/**: Estructuras de páginas que se repiten en diferentes secciones de la aplicación.

  - **pages/**: Vistas o páginas completas (ejemplo: HomePage, AboutPage). Cada página puede tener su propia carpeta si contiene múltiples componentes.

  - **services/**: Funciones para hacer llamadas a la API y manejar la lógica de interacción con el backend.

  - **store/**: Configuración del estado global, ya sea usando Context API o Redux.

  - **utils/**: Funciones de ayuda y lógica reutilizable (formateo de fechas, validaciones, etc.).

- **App.js**: Componente principal de la aplicación.

- **index.js**: Punto de entrada donde `ReactDOM.render` monta la aplicación en el DOM.

- **routes.js**: Configuración de las rutas de la aplicación (usualmente con `react-router-dom`).

Esta estructura ayuda a mantener el código modular y facilita la escalabilidad del proyecto.


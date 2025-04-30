# FullStack Test

Este es el repositorio para la prueba técnica  FullStack. El proyecto incluye un backend API en NestJS y un frontend en React.js, con integración de pago utilizando, manejo de productos y stock, y un flujo de pago con tarjeta de crédito.

## Descripción

### Funcionalidades principales:
1. **Página de productos**: Muestra productos y stock disponible.
2. **Modal de pago**: El usuario puede ingresar datos de tarjeta de crédito y de entrega.
3. **Resumen de pago**: Muestra el resumen antes de completar la transacción.
4. **Estado de la transacción**: Muestra si el pago fue exitoso o fallido.
5. **Actualización de stock**: Una vez completado el pago, el stock del producto se actualiza.

### Tecnologías usadas:
- **Backend**: NestJS, PostgreSQL, TypeORM
- **Frontend**: React.js, Redux Toolkit, Jest (para tests)
- **Pago**: Integración con API (Sandbox)
- **Despliegue**: AWS (S3 + CloudFront para el frontend, EC2 o Lambda para el backend)
  
## Estructura del Proyecto

- `/frontend`: Código del frontend en React.js.
- `/backend`: Código del backend en NestJS.
  
## Pasos para ejecutar el proyecto

### Backend:
1. Clonar el repositorio.
2. Ir al directorio `backend`.
3. Instalar dependencias:
   ```bash
   npm install
4. Configurar las credenciales de PostgreSQL en el archivo .env.
5. Ejecutar el servidor: npm run start

### frontend:
1. Clonar el repositorio.
2. Ir al directorio frontend.
3. Instalar dependencias: npm install
4. Ejecutar el servidor: npm start


<<<<<<< HEAD
# 🛍️ Test Técnica - App de Pagos con Wompi

Este proyecto es una solución FullStack que permite realizar compras en línea usando la pasarela de pagos Wompi. Incluye un backend con NestJS y PostgreSQL, y un frontend en React con pruebas, resumen de compra y entrega simulada.

## 🚀 Enlaces de despliegue (Railway)

- 🔗 Frontend: https://test-paula-frontend.up.railway.app
- 🔗 Backend: https://test-paula-backend.up.railway.app

> Puedes probar la app directamente accediendo al frontend, seleccionando un producto y completando el formulario de pago simulado.

---

## 🧰 Tecnologías usadas

**Frontend:**
- React
- React Modal
- React Scripts / Vite
- Testing Library (Jest + React Testing Library)

**Backend:**
- NestJS
- PostgreSQL
- TypeORM
- Node Fetch (para simular conexión a Wompi)

**DevOps:**
- Railway (para despliegue)
- GitHub (repositorio)

---

## 📦 Instalación local

```bash
# Clonar el repositorio
https://github.com/PaulaZambrano27/test-paula.git

# Instalar dependencias
cd backend
npm install
cd ../frontend
npm install
```

### 🔧 Ejecutar el backend localmente
```bash
cd backend
npm run start:dev
```

### 🖥️ Ejecutar el frontend localmente
```bash
cd frontend
npm start
```

---

## 🧪 Testing

```bash
# Desde el frontend
npm test
```

Esto ejecutará tres pruebas básicas:
1. Renderizado del título
2. Renderizado de productos
3. Apertura del modal de pago

✅ Todas las pruebas pasan exitosamente.

---

## 🧾 Funcionalidades principales

- Listado de productos (simulados desde backend)
- Modal con formulario de compra
- Detección de tipo de tarjeta (Visa/Mastercard)
- Cálculo de tarifas (Wompi + Envío)
- Simulación de transacciones, clientes y entregas
- Alerta final con resumen y estado de entrega

---

## ⚙️ Instrucciones para evaluadores

1. Accede al frontend desde este enlace: https://test-paula-frontend.up.railway.app
2. Visualiza los productos disponibles.
3. Haz clic en "Comprar" sobre cualquiera de ellos.
4. Rellena el formulario con datos simulados y envía.
5. Verás un resumen de compra y una simulación de estado de entrega.

Puedes revisar el backend accediendo directamente o clonar el proyecto desde GitHub.

---

## 🧪 Consideraciones técnicas

- El backend simula respuestas de Wompi.
- No se usan datos reales de tarjeta.
- La lógica de transacción, envío y cliente se almacena en PostgreSQL.
- Railway hace despliegue automático desde GitHub.

---

## 🌱 Posibles mejoras futuras

- Validación del número de tarjeta con regex y enmascaramiento
- Integración real con API de Wompi (modo producción)
- Autenticación de usuario y manejo de historial de compras
- Administración de productos desde un panel privado
- Implementación de Docker para contenedores
- Pruebas E2E (End to End) con Cypress o similar

---

## 👩‍💻 Autora

**Paula Zambrano**

[GitHub](https://github.com/PaulaZambrano27)

---

¡Gracias por revisar esta prueba técnica!

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

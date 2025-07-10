# 🛒 API RESTful - VERTICE-TEST

Esta es una API RESTful construida con **Node.js**, **TypeScript** y **MongoDB (Mongoose)**. Permite a los usuarios registrarse, iniciar sesión, consultar productos y realizar órdenes de compra, utilizando autenticación con **JWT** y arquitectura modular.

---

## 📦 Funcionalidades

### 🔐 Autenticación

- `POST /auth/register` — Registro de usuario.
- `POST /auth/login` — Login y obtención de token JWT.
- Rutas protegidas con middleware.

### 👤 Usuario

- `GET /me` — Datos del usuario autenticado.

### 📦 Productos

- `GET /products` — Listado de productos.
- `GET /products/:id` — Detalle de producto.

### 🧾 Órdenes

- `POST /orders` — Crear orden con múltiples productos y cantidades.
- `GET /orders` — Historial de órdenes del usuario autenticado.
- Cálculo automático del total por orden.

---

## 🧰 Tecnologías usadas

- Node.js
- TypeScript
- Express
- MongoDB + Mongoose
- JWT
- Bcrypt
- Dotenv

---

## Correr el proyecto

primero que nada, clonar el proyecto, usar comando `npm install` luego crear un archivo .env en base al example
puedes ejecutar el proyecto con docker, o con npm run dev y realizando una conexion exitosa a una base de datos en mongo

# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Tecnologías Usadas

- **Node.js** con **Express.js** como framework principal.
- **MongoDB Atlas** para la base de datos.
- **Mongoose** como ODM.
- **CORS** habilitado.
- JSON como formato de comunicación.

---

## Rutas Disponibles

### Autenticación (`authRoutes.js`)

#### POST `/api/register`

Registra un nuevo usuario.

**Request Body:**

```json
{
  "username": "usuario",
  "password": "contraseña"
}
```

**Response:**

```json
{
  "message": "Usuario registrado correctamente",
  "userId": "..."
}
```

---

#### POST `/api/login`

Autentica un usuario y devuelve un token.

**Request Body:**

```json
{
  "username": "usuario",
  "password": "contraseña"
}
```

**Response:**

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "...",
    "username": "usuario"
  }
}
```

---

### 🛒 Productos (`productoRoutes.js`)

#### GET `/api/productos`

Obtiene la lista de todos los productos.

**Response:**

```json
[
  {
    "_id": "id",
    "nombre": "Producto 1",
    "precio": 10.99,
    "stock": 100
  }
]
```

---

#### GET `/api/productos/:id`

Obtiene un producto específico por su ID.

**Response:**

```json
{
  "_id": "id",
  "nombre": "Producto 1",
  "precio": 10.99,
  "stock": 100
}
```

---

#### POST `/api/productos`

Crea un nuevo producto.

**Request Body:**

```json
{
  "nombre": "Producto 1",
  "precio": 10.99,
  "stock": 100
}
```

**Response:**

```json
{
  "message": "Producto creado",
  "producto": {
    "_id": "id",
    "nombre": "Producto 1",
    "precio": 10.99,
    "stock": 100
  }
}
```

---

#### PUT `/api/productos/:id`

Actualiza los datos de un producto.

**Request Body:**

```json
{
  "precio": 12.99,
  "stock": 80
}
```

**Response:**

```json
{
  "message": "Producto actualizado"
}
```

---

#### DELETE `/api/productos/:id`

Elimina un producto.

**Response:**

```json
{
  "message": "Producto eliminado"
}
```

---

### 💰 Ventas (`ventasRoutes.js`)

#### GET `/api/ventas`

Lista todas las ventas registradas.

**Response:**

```json
[
  {
    "_id": "id",
    "productoId": "123",
    "cantidad": 2,
    "fecha": "2024-01-01T00:00:00.000Z"
  }
]
```

---

#### POST `/api/ventas`

Registra una nueva venta.

**Request Body:**

```json
{
  "productoId": "1234567890abcdef",
  "cantidad": 2
}
```

**Response:**

```json
{
  "message": "Venta registrada",
  "venta": {
    "_id": "id",
    "productoId": "1234567890abcdef",
    "cantidad": 2,
    "fecha": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## ❌ Manejo de Errores

- En caso de error no manejado, se devuelve:

```json
{
  "error": "Algo salió mal en el servidor"
}
```

- Código de estado: `500 Internal Server Error`

---

## 🔒 Seguridad

- Las contraseñas deben almacenarse encriptadas.
- Se recomienda proteger rutas con JWT.

---

## 🚀 Servidor

- Puerto por defecto: `5000`
- Se recomienda usar variables de entorno para credenciales.

ENDPOINTS PRIMERA ENTREGA PROYECTO FINAL:

/api/productos
GET:  => lista todos los productos disponibles
GET: "/id"  => llama a un producto en particular
POST:  => agrega un producto al listado
PUT: "/id"  => modifica/actualiza un producto por su ID
DELETE: "/id"  => borra un producto por su ID


/api/carrito
POST: => crea un carrito y devuelve su ID
DELETE: "/id"  => elimina un carrito por su ID
GET: "/id/productos  => lista todos los productos que hay en ese carrito llamado por su ID
POST: "/id/productos/id_prod"  => agrega un producto llamado por su ID a un carrito tambien llamado por su ID
DELETE: "/id/productos/id_prod"  => elimina un producto llamado por su ID a un carrito tambien llamado por su ID
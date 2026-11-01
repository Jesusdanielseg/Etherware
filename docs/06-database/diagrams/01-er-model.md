# Modelo Entidad-Relación (ER)

**Descripción:** Este documento define la estructura de la base de datos relacional de Etherware. Mapea la arquitectura de clases a tablas físicas, definiendo llaves primarias (PK), llaves foráneas (FK) y cardinalidad.

## 1. Reglas de Normalización

* **Seguridad:** Las contraseñas nunca se guardan en texto plano (se usa `contrasena_hash`). El control de acceso se maneja mediante la columna `rol` en la tabla `usuarios`.
* **Trazabilidad:** Se crea la tabla transaccional `movimientos_inventario` para auditar quién y cuándo modificó el stock, en lugar de solo sobrescribir el valor.
* **Integridad:** Se separa la `orden_entrega` de su `detalle_orden` para permitir múltiples productos por pedido (Relación Muchos a Muchos resuelta).

## 2. Diagrama ER (Mermaid)

```mermaid
erDiagram
    USUARIOS {
        int id_usuario PK
        string nombre
        string email
        string contrasena_hash
        string rol
    }

    PRODUCTOS {
        int id_producto PK
        string nombre
        int stock_actual
        int stock_minimo
        decimal precio_base
        string imagen_url
    }

    MOVIMIENTOS_INVENTARIO {
        int id_movimiento PK
        int id_producto FK
        int id_usuario FK
        string tipo
        int cantidad
        timestamp fecha
    }

    LEADS {
        int id_lead PK
        string nombre
        string telefono
        string estado
        string temperatura
        int id_vendedor FK
    }

    PEDIDOS {
        int id_pedido PK
        int id_lead FK
        int id_vendedor FK
        int id_repartidor FK
        string estado_pago
        string estado_entrega
        string enlace_whatsapp
        string direccion
        timestamp fecha_creacion
    }

    DETALLE_PEDIDOS {
        int id_detalle PK
        int id_pedido FK
        int id_producto FK
        int cantidad
        decimal precio_unitario
    }

    %% Relaciones de Inventario
    PRODUCTOS ||--o{ MOVIMIENTOS_INVENTARIO : "registra en"
    USUARIOS ||--o{ MOVIMIENTOS_INVENTARIO : "ejecuta"

    %% Relaciones de CRM y Ventas
    USUARIOS ||--o{ LEADS : "gestiona (vendedor)"
    LEADS ||--o{ PEDIDOS : "genera"
    USUARIOS ||--o{ PEDIDOS : "valida (vendedor) / entrega (repartidor)"

    %% Relaciones del Carrito
    PEDIDOS ||--|{ DETALLE_PEDIDOS : "contiene"
    PRODUCTOS ||--o{ DETALLE_PEDIDOS : "incluye"
```

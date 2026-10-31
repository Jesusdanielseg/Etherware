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
        string rol "Admin, Vendedor, Repartidor"
    }
  
    PRODUCTOS {
        int id_producto PK
        string nombre
        int stock_actual
        int stock_minimo
        decimal precio_base
    }
  
    MOVIMIENTOS_INVENTARIO {
        int id_movimiento PK
        int id_producto FK
        int id_usuario FK
        string tipo_movimiento "Entrada, Salida"
        int cantidad
        datetime fecha
    }
  
    LEADS {
        int id_lead PK
        string nombre_contacto
        string telefono
        string estado_lead "Nuevo, Contactado, Convertido"
        string temperatura "Frío, Tibio, Caliente"
        int id_vendedor FK
    }
  
    ORDENES_ENTREGA {
        int id_orden PK
        int id_lead FK
        int id_repartidor FK
        string estado "Pendiente, Asignada, En camino, Entregada, Fallida"
        string direccion_entrega
        datetime fecha_creacion
    }
  
    DETALLE_ORDENES {
        int id_detalle PK
        int id_orden FK
        int id_producto FK
        int cantidad
        decimal precio_unitario
    }

    %% Relaciones
    USUARIOS ||--o{ MOVIMIENTOS_INVENTARIO : "registra"
    PRODUCTOS ||--o{ MOVIMIENTOS_INVENTARIO : "sufre"
  
    USUARIOS ||--o{ LEADS : "gestiona (Vendedor)"
  
    LEADS ||--o{ ORDENES_ENTREGA : "solicita"
    USUARIOS ||--o{ ORDENES_ENTREGA : "despacha (Repartidor)"
  
    ORDENES_ENTREGA ||--|{ DETALLE_ORDENES : "contiene"
    PRODUCTOS ||--o{ DETALLE_ORDENES : "incluido en"
```

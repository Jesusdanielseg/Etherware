
# Diagrama de Clases (UML)

**Descripción:** Este documento define la arquitectura estática orientada a objetos de Etherware. Se aplica el principio de herencia para la gestión de usuarios y composición para los módulos operativos, sirviendo como base directa para el diseño del modelo Entidad-Relación de la base de datos.

## 1. Reglas de Diseño

* **Herencia:** Se utiliza una clase base `Usuario` para centralizar la autenticación, heredando a roles específicos.
* **Separación de Responsabilidades:** Las órdenes de entrega, el inventario y los clientes potenciales (Leads) están aislados en sus propias estructuras.
* **Roles del Sistema:** El cliente final NO interactúa con el sistema, por lo que su representación es puramente un registro de datos (Lead/Cliente).

## 2. Diagrama de Clases (Mermaid)

```mermaid
classDiagram
    %% CLASES BASE Y USUARIOS
    class Usuario {
        +int idUsuario
        +String nombre
        +String email
        +String contrasena
        +autenticar() boolean
    }
  
    class Administrador {
        +String nivelAcceso
        +gestionarUsuarios() void
    }
  
    class Repartidor {
        +String vehiculo
        +actualizarEstadoEntrega() void
    }
  
    class Vendedor {
        +String zona
        +registrarLead() void
        +crearOrden() void
    }

    %% HERENCIA
    Usuario <|-- Administrador
    Usuario <|-- Repartidor
    Usuario <|-- Vendedor

    %% MÓDULO DE INVENTARIO
    class Inventario {
        +int idInventario
        +Date ultimaActualizacion
        +generarReporte() void
    }

    class Producto {
        +int idProducto
        +String nombre
        +int stockActual
        +int stockMinimo
        +double precioBase
        +actualizarStock() void
    }

    %% MÓDULO DE ENTREGAS
    class OrdenEntrega {
        +int idOrden
        +String estadoActual
        +Date fechaCreacion
        +String direccion
        +asignarRepartidor() void
    }

    %% MÓDULO CRM (LEADS)
    class Lead {
        +int idLead
        +String nombreContacto
        +String telefono
        +String estadoLead
        +String temperatura
        +cambiarEstado() void
    }

    %% RELACIONES
    Inventario "1" *-- "*" Producto : contiene
    Administrador --> Inventario : administra
    Vendedor --> OrdenEntrega : registra
    Vendedor --> Lead : gestiona
    Repartidor "1" --> "*" OrdenEntrega : despacha
    OrdenEntrega "*" --> "*" Producto : incluye
```

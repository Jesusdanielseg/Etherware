# Diagrama de Clases (UML)

**Descripción:** Este documento define la arquitectura estática orientada a objetos de Etherware. Se adapta al modelo híbrido separando las capacidades analíticas y de gestión interna frente a las interacciones del catálogo público.

## 1. Reglas de Diseño

- **Herencia de Usuarios:** Se utiliza una clase base `Usuario` para centralizar la autenticación, heredando a tres roles estrictos: Administrador, Vendedor y Cliente.
- **Participación del Cliente:** A diferencia de un ERP tradicional, el Cliente es un actor activo del sistema (Portal Público) responsable de instanciar los Pedidos antes de la validación.
- **Desacoplamiento de Pagos:** El sistema no procesa pagos internamente; la clase `Pedido` delega esta responsabilidad a la verificación manual (vía WhatsApp) gestionada por el Vendedor.

## 2. Diagrama de Clases (Mermaid)

```mermaid
classDiagram
    %% CLASES BASE Y USUARIOS
    class Usuario {
        +int idUsuario
        +String nombre
        +String email
        +String contrasena
        +String rol
        +autenticar() boolean
    }
  
    class Administrador {
        +verDashboardEstadistico() void
        +generarReportePDF() void
        +gestionarUsuarios() void
    }
  
    class Vendedor {
        +String zonaAsignada
        +validarPagoWhatsApp() void
        +actualizarEstadoPedido() void
        +gestionarLead() void
    }

    class Cliente {
        +String telefono
        +String direccionEnvio
        +armarCarrito() void
        +enviarPedidoWhatsApp() void
    }

    %% HERENCIA
    Usuario <|-- Administrador
    Usuario <|-- Vendedor
    Usuario <|-- Cliente

    %% MÓDULO DE INVENTARIO Y CATÁLOGO
    class Producto {
        +int idProducto
        +String nombre
        +int stockActual
        +int stockMinimo
        +double precioBase
        +String imagenUrl
        +actualizarStock() void
    }

    %% MÓDULO DE VENTAS Y ENTREGAS
    class Pedido {
        +int idPedido
        +Date fechaCreacion
        +String estadoPago
        +String estadoEntrega
        +String enlaceWhatsApp
        +double total
        +calcularTotal() void
    }

    %% MÓDULO CRM (LEADS)
    class Lead {
        +int idLead
        +String nombreContacto
        +String telefono
        +String estadoLead
        +cambiarEstado() void
    }

    %% RELACIONES
    Administrador --> Producto : administra inventario
    Vendedor --> Pedido : valida y despacha
    Vendedor --> Lead : capta y gestiona
    Cliente "1" --> "*" Pedido : genera desde catálogo
    Pedido "*" *-- "*" Producto : incluye
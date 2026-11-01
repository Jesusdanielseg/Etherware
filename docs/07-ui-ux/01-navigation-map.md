# Mapa de Navegación

**Descripción:** Este documento define la jerarquía de las pantallas y las rutas de navegación de Etherware, dividiendo estrictamente el acceso público (clientes) del acceso administrativo privado (empleados).

## 1. Reglas de Navegación

- **Separación de Portales:** El cliente final no se registra ni inicia sesión; navega libremente por el catálogo y el carrito hasta exportar su pedido.
- **Flujo de Compra (Público):** Diseñado para máxima fricción cero (Inicio -> Catálogo -> Carrito -> Checkout WhatsApp).
- **Acceso Protegido (Privado):** El Login es exclusivo para Vendedores y el Administrador. Una vez autenticados, aterrizan directamente en el Dashboard estadístico antes de ir a otros módulos operativos.

## 2. Diagrama de Navegación (Mermaid)

```mermaid
flowchart TD
    classDef publico fill:#f8d7da,stroke:#dc3545,stroke-width:2px,color:#000;
    classDef privado fill:#e2e3e5,stroke:#6c757d,stroke-width:2px,color:#000;
    classDef wpp fill:#d4edda,stroke:#28a745,stroke-width:2px,color:#000;

    subgraph Portal Público [Vista Cliente]
        A["Inicio / Catálogo"]:::publico --> B["Detalle de Producto"]:::publico
        A --> C["Carrito de Compras"]:::publico
        B --> C
        C --> D["Checkout / Datos de Envío"]:::publico
        D -.-> WPP["WhatsApp: Envío de Pedido"]:::wpp
    end

    subgraph Portal Privado [Vista Gestión Interna]
        L["Pantalla de Login (Solo Empleados)"]:::privado --> Dash["Dashboard Estadístico"]:::privado
    
        Dash --> Inv["Módulo de Inventario"]:::privado
        Inv --> Inv1["Tabla de Stock"]:::privado
        Inv --> Inv2["Exportar Reporte PDF"]:::privado
    
        Dash --> Ventas["Módulo de Pedidos"]:::privado
        Ventas --> V1["Lista de Pedidos"]:::privado
        Ventas --> V2["Validación de Pagos"]:::privado
    
        Dash --> CRM["Módulo CRM (Leads)"]:::privado
    end
```

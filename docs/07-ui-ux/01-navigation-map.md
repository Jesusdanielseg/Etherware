# Mapa de Navegación

**Descripción:** Este documento visualiza la arquitectura de páginas de la aplicación web Fresitas, definiendo la jerarquía del contenido y el recorrido del usuario (público, cliente autenticado y administrador).

## 1. Reglas de Navegación

* **Separación de roles:** El cliente navega por el catálogo, registro, carrito y confirmación; el administrador ingresa por login hacia inventario, pedidos y reportes.
* **Flujo de compra:** Diseñado para completar un pedido en pocos pasos (Inicio -> Catálogo -> Carrito -> Confirmación).
* **Prevención de errores:** Los flujos de registro y login incluyen validación de errores antes de continuar.

## 2. Diagrama de Navegación (Mermaid)

```mermaid
flowchart TD
    classDef raiz fill:#F2D3F8,stroke:#B496DB,stroke-width:2px,color:#000;
    classDef modulo fill:#B19EDC,stroke:#B496DB,stroke-width:2px,color:#000;
    classDef pantalla fill:#E6E6FA,stroke:#B7ABDB,stroke-width:1px,color:#000;

    A((FRESITAS)):::raiz
  
    %% Módulos Principales
    A --> B[Inicio / Catálogo]:::modulo
    A --> C[Compra]:::modulo
    A --> D[Administrador]:::modulo
  
    %% Rama Inicio / Catálogo
    B --> B1[Detalle Producto]:::pantalla
    B --> B2[Registro]:::pantalla
    B --> B3[Login]:::pantalla
  
    B3 --> B3a[Recuperar Contraseña]:::pantalla
    B3 --> B3b[Mi Cuenta]:::pantalla
    B3b --> B3b1[Mis Pedidos]:::pantalla
    B3b --> B3b2[Dirección Entrega]:::pantalla
  
    %% Rama Compra
    C --> C1[Carrito de Compras]:::pantalla
    C1 --> C1a[Modificar Cantidad / Eliminar]:::pantalla
    C1 --> C2[Confirmar Pedido]:::pantalla
    C2 --> C2a[Validación de Errores]:::pantalla
  
    %% Rama Administrador (Protegida)
    D --> D1[Panel de Inventario]:::pantalla
    D1 --> D1a[Consultar / Actualizar Stock]:::pantalla
  
    D --> D2[Gestión de Pedidos]:::pantalla
    D2 --> D2a[Cambiar Estado]:::pantalla
  
    D --> D3[Reportes]:::pantalla
```

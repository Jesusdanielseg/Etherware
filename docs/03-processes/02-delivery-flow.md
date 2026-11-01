# Proceso 02: Flujo de Gestión de Pedidos, Validaciones y Entregas

**Descripción:** Este documento detalla el ciclo de vida completo de un pedido bajo la arquitectura híbrida: desde que el cliente lo genera en el catálogo web público, pasando por la validación del pago vía WhatsApp por parte del vendedor, hasta el despacho y entrega final.

## 1. Reglas del Proceso

- **Origen del Pedido:** La orden nace cuando el cliente confirma su carrito en el Portal Público. El sistema genera una pre-orden con estado **Pendiente de Pago** y redirige al cliente a WhatsApp.
- **Validación Estricta:** El Vendedor es el único autorizado para cambiar el estado a **Validado** en el Portal Privado, y solo debe hacerlo tras verificar el comprobante de pago en WhatsApp.
- **Impacto en Inventario:** Al pasar a estado **Validado**, el sistema descuenta automáticamente los productos del stock (conectando con el Proceso 01).
- **Evidencia de Entrega:** Para pasar a estado **Entregado**, el repartidor debe confirmar la entrega y, en caso de fallo, es obligatorio registrar el motivo en el sistema.

## 2. Diagrama de Actividad (Mermaid)

```mermaid
flowchart TD
    %% Definición de Actores
    classDef cliente fill:#e9ecef,stroke:#6c757d,stroke-width:2px;
    classDef vendedor fill:#d4edda,stroke:#28a745,stroke-width:2px;
    classDef repartidor fill:#fff3cd,stroke:#ffc107,stroke-width:2px;
    classDef sistema fill:#cce5ff,stroke:#007bff,stroke-width:2px;

    A([Inicio: Cliente en Catálogo Web]) --> B[Armar carrito y confirmar]:::cliente
    B --> C[Sistema crea pre-orden]:::sistema
    C --> D[Estado: Pendiente de Pago]:::sistema
    D --> E[Redirección a WhatsApp con detalle del pedido]:::cliente
  
    E --> F[Recibir mensaje y solicitar comprobante]:::vendedor
    F --> G{¿Pago válido?}
  
    G -- No --> H[Anular orden]:::vendedor
    H --> I[Estado: Cancelado]:::sistema
  
    G -- Sí --> J[Aprobar pedido en Portal Privado]:::vendedor
    J --> K[Estado: Validado / Preparación]:::sistema
    K --> L[Asignar Repartidor y organizar ruta]:::vendedor
    L --> M[Estado: En camino]:::sistema
    M --> N{¿Entrega Exitosa?}
  
    N -- Sí --> O[Confirmar entrega / Capturar evidencia]:::repartidor
    O --> P[Estado: Entregado]:::sistema
  
    N -- No --> Q[Registrar motivo del fallo]:::repartidor
    Q --> R[Estado: Fallida / Reprogramar]:::sistema
  
    I --> S([Fin del proceso])
    P --> S
    R --> S
```

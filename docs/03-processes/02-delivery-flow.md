
# Proceso 02: Flujo de Gestión de Entregas y Despachos

**Descripción:** Este documento detalla el ciclo de vida de un pedido, desde que se confirma la venta hasta que el producto es entregado al cliente, definiendo las responsabilidades de cada rol en el cambio de estados.

## 1. Reglas del Proceso

* Solo el Vendedor o Administrador pueden crear la orden inicial.
* Una orden recién creada siempre nace en estado **Pendiente**.
* Para pasar a estado **Entregado**, el sistema exige obligatoriamente adjuntar una evidencia (firma o foto).
* Si una entrega falla, es obligatorio registrar un comentario con el motivo.

## 2. Diagrama de Actividad (Mermaid)

```mermaid
flowchart TD
    %% Definición de Actores mediante colores/estilos
    classDef vendedor fill:#d4edda,stroke:#28a745,stroke-width:2px;
    classDef logistica fill:#cce5ff,stroke:#007bff,stroke-width:2px;
    classDef repartidor fill:#fff3cd,stroke:#ffc107,stroke-width:2px;
    classDef sistema fill:#e2e3e5,stroke:#6c757d,stroke-width:2px;

    A([Inicio: Venta Confirmada]) --> B[Registrar Orden y Cliente]:::vendedor
    B --> C[Estado: Pendiente]:::sistema
    C --> D[Asignar a Repartidor]:::logistica
    D --> E[Estado: Asignada]:::sistema
    E --> F[Organizar ruta de entrega]:::repartidor
    F --> G[Iniciar recorrido]:::repartidor
    G --> H[Estado: En camino]:::sistema
    H --> I{¿Entrega Exitosa?}
  
    I -- Sí --> J[Capturar Firma/Foto]:::repartidor
    J --> K[Estado: Entregado]:::sistema
  
    I -- No --> L[Registrar motivo del fallo]:::repartidor
    L --> M[Estado: Fallida / Reprogramar]:::sistema
  
    K --> N([Fin del proceso])
    M --> N
```

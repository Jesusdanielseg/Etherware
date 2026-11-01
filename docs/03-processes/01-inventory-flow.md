# Proceso 01: Flujo de Gestión de Inventario y Reportes

**Descripción:** Este documento detalla la secuencia lógica de acciones cuando el Administrador interactúa con el módulo de inventario en el Portal Privado, ya sea para registrar movimientos manuales de insumos o para generar reportes formales exportables.

## 1. Reglas del Proceso

- **Cálculo Inmediato:** Todo movimiento (ya sea manual por el Administrador o automático tras la validación de una venta) afecta inmediatamente el stock en la base de datos.
- **Responsabilidad del Sistema:** El sistema (backend) es el único responsable de comparar el nuevo stock contra el umbral mínimo establecido de cada producto.
- **Alertas Visuales:** Cuando se cruza el umbral de escasez, las alertas se disparan visualmente en el Dashboard estadístico del Administrador. No requieren correos electrónicos.
- **Auditoría:** La exportación a PDF genera un documento inmutable con fecha y hora para propósitos de auditoría contable o de bodega.

## 2. Diagrama de Actividad (Mermaid)

```mermaid
flowchart TD
    %% Estilos de actores
    classDef admin fill:#cce5ff,stroke:#007bff,stroke-width:2px;
    classDef system fill:#fff3cd,stroke:#ffc107,stroke-width:2px;

    A([Inicio: Panel de Inventario]) --> B{¿Acción a realizar?}
  
    %% Flujo de Movimiento
    B -- Modificar Stock --> C[Ingresar Entrada, Salida o Devolución]:::admin
    C --> D[Sistema registra movimiento con ID y Fecha]:::system
    D --> E[Recalcular Stock Actual]:::system
    E --> F{¿Stock <= Mínimo?}
    F -- Sí --> G[Disparar Alerta visual en el Dashboard]:::system
    F -- No --> H[Mantener Estado Normal]:::system
  
    %% Flujo de Reporte PDF
    B -- Exportar Inventario --> I[Seleccionar filtros de fecha/categoría]:::admin
    I --> J[Backend consulta base de datos]:::system
    J --> K[Motor genera documento PDF]:::system
    K --> L[Descargar Reporte Oficial]:::admin
  
    %% Cierre
    G --> Z([Fin del proceso])
    H --> Z
    L --> Z
```

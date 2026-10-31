
# Proceso 01: Flujo de Gestión de Inventario y Alertas

**Descripción:** Este documento detalla la secuencia lógica de acciones cuando el Encargado de Bodega registra un movimiento y cómo el sistema evalúa los niveles de stock para disparar alertas preventivas.

## 1. Reglas del Proceso

* Todo movimiento afecta inmediatamente el stock calculado.
* El sistema es el responsable de comparar el nuevo stock contra el umbral mínimo establecido.
* Las alertas son visuales dentro del dashboard, no requieren envío de correos en esta fase (MVP).

## 2. Diagrama de Actividad (Mermaid)

```mermaid
flowchart TD
    A([Inicio: Registrar Movimiento]) --> B{¿Insumo existe?}
    B -- No --> C[Crear nuevo insumo y stock inicial] --> F
    B -- Sí --> D[Seleccionar insumo]
    D --> E[Ingresar tipo: Entrada/Salida y Cantidad]
    E --> F[Sistema guarda registro con ID Usuario y Fecha]
    F --> G[Sistema recalcula Stock Actual]
    G --> H{¿Stock Actual <= Stock Mínimo?}
    H -- Sí --> I[Cambiar estado a: Alerta de Escasez]
    H -- No --> J[Mantener estado Normal]
    I --> K([Fin del proceso])
    J --> K
```

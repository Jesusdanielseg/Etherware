
# Proceso 03: Flujo de Gestión de Clientes Potenciales (CRM)

**Descripción:** Este documento modela el embudo de captación de Fresitas. Define los pasos desde que un cliente muestra interés por primera vez, hasta que queda registrado, segmentado y es contactado rápidamente.

## 1. Reglas del Proceso

* El número de teléfono es el identificador único; el sistema no debe permitir leads duplicados con el mismo número.
* Todo lead nuevo ingresa con el estado predeterminado "Nuevo".
* El contacto inicial automatizado no utiliza una API paga, sino la generación dinámica de un enlace de WhatsApp Web/App (`wa.me`).

## 2. Diagrama de Actividad (Mermaid)

```mermaid
flowchart TD
    classDef vendedor fill:#d4edda,stroke:#28a745,stroke-width:2px;
    classDef sistema fill:#e2e3e5,stroke:#6c757d,stroke-width:2px;
    classDef externo fill:#f8d7da,stroke:#dc3545,stroke-width:2px;

    A([Inicio: Nuevo mensaje o interesado]) --> B[Ingresar datos: Nombre, Teléfono, Origen]:::vendedor
    B --> C{¿Teléfono ya existe?}:::sistema
  
    C -- Sí --> D[Mostrar alerta de duplicado y abrir perfil existente]:::sistema
    C -- No --> E[Guardar Lead con estado 'Nuevo']:::sistema
  
    E --> F[Asignar Zona y Nivel de Interés]:::vendedor
    F --> G[Clic en 'Contactar por WhatsApp']:::vendedor
  
    G --> H[Sistema genera URL dinámica con mensaje base]:::sistema
    H --> I[Abrir WhatsApp y enviar mensaje]:::externo
  
    D --> J([Fin del proceso])
    I --> J
```

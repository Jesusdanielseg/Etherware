# Proceso 03: Flujo de Gestión de Clientes Potenciales (CRM)

**Descripción:** Este documento modela el embudo de captación comercial de Fresitas. Define los pasos desde que un cliente potencial inicia contacto (principalmente derivado del Catálogo Web hacia WhatsApp) hasta que su información es centralizada y clasificada en el Portal Privado.

## 1. Reglas del Proceso

- **Identificador Único:** El número de teléfono de WhatsApp es la llave primaria (PK lógica) del cliente. El sistema bloquea la creación de leads duplicados con el mismo número.
- **Origen Omnicanal:** Un lead puede originarse automáticamente (cuando el cliente usa el carrito web y salta a WhatsApp) o manualmente (si el vendedor lo capta por Instagram/Facebook y lo registra en el sistema).
- **Clasificación Rápida:** Todo lead nuevo ingresa en estado predeterminado "Nuevo" o "En Negociación" y el vendedor debe actualizar su temperatura (Frío, Tibio, Caliente) según la interacción.
- **Enlace de Retorno:** Para leads registrados manualmente, el sistema genera dinámicamente un enlace de WhatsApp Web/App (`wa.me`) para facilitar el seguimiento con un solo clic sin salir del ERP.

## 2. Diagrama de Actividad (Mermaid)

```mermaid
flowchart TD
    classDef cliente fill:#e9ecef,stroke:#6c757d,stroke-width:2px;
    classDef vendedor fill:#d4edda,stroke:#28a745,stroke-width:2px;
    classDef sistema fill:#cce5ff,stroke:#007bff,stroke-width:2px;
    classDef externo fill:#f8d7da,stroke:#dc3545,stroke-width:2px;

    %% Orígenes del Lead
    A1(["Origen: Cliente desde Catálogo Web"]):::cliente --> B["Vendedor recibe mensaje estructurado en WhatsApp"]:::vendedor
    A2(["Origen: Contacto manual por Redes Sociales"]):::cliente --> B
  
    B --> C["Vendedor ingresa teléfono en módulo CRM (Portal Privado)"]:::vendedor
    C --> D{"¿Teléfono ya existe?"}:::sistema
  
    D -- Sí --> E["Mostrar perfil existente y actualizar historial"]:::sistema
    D -- No --> F["Guardar nuevo Lead con estado 'Nuevo'"]:::sistema
  
    F --> G["Clasificar Zona y Temperatura del Lead"]:::vendedor
  
    %% Acción de seguimiento
    G --> H{"¿Requiere seguimiento posterior?"}
    H -- Sí --> I["Clic en 'Contactar por WhatsApp'"]:::vendedor
    I --> J["Sistema genera URL dinámica wa.me"]:::sistema
    J --> K["Abrir chat en WhatsApp para retomar venta"]:::externo
    H -- No --> L(["Fin del proceso: Esperar respuesta"])
  
    E --> L
    K --> L
```


# Visión General de la Arquitectura

**Descripción:** Este documento define el patrón de diseño, la pila tecnológica (Tech Stack) y el modelo de componentes de Etherware, garantizando la escalabilidad y el cumplimiento de los requerimientos no funcionales (multiplataforma, seguridad y rendimiento).

## 1. Patrón de Diseño

El sistema implementa el patrón **Modelo-Vista-Controlador (MVC)** adaptado a una arquitectura de API REST (Cliente-Servidor).

* **Vista (Frontend):** Desacoplada del servidor, encargada de la renderización responsiva y la captura de eventos del usuario.
* **Controlador (Backend/API):** Centraliza la lógica de negocio, la validación de roles (RBAC) y la orquestación de procesos.
* **Modelo (Persistencia):** Capa de abstracción de datos (ORM) que gestiona la comunicación con la base de datos relacional.

## 2. Pila Tecnológica (Tech Stack)

* **Frontend:** HTML5, CSS3, JavaScript Vanilla.
* **Backend:** Python (Framework FastAPI / Flask).
* **ORM:** SQLAlchemy / SQLModel.
* **Base de Datos:** SQLite (Desarrollo local) / PostgreSQL (Producción Cloud).
* **Control de Versiones:** Git / GitHub.

## 3. Diagrama de Componentes (MVC)

```mermaid
flowchart TD
    %% Estilos
    classDef frontend fill:#cce5ff,stroke:#007bff,stroke-width:2px;
    classDef backend fill:#fff3cd,stroke:#ffc107,stroke-width:2px;
    classDef db fill:#d4edda,stroke:#28a745,stroke-width:2px;
    classDef api fill:#f8d7da,stroke:#dc3545,stroke-width:2px;

    subgraph Vista [Capa de Presentación - Cliente]
        UI[Interfaz de Usuario Web / Móvil]:::frontend
    end

    subgraph Controlador [Capa de Lógica - Servidor Python]
        Auth[Controlador de Seguridad y JWT]:::backend
        Inv[Gestor de Inventarios]:::backend
        Ent[Gestor de Entregas]:::backend
        CRM[Gestor de Leads]:::backend
      
        Auth --> Inv & Ent & CRM
    end

    subgraph Modelo [Capa de Persistencia]
        ORM[Módulo de Acceso a Datos / ORM]:::db
        SQL[(Base de Datos Relacional)]:::db
      
        ORM <-->|Conexión Corta| SQL
    end
  
    %% API Externa
    Whatsapp[API Dinámica WhatsApp]:::api

    %% Relaciones
    UI <-->|Peticiones HTTP / JSON| Auth
    Inv & Ent & CRM <--> ORM
    CRM -.->|Genera Enlace| Whatsapp
```

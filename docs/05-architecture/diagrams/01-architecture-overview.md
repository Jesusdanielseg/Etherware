# Visión General de la Arquitectura

**Descripción:** Este documento define el patrón de diseño, la pila tecnológica (Tech Stack) y el modelo de componentes del sistema híbrido Etherware, garantizando la escalabilidad y el cumplimiento de los requerimientos no funcionales (multiplataforma, seguridad y rendimiento).

## 1. Patrón de Diseño

El sistema implementa una arquitectura **Cliente-Servidor (API REST)** con separación estricta de entornos en la capa de presentación.

- **Vista (Frontend Híbrido):** Desacoplada del servidor. Se divide en dos entornos visuales:
  - *Portal Público:* Catálogo interactivo y carrito de compras orientado a clientes finales.
  - *Portal Privado:* Interfaz administrativa (ERP) protegida por autenticación para vendedores y administrador.
- **Controlador (Backend/API):** Centraliza la lógica de negocio, la validación de roles (RBAC), la generación de reportes documentales y la orquestación de procesos.
- **Modelo (Persistencia):** Capa de abstracción de datos (ORM) que gestiona la comunicación con la base de datos relacional.

## 2. Pila Tecnológica (Tech Stack)

- **Frontend:** HTML5, CSS3, JavaScript Vanilla, Bootstrap (Maquetación ágil), Chart.js (Gráficos del Dashboard).
- **Backend:** Python (Framework FastAPI).
- **Generación de Reportes:** ReportLab o WeasyPrint (Generación de PDFs).
- **ORM:** SQLAlchemy / SQLModel.
- **Base de Datos:** SQLite (Desarrollo local) / PostgreSQL (Producción Cloud).
- **Control de Versiones:** Git / GitHub.

## 3. Diagrama de Componentes

```mermaid
flowchart TD
    %% Estilos
    classDef public fill:#cce5ff,stroke:#007bff,stroke-width:2px;
    classDef private fill:#e2e3e5,stroke:#6c757d,stroke-width:2px;
    classDef backend fill:#fff3cd,stroke:#ffc107,stroke-width:2px;
    classDef db fill:#d4edda,stroke:#28a745,stroke-width:2px;
    classDef api fill:#f8d7da,stroke:#dc3545,stroke-width:2px;

    subgraph Frontend [Capa de Presentación - Cliente]
        Pub[Portal Público: Catálogo y Carrito]:::public
        Priv[Portal Privado: Dashboard y Gestión]:::private
    end

    subgraph Backend [Capa de Lógica - Servidor FastAPI]
        Auth[Gestor de Seguridad/Roles]:::backend
        Ventas[Controlador de Pedidos/Leads]:::backend
        Inv[Controlador de Inventarios]:::backend
        Stats[Motor Estadístico y Generador PDF]:::backend
      
        Auth --> Ventas & Inv & Stats
    end

    subgraph Modelo [Capa de Persistencia]
        ORM[ORM SQLAlchemy]:::db
        SQL[(Base de Datos Relacional)]:::db
      
        ORM <-->|Conexión Corta| SQL
    end
  
    %% API Externa y Flujo de salida
    Whatsapp[WhatsApp: Validación y Pago]:::api

    %% Relaciones
    Pub -.->|Envía Pedido| Whatsapp
    Priv <-->|Peticiones HTTP/JSON| Auth
    Whatsapp -.->|Vendedor valida| Priv
    
    Ventas & Inv & Stats <--> ORM

# Diagrama de Despliegue (Infraestructura)

**Descripción:** Este documento detalla la topología física y de red sobre la cual se ejecutará Etherware en un entorno de producción. Define los nodos de hardware, los contenedores de software y los protocolos de comunicación segura entre ellos.

## 1. Nodos de Infraestructura

La arquitectura se divide en tres capas físicas independientes para maximizar la seguridad y el rendimiento:

1. **Capa Cliente (Frontend):** Dispositivos de los usuarios finales (PC de escritorio en la sede de Fresitas y Smartphones de los repartidores en calle).
2. **Capa de Aplicación (Backend):** Servidor en la nube (Cloud VPS) que aloja la API REST construida en Python.
3. **Capa de Persistencia (Base de Datos):** Servidor dedicado y aislado del acceso público, encargado del almacenamiento relacional.

## 2. Diagrama de Despliegue (Mermaid)

```mermaid
flowchart TD
    %% Estilos de Nodos
    classDef cliente fill:#e9ecef,stroke:#6c757d,stroke-width:2px;
    classDef servidor fill:#cce5ff,stroke:#007bff,stroke-width:2px;
    classDef baseDatos fill:#d4edda,stroke:#28a745,stroke-width:2px;

    subgraph Nodos de Usuario [Entorno Cliente]
        PC[💻 PC Administrador / Bodega <br> Navegador Web]:::cliente
        Movil[📱 Smartphone Repartidor <br> Navegador Móvil]:::cliente
    end

    subgraph Nodo de Producción [Servidor Cloud Host]
        API[⚙️ Controlador Central <br> API REST - Python/FastAPI]:::servidor
        UI[🌐 Archivos Estáticos <br> HTML, CSS, JS]:::servidor
    end

    subgraph Nodo de Persistencia [Servidor de Base de Datos]
        DB[(🗄️ Motor Relacional <br> PostgreSQL)]:::baseDatos
    end

    %% Conexiones y Protocolos
    PC <-->|HTTPS Puerto 443| UI
    PC <-->|Peticiones asíncronas JSON| API
    Movil <-->|Red 4G/5G HTTPS| API
    API <-->|Conexión Corta TCP/IP Puerto 5432| DB
```

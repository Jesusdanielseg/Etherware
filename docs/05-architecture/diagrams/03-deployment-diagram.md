# Diagrama de Despliegue (Infraestructura)

**Descripción:** Este documento detalla la topología física y de red sobre la cual se ejecutará Etherware en un entorno de producción. Define los nodos de hardware, los servicios de software y la integración con plataformas externas (WhatsApp) bajo el modelo híbrido.

## 1. Nodos de Infraestructura

La arquitectura opera sobre una topología distribuida de cuatro ejes:

1. **Capa Cliente (Dispositivos Externos):** Smartphones o PCs de los clientes finales accediendo al catálogo público a través de internet.
2. **Capa Operativa (Sede Fresitas):** Computadoras de escritorio o tablets utilizadas por los Vendedores y el Administrador en la red local o mediante VPN/Internet seguro.
3. **Capa de Aplicación (Cloud VPS):** Servidor en la nube que aloja la API REST (Python/FastAPI), despacha los archivos estáticos de ambos portales y procesa la generación de reportes en PDF.
4. **Capa de Persistencia y Servicios:** Base de datos relacional aislada y la pasarela de salida hacia la aplicación de WhatsApp del usuario.

## 2. Diagrama de Despliegue (Mermaid)

```mermaid
flowchart TD
    %% Estilos de Nodos
    classDef external fill:#f8d7da,stroke:#dc3545,stroke-width:2px;
    classDef client fill:#e9ecef,stroke:#6c757d,stroke-width:2px;
    classDef server fill:#cce5ff,stroke:#007bff,stroke-width:2px;
    classDef db fill:#d4edda,stroke:#28a745,stroke-width:2px;

    subgraph Nodos de Usuario [Entorno Cliente]
        MovilCliente["📱 Dispositivo del Cliente <br> Navegador Web"]:::client
        PCAdmin["💻 PC Sede Fresitas <br> (Admin/Vendedor)"]:::client
    end

    subgraph Nodo de Producción [Servidor Cloud Host]
        UI["🌐 Servidor Web <br> (Catálogo Público y ERP Privado)"]:::server
        API["⚙️ Controlador Central <br> API REST - FastAPI"]:::server
        PDF["📄 Motor de Reportes <br> Generación PDF"]:::server
        
        UI <--> API
        API <--> PDF
    end

    subgraph Nodos de Persistencia
        DB[("🗄️ Motor Relacional <br> PostgreSQL")]:::db
    end
    
    subgraph Servicios Externos
        WPP["💬 Ecosistema WhatsApp <br> (App Nativa / Web)"]:::external
    end

    %% Conexiones y Protocolos
    MovilCliente <-->|HTTPS| UI
    PCAdmin <-->|HTTPS Seguro| UI
    
    MovilCliente -.->|Redirección| WPP
    PCAdmin -.->|Validación Manual| WPP
    
    API <-->|Conexión Corta TCP| DB

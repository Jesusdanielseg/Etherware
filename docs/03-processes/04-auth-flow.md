# Proceso 04: Flujo de Autenticación y Seguridad (RBAC)

**Descripción:** Este documento detalla cómo el sistema verifica la identidad para el acceso exclusivo al **Portal Privado** (Administradores y Vendedores) y cómo asegura el Control de Acceso Basado en Roles (RBAC). El Portal Público (Catálogo) es de libre acceso y no requiere autenticación.

## 1. Reglas del Proceso

- **Acceso Dividido:** El cliente final no se autentica. El login aplica estrictamente para los empleados en la ruta administrativa.
- **Criptografía:** Ninguna contraseña se almacena ni viaja en texto plano; se utilizan algoritmos de hashing seguro (ej. bcrypt).
- **Prevención de Enumeración:** Los mensajes de error en el login deben ser genéricos ("Credenciales incorrectas") para evitar que atacantes descubran correos válidos.
- **Sesión Stateless:** La sesión se maneja mediante un Token (JWT) almacenado en el navegador, el cual debe enviarse en la cabecera de cada petición al servidor.
- **Seguridad en Backend:** La validación de permisos se hace de forma estricta en la API (servidor), no solo ocultando botones en la interfaz visual.

## 2. Diagrama de Actividad (Mermaid)

```mermaid
flowchart TD
    classDef usuario fill:#e2e3e5,stroke:#6c757d,stroke-width:2px;
    classDef frontend fill:#cce5ff,stroke:#007bff,stroke-width:2px;
    classDef backend fill:#fff3cd,stroke:#ffc107,stroke-width:2px;
    classDef alerta fill:#f8d7da,stroke:#dc3545,stroke-width:2px;

    A(["Inicio: Empleado intenta acceder al Portal Privado"]):::usuario --> B["Ingresar Email y Contraseña"]:::frontend
    B --> C{"¿Existe el Email?"}:::backend
  
    C -- No --> D["Mostrar error genérico: 'Credenciales inválidas'"]:::alerta
    C -- Sí --> E{"¿Contraseña es correcta?"}:::backend
  
    E -- No --> D
    E -- Sí --> F["Generar Token JWT con el Rol (Admin/Vendedor)"]:::backend
  
    F --> G["Guardar Token e ir al Dashboard Privado"]:::frontend
  
    G --> H(["Nueva Petición: Empleado intenta abrir un módulo"]):::usuario
    H --> I["Enviar petición HTTP adjuntando el Token"]:::frontend
    I --> J{"¿Token válido y no expirado?"}:::backend
  
    J -- No --> K["Destruir sesión y redirigir al Login"]:::alerta
    J -- Sí --> L{"¿El Rol tiene permiso para esta acción?"}:::backend
  
    L -- No --> M["Bloquear y devolver error: 'Acceso Denegado 403'"]:::alerta
    L -- Sí --> N["Ejecutar acción y devolver datos JSON"]:::backend
  
    D --> Z(["Fin del proceso"])
    K --> Z
    M --> Z
    N --> Z

# Proceso 04: Flujo de Autenticación y Seguridad (RBAC)

**Descripción:** Este documento detalla cómo el sistema verifica la identidad de un empleado de Fresitas (Login) y cómo asegura que cada usuario solo acceda a los módulos permitidos según su rol (Control de Acceso Basado en Roles - RBAC).

## 1. Reglas del Proceso

* Ninguna contraseña se almacena ni viaja en texto plano; se utilizan algoritmos de hashing seguro.
* Los mensajes de error en el login deben ser genéricos ("Credenciales incorrectas") para prevenir ataques de enumeración de usuarios.
* La sesión se maneja mediante un Token (JWT) que el cliente debe enviar en cada petición al servidor.
* La validación de permisos se hace de forma estricta en el backend (servidor), no solo ocultando botones en la interfaz visual.

## 2. Diagrama de Actividad (Mermaid)

```mermaid
flowchart TD
    classDef usuario fill:#e2e3e5,stroke:#6c757d,stroke-width:2px;
    classDef frontend fill:#cce5ff,stroke:#007bff,stroke-width:2px;
    classDef backend fill:#fff3cd,stroke:#ffc107,stroke-width:2px;
    classDef alerta fill:#f8d7da,stroke:#dc3545,stroke-width:2px;

    A([Inicio: Usuario ingresa Email y Contraseña]):::usuario --> B[Enviar datos de login]:::frontend
    B --> C{¿Existe el Email?}:::backend
  
    C -- No --> D[Mostrar error genérico: 'Credenciales inválidas']:::alerta
    C -- Sí --> E{¿Contraseña es correcta?}:::backend
  
    E -- No --> D
    E -- Sí --> F[Generar Token JWT con el Rol del usuario]:::backend
  
    F --> G[Guardar Token en navegador e ir al Dashboard]:::frontend
  
    G --> H([Nueva Petición: Usuario intenta abrir un módulo]):::usuario
    H --> I[Enviar petición adjuntando el Token]:::frontend
    I --> J{¿Token válido y no expirado?}:::backend
  
    J -- No --> K[Destruir sesión y redirigir al Login]:::alerta
    J -- Sí --> L{¿El Rol tiene permiso para esta acción?}:::backend
  
    L -- No --> M[Bloquear y devolver error: 'Acceso Denegado 403']:::alerta
    L -- Sí --> N[Ejecutar acción y devolver datos]:::backend
  
    D --> Z([Fin del proceso])
    K --> Z
    M --> Z
    N --> Z
```

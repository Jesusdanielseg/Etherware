
# Épica 04: Gestión de Usuarios, Roles y Seguridad

**Descripción:** Esta épica garantiza la protección del sistema y los datos de Fresitas. Define cómo ingresan los empleados a la plataforma y asegura que cada rol (Administrador, Vendedor/Bodega, Repartidor) solo tenga acceso a las pantallas y acciones que le corresponden.

---

## US-USR-01: Autenticación de acceso (Login)

**Relación:** RNF-004, RNF-009
**Prioridad:** Alta
**Estimación (Puntos de Historia):** *Por definir en Sprint Planning*

**Historia:**

> **Como** Usuario del sistema (empleado de Fresitas)
> **Quiero** iniciar sesión con mis credenciales únicas
> **Para** acceder de forma segura a mi panel de trabajo.

**Criterios de Aceptación:**

1. El sistema debe requerir un correo electrónico y una contraseña válida.
2. Si las credenciales son incorrectas, debe mostrar un mensaje genérico ("Credenciales inválidas") para evitar ataques de enumeración.
3. Las contraseñas deben estar encriptadas (hasheadas) en la base de datos; nunca en texto plano.
4. El sistema debe cerrar la sesión automáticamente tras un periodo de inactividad prolongada por seguridad.

---

## US-USR-02: Control de acceso basado en roles (RBAC)

**Relación:** RNF-012, RNF-004
**Prioridad:** Alta

**Historia:**

> **Como** Administrador General
> **Quiero** crear usuarios y asignarles un rol específico
> **Para** evitar que empleados no autorizados modifiquen datos sensibles (como eliminar pedidos o ver reportes financieros).

**Criterios de Aceptación:**

1. Solo el rol "Administrador General" puede acceder al panel de creación y edición de usuarios.
2. Al crear un usuario, se debe seleccionar obligatoriamente un rol: Administrador General, Encargado de Bodega, Coordinador Logístico, Vendedor o Repartidor.
3. El menú de navegación debe ocultar las opciones a las que el usuario no tiene permiso (ej. un Repartidor no debe ver el botón de "Inventario" ni "Reportes").
4. El backend debe validar los permisos en cada petición para evitar accesos directos mediante URL.

---

## US-USR-03: Auditoría básica de acciones críticas

**Relación:** RNF-004
**Prioridad:** Media

**Historia:**

> **Como** Administrador General
> **Quiero** que el sistema registre qué usuario realizó movimientos de inventario o cambios de estado en entregas
> **Para** identificar responsables en caso de errores o pérdidas.

**Criterios de Aceptación:**

1. Todas las tablas críticas de la base de datos (Movimientos de Inventario, Órdenes, Leads) deben guardar el `id_usuario` que creó o modificó el registro.
2. En las vistas de detalle de un pedido o movimiento de inventario, se debe mostrar un texto que indique "Registrado/Modificado por: [Nombre del Usuario]".

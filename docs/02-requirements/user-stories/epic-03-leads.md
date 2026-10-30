
# Épica 03: Gestión de Clientes Potenciales (CRM Básico)

**Descripción:** Esta épica define las funcionalidades para administrar la base de datos de "leads" (clientes interesados) de Fresitas, permitiendo a los vendedores hacer seguimiento, categorizarlos y agilizar el primer contacto.

---

## US-CRM-01: Registro de prospectos (Leads)

**Relación:** RF-010
**Prioridad:** Media
**Estimación (Puntos de Historia):** *Por definir en Sprint Planning*

**Historia:**

> **Como** Vendedor (o Administrador)
> **Quiero** registrar los datos de contacto de una persona interesada
> **Para** crear una base de datos centralizada de posibles compradores y evitar que se pierdan en chats informales.

**Criterios de Aceptación:**

1. El formulario debe solicitar los siguientes campos mínimos: Nombre completo, Teléfono (WhatsApp), y Origen del contacto (ej. Instagram, Referido, Local).
2. El sistema debe validar que el número de teléfono no esté duplicado en la base de datos.
3. Todo nuevo prospecto debe ingresar por defecto con el estado "Nuevo".

---

## US-CRM-02: Segmentación de clientes

**Relación:** RF-011
**Prioridad:** Baja

**Historia:**

> **Como** Vendedor
> **Quiero** clasificar a los prospectos por zona geográfica y nivel de interés
> **Para** priorizar mis seguimientos diarios y enfocarme en los que están más cerca de comprar.

**Criterios de Aceptación:**

1. La tabla de leads debe permitir asignar y modificar una "Zona" (ej. Norte, Centro, Sur).
2. Se debe poder asignar un "Nivel de Interés" o "Temperatura" (Frío, Tibio, Caliente).
3. La interfaz debe incluir filtros rápidos para visualizar rápidamente los leads por Zona y Temperatura.

---

## US-CRM-03: Automatización inicial de contacto

**Relación:** RF-012
**Prioridad:** Baja

**Historia:**

> **Como** Vendedor
> **Quiero** enviar un mensaje de bienvenida predeterminado con un solo clic
> **Para** responder más rápido a los nuevos interesados y ahorrar tiempo de escritura manual.

**Criterios de Aceptación:**

1. La tabla o el perfil del lead debe tener un botón de acción rápida llamado "Contactar por WhatsApp".
2. Al presionar el botón, el sistema debe abrir WhatsApp Web o la aplicación de escritorio cargando el número del cliente.
3. El mensaje debe estar pre-poblado con una plantilla estándar de Fresitas (ej. "¡Hola [Nombre]! Gracias por escribir a Fresitas, ¿en qué podemos ayudarte hoy?").

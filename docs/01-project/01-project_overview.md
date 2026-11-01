# Etherware™

## Descripción general del proyecto

### 1. Presentación

Etherware™ es una plataforma de software híbrida propuesta para la empresa Fresitas. Su propósito es integrar un **catálogo web público** para la captación de pedidos de clientes con un **Sistema de Gestión Interno (ERP ligero)** enfocado en la administración, ventas y analítica de datos.

La solución busca centralizar la información operativa, facilitar el cierre de ventas a través de WhatsApp y proporcionar herramientas de *Business Intelligence* (BI) para la toma de decisiones, garantizando que la empresa disponga de un control total sobre su inventario, logística y rendimiento comercial.

### 2. Módulos contemplados

#### Catálogo Público y Pedidos (Vista Cliente)

- Visualización interactiva de productos disponibles.
- Gestión de carrito de compras para estructuración del pedido.
- Pasarela de salida: redirección automática a WhatsApp con los datos del pedido para su validación y pago.

#### Gestión Comercial y Entregas (Portal Vendedor)

- Panel de recepción de pedidos y validación de comprobantes de pago.
- Actualización del estado de las órdenes (Pendiente, Validado, Enviado).
- Registro, organización y seguimiento de clientes potenciales (leads).
- Planificación de rutas, asignación de repartidores y registro de entregas.

#### Gestión de Inventarios y Operaciones (Portal Administrador)

- Registro de ingresos, salidas y devoluciones de productos.
- Control de existencias y generación de alertas por stock bajo.
- Generación y exportación de reportes de inventario formales en formato PDF.

#### Analítica y Estadísticas (Dashboard Administrador)

- Panel de control interactivo (Dashboard) al inicio de sesión.
- Visualización gráfica de métricas clave (ventas mensuales, productos más vendidos, tasa de conversión).

#### Gestión de Usuarios

- Administración de cuentas, roles y permisos con accesos aislados (Cliente, Vendedor, Administrador).

### 3. Integración esperada

Los módulos operan bajo un flujo continuo y conectado: la intención de compra generada en el catálogo público es procesada por el vendedor a través de WhatsApp y validada en el sistema interno. Esta transacción descuenta automáticamente el stock en el módulo de inventarios e inyecta los datos financieros en el Dashboard estadístico del administrador, manteniendo la información centralizada y en tiempo real.

### 4. Beneficios esperados

- Experiencia de compra ágil y sin fricciones para el cliente mediante WhatsApp.
- Eliminación de registros manuales redundantes en el proceso de ventas.
- Control estricto y auditoría de inventarios mediante reportes PDF.
- Toma de decisiones estratégicas respaldada por la visualización de datos (Dashboards).
- Seguimiento ordenado del historial de leads y embudo de conversión.
- Arquitectura escalable que permite integrar nuevos módulos operativos en el futuro.

### 5. Metodología de trabajo

El equipo desarrollará el proyecto utilizando Scrum, garantizando entregas modulares. La arquitectura de software mantendrá una estricta separación visual y lógica entre el entorno público (clientes) y el entorno privado (gestión interna).

### 6. Equipo

- Jesús Daniel Seguanes Arias

### 7. Estado y alcance

Este documento describe la propuesta general del producto bajo su modelo arquitectónico híbrido. La inclusión de una funcionalidad en esta descripción no significa que ya esté implementada ni que su alcance definitivo esté cerrado. Los requisitos técnicos, reglas de negocio y diseños de interfaz (wireframes) se detallan en la documentación específica de cada módulo.

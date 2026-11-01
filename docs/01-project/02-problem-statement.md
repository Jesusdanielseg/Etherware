
# Planteamiento del problema

## 1. Contexto

Fresitas desarrolla actividades comerciales relacionadas con la exhibición de productos, captación de clientes, cierre de ventas, gestión de inventario y preparación de entregas. En la operación diaria, se ha identificado que el cierre de ventas ocurre principalmente a través de canales directos como WhatsApp, interactuando con actores clave como clientes finales, vendedores (que gestionan los pedidos) y la administración (encargada del control global y la toma de decisiones).

La desconexión entre la fase de exhibición al cliente, el cierre de la venta por chat y el control interno de la empresa hace indispensable una plataforma que unifique estos flujos.

## 2. Necesidad identificada

La propuesta de Etherware parte de la necesidad de unificar la captación comercial y la administración interna mediante una **solución híbrida**. Se requiere un sistema que ofrezca un catálogo digital autónomo para que el cliente estructure su pedido, pero que respete la naturaleza del negocio enrutando el cierre hacia WhatsApp. Simultáneamente, el sistema debe respaldar esta operación con un panel interno (ERP) que dote a los vendedores de herramientas para gestionar esos pedidos y al administrador de controles de inventario y analítica de datos.

## 3. Situación que se busca mejorar

Etherware busca atender las siguientes necesidades operativas:

- **Captación de pedidos:** Proveer un catálogo web interactivo (Portal Público) que agilice la selección de productos por parte del cliente antes de contactar a ventas.
- **Gestión comercial (Vendedores):** Centralizar la recepción de pedidos, validación de comprobantes de pago vía WhatsApp y actualización de estados de entrega.
- **Control de inventario (Administrador):** Registrar ingresos, salidas y devoluciones, detectando niveles bajos de stock en tiempo real.
- **Toma de decisiones:** Habilitar un Dashboard estadístico interactivo y la capacidad de exportar reportes formales de inventario en formato PDF.
- **Seguridad:** Administrar accesos estrictos mediante roles (Cliente, Vendedor, Administrador).

## 4. Problema de software

El problema central de gestión es la fragmentación técnica: la atención al cliente (WhatsApp) está desconectada del control de inventario y de la consolidación de métricas. Se requiere diseñar y desarrollar una aplicación web con arquitectura dividida (Portal Público vs. Portal Privado) conectada a una API centralizada. Esta solución debe garantizar que una intención de compra generada en la web, validada por un vendedor, impacte inmediatamente el inventario y se refleje en las estadísticas del administrador.

## 5. Consecuencias que se busca evitar o reducir

De acuerdo con el modelo híbrido planteado, el sistema pretende mitigar los siguientes riesgos:

- Pérdida de ventas (leads) por demoras en la atención manual de cotizaciones por WhatsApp.
- Descuadres de inventario ocasionados por no tener los despachos enlazados automáticamente con las existencias.
- Errores operativos al procesar validaciones de pago de forma desorganizada.
- Dificultad para evaluar el rendimiento financiero y operativo por la falta de tableros de control (Dashboards) y reportes consolidados (PDF).

## 6. Información pendiente de validar

Antes de arrancar la fase de desarrollo de las interfaces (Frontend), se debe confirmar con Fresitas:

- El flujo exacto de validación de pagos (qué comprobantes se exigen en WhatsApp).
- Las métricas específicas que la administración considera críticas para mostrar en el Dashboard estadístico.
- Los datos legales o formatos específicos que deben incluir los reportes exportables en PDF.

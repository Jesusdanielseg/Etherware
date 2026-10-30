
# Épica 02: Gestión de Entregas y Despachos

**Descripción:** Esta épica cubre el ciclo de vida logístico de Fresitas, desde que una venta es confirmada hasta que el producto llega a las manos del cliente, asegurando la trazabilidad y la responsabilidad del domiciliario.

---

## US-ENT-01: Registro de órdenes de venta

**Relación:** RF-005
**Prioridad:** Alta
**Estimación (Puntos de Historia):** *Por definir en Sprint Planning*

**Historia:**

> **Como** Vendedor (o Coordinador Logístico)
> **Quiero** registrar una orden de venta confirmada con los datos del cliente y los productos
> **Para** formalizar la venta e iniciar el proceso de despacho.

**Criterios de Aceptación:**

1. El sistema debe permitir asociar la orden a un cliente existente (Lead) o crear uno rápido (Nombre, Teléfono, Dirección).
2. Se deben seleccionar los productos vendidos y calcular el total automáticamente.
3. Al guardar, el sistema debe descontar temporalmente o alertar sobre el stock de insumos correspondientes (Relación con Inventarios).
4. El estado inicial de la orden debe ser estrictamente "Pendiente".

---

## US-ENT-02: Asignación de repartidores

**Relación:** RF-006
**Prioridad:** Alta

**Historia:**

> **Como** Coordinador Logístico
> **Quiero** asignar uno o varios pedidos a un repartidor específico
> **Para** delegar la responsabilidad de la entrega de forma organizada.

**Criterios de Aceptación:**

1. La vista debe mostrar una lista de todas las órdenes en estado "Pendiente".
2. Debe existir un selector desplegable con los usuarios que tengan el rol "Repartidor".
3. El sistema debe permitir seleccionar múltiples órdenes simultáneamente para asignarlas en

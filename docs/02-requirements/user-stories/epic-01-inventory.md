	

# Épica 01: Gestión de Inventarios

**Descripción:** Esta épica abarca todas las funcionalidades necesarias para que Fresitas pueda controlar las entradas, salidas, niveles de stock y costos de sus insumos (fresas, crema, empaques, etc.) en tiempo real.

---

## US-INV-01: Registro de movimientos (Entradas/Salidas)

**Relación:** RF-001
**Prioridad:** Alta
**Estimación (Puntos de Historia):** *Por definir en Sprint Planning*

**Historia:**

> **Como** Encargado de Bodega
> **Quiero** registrar las entradas y salidas de cada insumo
> **Para** mantener un control exacto y justificado de lo que hay en el almacén.

**Criterios de Aceptación:**

1. El sistema debe permitir seleccionar un insumo existente de una lista desplegable o mediante búsqueda.
2. Se debe especificar el tipo de movimiento (Entrada o Salida).
3. Se debe ingresar la cantidad numérica (entero o decimal según el tipo de medida).
4. El sistema debe registrar automáticamente la fecha, hora y el usuario que realiza el movimiento.
5. (Opcional pero recomendado) Permitir agregar una nota o motivo del movimiento (ej. "Compra a proveedor", "Merma por daño").

---

## US-INV-02: Control de stock en tiempo real

**Relación:** RF-002
**Prioridad:** Alta

**Historia:**

> **Como** Administrador General
> **Quiero** visualizar una tabla con el stock actualizado en tiempo real
> **Para** saber exactamente con cuánta materia prima cuento para operar.

**Criterios de Aceptación:**

1. La vista principal del inventario debe mostrar un listado con: Nombre del insumo, Categoría, Unidad de medida y Stock actual.
2. El stock actual debe recalcularse automáticamente cada vez que se ejecute la US-INV-01.
3. La tabla debe permitir búsqueda por nombre de insumo.

---

## US-INV-03: Alertas de escasez de insumos

**Relación:** RF-003
**Prioridad:** Media

**Historia:**

> **Como** Encargado de Bodega
> **Quiero** recibir una alerta visual cuando un insumo esté próximo a agotarse
> **Para** solicitar una nueva compra antes de detener la producción.

**Criterios de Aceptación:**

1. Cada insumo debe tener un campo configurable llamado "Stock Mínimo".
2. Si el "Stock actual" es menor o igual al "Stock Mínimo", el sistema debe resaltar el registro (por ejemplo, con texto rojo o un ícono de advertencia).
3. Se debe incluir un filtro rápido en la tabla que muestre únicamente los "Insumos por agotar".

---

## US-INV-04: Reportes de inventario

**Relación:** RF-004, RNF-010
**Prioridad:** Media

**Historia:**

> **Como** Administrador General
> **Quiero** exportar un reporte del inventario actual en formato PDF y Excel
> **Para** realizar auditorías contables y analizar el valor total de los insumos almacenados.

**Criterios de Aceptación:**

1. La vista de inventario debe contener un botón de "Exportar".
2. Al hacer clic, debe permitir elegir el formato: PDF o CSV/Excel.
3. El archivo generado debe incluir la fecha de generación y las columnas: Insumo, Stock Actual y Costo Unitario (si aplica).

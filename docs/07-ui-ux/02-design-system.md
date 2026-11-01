# Sistema de Diseño y Accesibilidad

**Descripción:** Este documento establece las reglas visuales, la paleta de colores institucional y los criterios de usabilidad que deben aplicarse durante la maquetación (Bootstrap 5, Chart.js) adaptados a la arquitectura híbrida (Catálogo Público + ERP Privado).

## 1. Paleta de Colores Institucional

La identidad visual principal utiliza tonos morados y lilas para transmitir frescura y un carácter artesanal. Se incluye un color de acento funcional exclusivo para el cierre de ventas.

- **Fondo claro / Superficies:** `#F2D3F8`
- **Módulos / Tarjetas:** `#B19EDC`
- **Color primario / Navbar:** `#B496DB`
- **Acentos secundarios:** `#B7ABDB`
- **Fondos degradados:** `#C3AFDB`
- **Acción Principal (Checkout):** Verde WhatsApp (`#25D366`)

## 2. Estilos de Interfaz (UI)

El diseño se divide según el entorno de uso:

- **Portal Público (Catálogo):**
  - **Enfoque:** *Mobile-First*. Interfaces visuales atractivas con imágenes grandes.
  - **Botones de Acción:** Color morado oscuro para "Agregar al carrito" y Verde WhatsApp obligatorio para el botón de "Confirmar Pedido".
  - **Tarjetas (Cards):** Fondo blanco o `#F2D3F8`, sombra suave y esquinas redondeadas para los productos.
- **Portal Privado (Administración/Ventas):**
  - **Enfoque:** *Desktop-First*. Interfaces densas en datos.
  - **Componentes:** Tablas de datos (DataGrids) para inventario, gráficos de Chart.js para el Dashboard y modales para la validación de comprobantes de pago.
  - **Formularios:** Bordes en tono lila y mensajes de error en colores de alerta semánticos de Bootstrap (rojo/naranja) para prevenir fallos operativos.

## 3. Criterios de Usabilidad (UX)

El desarrollo debe cumplir con los 5 criterios fundamentales aplicados al modelo de "fricción cero":

1. **Facilidad de aprendizaje:** El cliente no necesita tutoriales ni cuentas; el flujo es simplemente navegar, agregar y exportar a WhatsApp.
2. **Eficiencia de uso:** Minimizar los clics. El carrito debe estar siempre accesible y el checkout debe exigir solo los datos estrictamente necesarios (dirección).
3. **Memorabilidad:** Uso de iconografía universal (un carrito para compras, un engranaje para configuración, un icono de WhatsApp para enviar).
4. **Prevención de errores:** Deshabilitar el botón de envío si el carrito está vacío o faltan datos de envío, emitiendo alertas claras antes del salto a WhatsApp.
5. **Satisfacción subjetiva:** Garantizar una experiencia agradable a través de una interfaz limpia y sin sobrecarga cromática.

## 4. Pautas de Accesibilidad (WCAG)

- **Perceptibilidad:** Añadir atributos `alt` a todas las imágenes de los productos del catálogo para compatibilidad con lectores de pantalla.
- **Operabilidad:** Permitir que los modales del carrito y los formularios del panel administrativo puedan navegarse utilizando la tecla `Tab` del teclado.
- **Comprensibilidad:** Instrucciones claras en la vista de checkout para explicarle al cliente que el pago y la coordinación se realizarán directamente por WhatsApp.
- **Robustez:** Código HTML5 semántico (`<header>`, `<main>`, `<section>`, `<article>`) para asegurar el renderizado correcto en cualquier navegador móvil o de escritorio.
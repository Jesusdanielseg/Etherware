
# Sistema de Diseño y Accesibilidad — Etherware

**Descripción:** Este documento establece las reglas visuales, los tokens de color reales aprobados en los mockups de alta fidelidad (Figma) y los criterios de usabilidad y accesibilidad que deben aplicarse durante la maquetación front-end (**HTML5 semántico, CSS3 moderno con variables y JavaScript**) para la arquitectura híbrida de **Etherware** (Tienda Pública + Panel Administrativo + Vista Móvil Repartidor).

---

## 1. Paleta de Colores Institucional (Design Tokens)

La identidad visual principal utiliza una estética artesanal, limpia y apetitosa basada en tonos **rojo fresa intenso** sobre fondos **blanco crema**, complementada con estados semánticos claros para la gestión operativa y un color de acento exclusivo para el cierre de ventas por WhatsApp.

### Tokens CSS (`:root`)

* **Color Primario (Marca / Botones CTA / Estado Activo Sidebar):** `#D92B4B` (Rojo fresa intenso — texto `#FFFFFF`).
* **Primario Hover / Énfasis:** `#B91C3C`
* **Acento Suave / Fondos Destacados (Banners / Resumen de Orden):** `#FFF1F2` (Rosa crema pastel).
* **Fondo General de Aplicación:** `#FAFAFA` (Blanco cálido neutro).
* **Superficies / Tarjetas / Tablas:** `#FFFFFF` con borde sutil `#E5E7EB` y sombra suave (`0 4px 12px rgba(0, 0, 0, 0.05)`).
* **Texto Principal:** `#1F2937` (Gris carbón).
* **Texto Secundario / Metadatos:** `#6B7280` (Gris medio).
* **Acción Principal de Cierre (Checkout WhatsApp):** `#25D366` / `#16A34A` (Verde WhatsApp — texto `#FFFFFF`).

### Estados Semánticos (Tablas de Inventario, Pedidos y Repartidor)

* **Óptimo / Entregado / Validado:** Fondo `#DCFCE7` | Texto `#15803D`
* **Pendiente / En Ruta:** Fondo `#FEF3C7` | Texto `#B45309`
* **Stock Bajo / Crítico / Inactivo:** Fondo `#FEE2E2` | Texto `#B91C1C`

---

## 2. Estilos de Interfaz (UI) por Entorno

El sistema mantiene coherencia cromática y tipográfica (`Inter` / sans-serif moderna, `border-radius` de `8px` a `12px`), adaptando la densidad visual según el rol:

### Portal Público (Catálogo, Carrito y Checkout)

* **Enfoque:** *Responsive / Mobile-First*. Interfaces limpias con fotografías reales de los productos como foco visual.
* **Botones de Acción:** Rojo fresa (`#D92B4B`) para *"Agregar al carrito"* y *"Proceder al pago & entrega"*; Verde WhatsApp obligatorio (`#25D366`) para el botón *"Agendar pedido por WhatsApp"* en `03-checkout`.
* **Tarjetas (Cards):** Fondo blanco (`#FFFFFF`), borde `#E5E7EB`, sombra suave y esquinas redondeadas (`12px`).

### Portal Privado (Dashboard, Inventario, Pedidos y CRM)

* **Enfoque:** *Desktop-First* (`1440px`), con barra lateral fija (`Sidebar`) persistente y navegación directa entre módulos.
* **Componentes:** Tarjetas de KPIs estadísticos, tablas de datos estructuradas (`<table>`) para inventario/pedidos/CRM y ventanas modales (`<dialog>`) para registrar movimientos, validar comprobantes de pago y asignar rutas.
* **Formularios:** Bordes neutros (`#D1D5DB`) con foco en rojo fresa (`#D92B4B`) y alertas semánticas claras para prevenir errores operativos.

### Vista Operativa en Campo (Repartidor Móvil)

* **Enfoque:** *Mobile-First* (`390x844 px`), alto contraste y botones de acción táctiles de ancho completo (*"Iniciar ruta"*, *"Confirmar entrega"*).

---

## 3. Criterios de Usabilidad (UX)

El desarrollo front-end debe cumplir con los 5 criterios fundamentales aplicados al modelo de "fricción cero":

1. **Facilidad de aprendizaje:** El cliente público no requiere registro ni inicio de sesión; el flujo es lineal: explorar catálogo, ajustar carrito y enviar pedido a WhatsApp.
2. **Eficiencia de uso:** Minimizar los clics. El acceso al carrito con contador dinámico está siempre visible en la barra superior y el checkout solicita únicamente los datos indispensables (nombre, teléfono, barrio, dirección y método de pago).
3. **Memorabilidad:** Uso de iconografía universal y consistente (carrito para compras, lupa para búsqueda, usuario para acceso interno, icono de WhatsApp para envío y badges de color para estados).
4. **Prevención de errores:** Deshabilitar el botón de envío si el carrito está vacío o si faltan campos obligatorios en el checkout, mostrando mensajes de validación claros antes de abrir la API de WhatsApp.
5. **Satisfacción subjetiva:** Garantizar una experiencia visual agradable mediante jerarquía clara, espacios en blanco equilibrados y una paleta coherente sin sobrecarga cromática.

---

## 4. Pautas de Accesibilidad (WCAG)

* **Perceptibilidad:** Incluir atributos `alt` descriptivos en todas las fotografías de productos del catálogo y asegurar suficiente contraste de color entre texto y fondo en botones y badges.
* **Operabilidad:** Permitir que todos los enlaces, botones, modales y formularios tanto de la tienda como del panel administrativo puedan navegarse y activarse mediante teclado (`Tab` y `Enter`).
* **Comprensibilidad:** Mostrar instrucciones claras en `03-checkout` indicando al cliente que el cierre, validación de pago y coordinación de entrega se realizan directamente por WhatsApp.
* **Robustez:** Utilizar código **HTML5 semántico** (`<header>`, `<nav>`, `<main>`, `<aside>`, `<section>`, `<article>`, `<table>`, `<form>`) para garantizar compatibilidad en navegadores móviles y de escritorio.

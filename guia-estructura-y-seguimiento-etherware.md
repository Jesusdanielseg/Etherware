# Guía de estructura y seguimiento de Etherware

El **Stack Oficial de Etherware** será:

* **Frontend (Vista):** HTML5, CSS3, y JavaScript (Vanilla) renderizado de forma responsiva para móviles y escritorio.
* **Backend (Controlador):** Python con el framework FastAPI (o Flask). Esto te permite crear una API REST rápida, segura y aplicar el manejo de entornos virtuales (`venv`) y variables de entorno (`.env`) que ya dominas.
* **Base de Datos (Modelo):** SQLite para la fase de desarrollo local (es rápido y vive en un solo archivo) y PostgreSQL para el despliegue en producción, manipulados a través de un ORM en Python (como SQLAlchemy o SQLModel) para mantener las transacciones cortas que estipulaste^^.

Para programar, la estructura sera
Etherware
├── Inicio
│   ├── Catalogo de productos
│   │   ├── Detalle de producto
│   │   └── Agregar al carrito
│   ├── Registro
│   └── Iniciar sesion
│       ├── Recuperar contrasena
│       ├── Mi cuenta
│       └── Panel administrador
├── Carrito de compras
│   ├── Modificar cantidad
│   ├── Eliminar producto
│   └── Confirmacion de pedido
│       ├── Direccion de entrega
│       ├── Forma de pago
│       └── Validacion de errores
└── Panel administrador
    ├── Gestion de inventario
    │   ├── Consultar stock
    │   └── Actualizar inventario
    ├── Gestion de pedidos
    │   ├── Consultar pedidos
    │   └── Cambiar estado de pedido
    └── Reportes
        ├── Reporte de ventas
        └── Reporte de inventario

## 1. `database/` --- Base de datos

Contiene scripts para crear, modificar, inicializar y mantener la base
de datos.

```text
database/
├── sql/
├── migrations/
└── seeds/
```

* **`sql/`**: scripts SQL principales: tablas, relaciones,
  restricciones, índices, vistas y procedimientos si se usan. Ejemplo:
  `schema.sql`.
* **`migrations/`**: cambios ordenados a la estructura de la base de
  datos. Ejemplo: `001_create_products.sql`.
* **`seeds/`**: datos iniciales o ficticios para pruebas. Ejemplo:
  categorías y roles predeterminados.

**No guardar aquí:** diagramas (van en `docs/06-database/diagrams/`),
credenciales, datos reales de clientes ni copias de seguridad con
información privada.

**SENA relacionado:** GA6-220501096-AA1 y AA2: normalización, modelos,
objetos de base de datos y scripts SQL.

## 2. `docs/` --- Documentación

Contiene documentos que explican el propósito, requisitos, diseño,
funcionamiento, pruebas y uso de Etherware.

```text
docs/
├── 01-project/
├── 02-requirements/
│   └── user-stories/
├── 03-processes/
├── 04-scrum/
├── 05-architecture/
│   └── diagrams/
├── 06-database/
│   └── diagrams/
├── 07-ui-ux/
│   └── wireframes/
├── 08-api/
├── 09-testing/
│   ├── test-plans/
│   ├── test-cases/
│   └── test-reports/
├── 10-deployment/
├── 11-maintenance/
├── 12-user-guides/
└── 13-decisions/
```

---

  Carpeta                             Contenido

---

  `01-project/`                       Contexto, objetivos, alcance y
                                      descripción general.

  `02-requirements/`                  Requisitos funcionales/no
                                      funcionales, historias y criterios
                                      de aceptación.

  `03-processes/`                     Procesos de Fresitas y flujos que
                                      apoyará el sistema.

  `04-scrum/`                       Lo que vaya por fuera

  `05-architecture/`                  Arquitectura, UML, componentes y
                                      despliegue.

  `06-database/`                      Modelos conceptuales, lógicos,
                                      relacionales y diagramas.

  `07-ui-ux/`                         Prototipos, wireframes, navegación,
                                      usabilidad y accesibilidad.

  `08-api/`                           Contratos, rutas y especificaciones
                                      de API.

  `09-testing/`                       Planes, casos e informes de
                                      pruebas.

  `10-deployment/`                    Instalación, configuración y
                                      despliegue.

  `11-maintenance/`                   Mantenimiento, soporte, respaldo y
                                      recuperación.

  `12-user-guides/`                   Manuales y capacitación para
                                      usuarios.

`13-decisions/`                     Decisiones técnicas y de producto,
                                      con sus motivos.-

Usa `.md` para documentos; `.drawio`, `.puml` o `.mmd` para diagramas
editables; `.png` o `.svg` para exportaciones útiles.

**SENA relacionado:** formulación, procesos, requisitos, Scrum, UML,
arquitectura, UI/UX, API, pruebas, despliegue, mantenimiento y manuales.

## 3. `scripts/` --- Automatizaciones auxiliares

Contiene herramientas pequeñas para automatizar tareas repetitivas. No
contiene el código principal de la aplicación.

```text
scripts/
├── setup/
├── database/
├── development/
└── README.md
```

* **`setup/`**: preparación del entorno y comprobación de
  dependencias.
* **`database/`**: tareas automatizadas de respaldo o restauración,
  cuando se implementen de forma segura.
* **`development/`**: inicio de servicios, limpieza de temporales y
  otras ayudas de desarrollo.

Ejemplos posibles: `setup_environment.sh`, `backup_db.py`,
`clean_cache.py`.

Documenta cómo ejecutar cada script. No incluyas contraseñas, tokens ni
archivos `.env`. No hay una actividad SENA que deba trasladarse aquí
obligatoriamente: agrega scripts cuando resuelvan una necesidad real.

## 4. `src/` --- Código fuente

Contiene el código principal que hace funcionar Etherware.

```text
src/
├── frontend/
├── backend/
└── mobile/
```

* **`frontend/`**: interfaz web, pantallas, componentes, estilos y
  navegación.
* **`backend/`**: lógica del servidor, reglas de negocio,
  autenticación, servicios y controladores.
* **`mobile/`**: aplicación móvil independiente, si finalmente forma
  parte del alcance.

La organización interna dependerá de las tecnologías y la arquitectura
que el equipo elija. No es necesario definirla antes de tiempo.

**No guardar aquí:** documentación, diagramas, scripts auxiliares
generales ni dependencias descargadas. Las dependencias se administran
con las herramientas del lenguaje y se excluyen del repositorio cuando
corresponda.

**SENA relacionado:** componentes frontend, módulos codificados,
servicios/API, integración y desarrollo móvil si aplica.

## 5. `tests/` --- Pruebas automatizadas

Contiene código que comprueba que Etherware funciona correctamente.

```text
tests/
├── unit/
├── integration/
└── e2e/
```

* **`unit/`**: pruebas de funciones, validaciones y reglas de negocio
  aisladas.
* **`integration/`**: pruebas de interacción entre módulos, servicios
  y base de datos.
* **`e2e/`**: pruebas de recorridos completos de usuario.

Ejemplos: comprobar que no se registre inventario negativo; verificar
que crear un pedido actualice el inventario; probar el flujo completo de
un pedido.

Los planes, casos documentados e informes van en `docs/09-testing/`. El
código automatizado va aquí.

**SENA relacionado:** GA9-220501096-AA1, AA2 y AA3. Documentos de
pruebas en `docs/09-testing/`; pruebas automatizadas en esta carpeta.

---

## Tablero de seguimiento

Marca cada casilla cuando completes la tarea. No es necesario terminar
una sección entera para empezar otra: trabaja por incrementos y mantén
actualizado el tablero.

## A. Preparación del repositorio

* [X] Crear las cinco carpetas principales.
* [X] Crear subcarpetas iniciales de `database/`.
* [X] Crear la estructura de `docs/`.
* [X] Crear subcarpetas iniciales de `scripts/`.
* [X] Crear `frontend/`, `backend/` y `mobile/` dentro de `src/`.
* [X] Crear `unit/`, `integration/` y `e2e/` dentro de `tests/`.
* [X] Añadir `.gitkeep` solo donde haga falta conservar carpetas
  vacías.
* [X] Revisar que `.gitignore` excluya dependencias, secretos y
  archivos temporales.
* [X] Crear el `README.md` principal.

## B. Base de datos

* [X] Elegir el motor de base de datos.
* [X] Identificar las entidades del sistema.
* [X] Elaborar el modelo entidad-relación.
* [X] Elaborar el modelo relacional.
* [ ] Revisar normalización y restricciones.
* [ ] Crear el script inicial de estructura (`schema.sql`).
* [ ] Crear scripts adicionales solo si son necesarios.
* [ ] Preparar datos ficticios de prueba.
* [ ] Definir cómo se registrarán las migraciones.

## C. Documentación

* [X] Documentar propósito, objetivos y alcance.
* [X] Documentar los procesos de Fresitas que cubrirá Etherware.
* [X] Definir requisitos funcionales.
* [X] Definir requisitos no funcionales.
* [X] Crear historias de usuario y criterios de aceptación.
* [X] Documentar Scrum y sus artefactos.
* [X] Elaborar diagramas de arquitectura y UML necesarios.
* [X] Documentar el diseño de la base de datos.
* [X] Guardar prototipos y decisiones de UI/UX.
* [ ] Documentar la API cuando esté definida.
* [ ] Crear plan y casos de prueba.
* [ ] Documentar instalación y despliegue.
* [ ] Preparar manual de usuario y documentación técnica.
* [ ] Registrar decisiones importantes.

## D. Automatizaciones

* [ ] Identificar tareas repetitivas que convenga automatizar.
* [ ] Crear scripts de preparación del entorno si hacen falta.
* [ ] Crear automatizaciones de base de datos si hacen falta.
* [ ] Documentar cómo ejecutar cada script.
* [ ] Comprobar que no expongan secretos ni destruyan datos
  accidentalmente.

## E. Código fuente

* [X] Elegir tecnologías y arquitectura.
* [X] Preparar el frontend.
* [ ] Preparar el backend.
* [ ] Definir la comunicación entre frontend y backend.
* [ ] Implementar el primer módulo funcional.
* [ ] Implementar la conexión con la base de datos.
* [ ] Implementar autenticación y permisos si forman parte del
  alcance.
* [ ] Integrar los módulos progresivamente.
* [ ] Decidir si habrá aplicación móvil independiente.

## F. Pruebas

* [ ] Definir estrategia de pruebas.
* [ ] Configurar herramientas de pruebas.
* [ ] Crear primeras pruebas unitarias.
* [ ] Crear pruebas de integración.
* [ ] Crear pruebas E2E si corresponden.
* [ ] Ejecutar pruebas y corregir errores.
* [ ] Registrar resultados relevantes en `docs/09-testing/`.

## G. Revisión antes de publicar

* [ ] No hay contraseñas, tokens ni claves API.
* [ ] No hay datos personales o comerciales confidenciales.
* [ ] No se subieron dependencias ni temporales innecesarios.
* [ ] La documentación coincide con lo realmente implementado.
* [ ] Los nombres de archivos son claros y consistentes.
* [ ] Los cambios fueron revisados antes de hacer `commit` y `push`.

---

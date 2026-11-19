function configurarTablaConFiltros() {
    const barraBusqueda = document.querySelector(".toolbar-search input");
    const cuerpoTabla = document.querySelector(".data-table tbody");
    const opciones = document.querySelectorAll(".filter-options span, .filter-options button");
    let filas = document.querySelectorAll(".data-table tbody tr");

    if (filas.length === 0) return;

    let filtroActivo = "todos";

    function coincidenFiltros(fila) {
        const texto = fila.textContent.toLowerCase().trim();
        const busqueda = barraBusqueda
            ? barraBusqueda.value.toLowerCase().trim()
            : "";

        if (busqueda && !texto.includes(busqueda)) {
            return false;
        }

        if (filtroActivo === "todos") return true;
        if (filtroActivo === "stock bajo") {
            const estado = fila.querySelector(".badge");
            return estado?.textContent.toLowerCase().includes("bajo") ?? false;
        }
        if (filtroActivo === "nuevo") {
            return texto.includes("nuevo");
        }
        if (filtroActivo === "frecuente") {
            return texto.includes("frecuente");
        }
        if (filtroActivo === "pendientes") {
            return texto.includes("pendiente");
        }
        if (filtroActivo === "en ruta") {
            return texto.includes("en ruta");
        }
        if (filtroActivo === "entregados") {
            return texto.includes("entregado");
        }

        return true;
    }

    function aplicarFiltros() {
        filas.forEach((fila) => {
            fila.hidden = !coincidenFiltros(fila);
        });
    }

    if (barraBusqueda) {
        barraBusqueda.addEventListener("input", aplicarFiltros);
    }

    if (cuerpoTabla) {
        const observador = new MutationObserver(() => {
            filas = document.querySelectorAll(".data-table tbody tr");
            aplicarFiltros();
            configurarAccionesWhatsApp();
        });
        observador.observe(cuerpoTabla, { childList: true });
    }

    opciones.forEach((opcion) => {
        opcion.style.cursor = "pointer";
        opcion.addEventListener("click", () => {
            const texto = opcion.textContent.toLowerCase().trim();
            filtroActivo = texto;

            if (texto.includes("todos")) filtroActivo = "todos";
            if (texto.includes("stock bajo")) filtroActivo = "stock bajo";
            if (texto.includes("nuevos")) filtroActivo = "nuevo";
            if (texto.includes("nuevo")) filtroActivo = "nuevo";
            if (texto.includes("frecuente")) filtroActivo = "frecuente";
            if (texto.includes("pendiente")) filtroActivo = "pendientes";
            if (texto.includes("en ruta")) filtroActivo = "en ruta";
            if (texto.includes("entregado")) filtroActivo = "entregados";

            opciones.forEach((item) => item.classList.remove("active"));
            opcion.classList.add("active");
            aplicarFiltros();
        });
    });
}

function claseEstado(texto) {
    const estado = texto.toLowerCase();
    if (estado.includes("entregado") || estado.includes("óptimo")) {
        return "badge-ok";
    }
    if (estado.includes("pendiente") || estado.includes("ruta") || estado.includes("asignado")) {
        return "badge-warn";
    }
    if (estado.includes("bajo")) {
        return "badge-danger";
    }
    return "badge-warn";
}

function configurarEstadosPedidos() {
    const paginaPedidos = window.location.pathname.includes("pedidos.html");
    if (!paginaPedidos) return;

    const estados = ["Pendiente", "En preparación", "En ruta", "Entregado"];

    document.querySelectorAll(".data-table tbody tr").forEach((fila) => {
        const badge = fila.cells[4]?.querySelector(".badge");
        if (!badge) return;

        badge.style.cursor = "pointer";
        badge.title = "Cambiar estado del repartidor";

        badge.addEventListener("click", () => {
            const estadoActual = badge.textContent.trim();
            const indice = estados.indexOf(estadoActual);
            const siguiente = estados[(indice + 1) % estados.length];

            badge.textContent = siguiente;
            badge.className = `badge ${claseEstado(siguiente)}`;
        });
    });
}

function configurarEstadosRepartidor() {
    if (!window.location.pathname.includes("repartidor.html")) return;

    document.querySelectorAll(".delivery-card").forEach((tarjeta) => {
        const badge = tarjeta.querySelector(".badge");
        const accion = tarjeta.querySelector(".btn");

        if (!badge || !accion) return;

        accion.addEventListener("click", () => {
            const estados = ["Pendiente", "En preparación", "En ruta", "Entregado"];
            const indice = estados.indexOf(badge.textContent.trim());
            const siguiente = estados[(indice + 1) % estados.length];

            badge.textContent = siguiente;
            badge.className = `badge ${claseEstado(siguiente)}`;

            if (siguiente === "Entregado") {
                accion.textContent = "✓  Entrega confirmada";
                accion.className = "btn btn-primary";
                tarjeta.classList.remove("pending");
            } else if (siguiente === "En ruta") {
                accion.textContent = "✓  Confirmar entrega";
                accion.className = "btn btn-primary";
            } else {
                accion.textContent = "↗  Iniciar ruta";
                accion.className = "btn btn-outline";
            }
        });
    });
}

function crearDialogoCRUD(tipo) {
    const esInventario = tipo === "inventario";
    const dialogo = document.querySelector(esInventario ? "#inventory-dialog" : "#crm-dialog");
    const formulario = dialogo?.querySelector("form");
    const cuerpoTabla = document.querySelector(".data-table tbody");
    const botonAbrir = document.querySelector(".toolbar-actions .btn-primary");

    if (!dialogo || !formulario || !cuerpoTabla || !botonAbrir) return;

    let filaEditando = null;

    function abrirModoCrear() {
        filaEditando = null;
        formulario.reset();
        const titulo = dialogo.querySelector("h2");
        const botonGuardar = formulario.querySelector("[type='submit']");
        if (titulo) titulo.textContent = esInventario ? "Registrar movimiento" : "Nuevo prospecto";
        if (botonGuardar) botonGuardar.textContent = esInventario ? "Registrar" : "Agregar";
        dialogo.showModal();
    }

    botonAbrir.addEventListener("click", abrirModoCrear);

    dialogo.querySelectorAll("[data-close-dialog]").forEach((boton) => {
        boton.addEventListener("click", () => {
            filaEditando = null;
            dialogo.close();
        });
    });

    if (esInventario) {
        cuerpoTabla.addEventListener("click", (evento) => {
            const botonEditar = evento.target.closest(".edit-action");
            if (!botonEditar) return;

            filaEditando = botonEditar.closest("tr");
            if (!filaEditando) return;

            formulario.elements.codigo.value = filaEditando.cells[0].textContent.trim();
            formulario.elements.producto.value = filaEditando.cells[1].textContent.trim();
            formulario.elements.categoria.value = filaEditando.cells[2].textContent.trim();
            formulario.elements.stock.value = filaEditando.cells[3].textContent.trim();

            const titulo = dialogo.querySelector("h2");
            const botonGuardar = formulario.querySelector("[type='submit']");
            if (titulo) titulo.textContent = "Editar registro";
            if (botonGuardar) botonGuardar.textContent = "Guardar cambios";
            dialogo.showModal();
        });
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        const datos = new FormData(formulario);

        if (esInventario) {
            const codigo = String(datos.get("codigo"));
            const producto = String(datos.get("producto"));
            const categoria = String(datos.get("categoria"));
            const stockTexto = String(datos.get("stock"));
            const numeroStock = Number.parseFloat(stockTexto);
            const estadoStock = stockTexto.toLowerCase().includes("bajo") ||
                (Number.isFinite(numeroStock) && numeroStock <= 5)
                ? "Bajo"
                : "Óptimo";

            if (filaEditando) {
                filaEditando.cells[0].textContent = codigo;
                filaEditando.cells[1].textContent = producto;
                filaEditando.cells[2].textContent = categoria;
                filaEditando.cells[3].textContent = stockTexto;
                filaEditando.cells[4].innerHTML =
                    `<span class="badge ${claseEstado(estadoStock)}">${estadoStock}</span>`;
                filaEditando = null;
                dialogo.close();
                return;
            }

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${codigo}</td>
                <td>${producto}</td>
                <td>${categoria}</td>
                <td>${stockTexto}</td>
                <td><span class="badge ${claseEstado(estadoStock)}">${estadoStock}</span></td>
                <td><button class="edit-action" type="button" aria-label="Editar ${producto}">✎</button></td>
            `;
            cuerpoTabla.appendChild(fila);
        } else {
            const segmento = String(datos.get("segmento"));
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${datos.get("cliente")}</td>
                <td>${datos.get("whatsapp")}</td>
                <td>Nuevo registro</td>
                <td><span class="badge ${segmento === "Nuevo" ? "badge-warn" : "badge-pink"}">${segmento}</span></td>
                <td><button class="whatsapp-contact" type="button">Enviar msg</button></td>
            `;
            cuerpoTabla.appendChild(fila);
        }

        formulario.reset();
        dialogo.close();
    });
}

function configurarAccionesWhatsApp() {
    const campaña = document.querySelector("#whatsapp-campaign");
    if (campaña && !campaña.dataset.configurado) {
        campaña.dataset.configurado = "true";
        campaña.addEventListener("click", () => {
            const clientesVisibles = document.querySelectorAll(
                ".data-table tbody tr:not([hidden])"
            ).length;
            window.mostrarToast(
                `Simulación: campaña programada para los ${clientesVisibles} clientes filtrados.`
            );
        });
    }

    if (!window.location.pathname.includes("crm.html")) return;

    document.querySelectorAll(".data-table tbody tr").forEach((fila) => {
        const accion = fila.cells[4];
        const telefono = fila.cells[1]?.textContent.replace(/\D/g, "");
        if (!accion || !telefono) return;
        if (!accion.dataset.whatsappConfigurado) {
            accion.dataset.whatsappConfigurado = "true";
            accion.style.cursor = "pointer";
            accion.addEventListener("click", () => {
                const mensaje = encodeURIComponent(
                    "Hola, te escribimos de Etherware para darte seguimiento a tu pedido."
                );
                window.open(`https://wa.me/57${telefono}?text=${mensaje}`, "_blank", "noopener,noreferrer");
            });
        }
    });
}

function configurarAccionesSimuladas() {
    document.querySelectorAll(".toolbar-actions .btn-secondary").forEach((boton) => {
        if (boton.dataset.simulado) return;
        boton.dataset.simulado = "true";
        boton.addEventListener("click", () => {
            window.mostrarToast("Preparando reporte para impresión o descarga PDF...");
            window.setTimeout(() => window.print(), 350);
        });
    });

    if (window.location.pathname.includes("repartidor.html")) {
        document.querySelectorAll(".delivery-card").forEach((tarjeta) => {
            const botonMapa = tarjeta.querySelector(".map-button");
            const direccion = tarjeta.querySelector(".address");
            if (!botonMapa || !direccion) return;

            botonMapa.addEventListener("click", () => {
                const destino = encodeURIComponent(
                    `${direccion.textContent.trim()}, Colombia`
                );
                window.open(
                    `https://www.google.com/maps/search/?api=1&query=${destino}`,
                    "_blank",
                    "noopener,noreferrer"
                );
            });
        });
    }

    if (window.location.pathname.includes("pedidos.html")) {
        let dialogo = document.querySelector("#receipt-dialog");
        if (!dialogo) {
            dialogo = document.createElement("dialog");
            dialogo.id = "receipt-dialog";
            dialogo.className = "admin-dialog";
            dialogo.innerHTML = `
                <form method="dialog" id="receipt-form">
                    <h2>Factura del pedido</h2>
                    <div class="invoice-details"></div>
                    <div class="dialog-actions">
                        <button class="btn btn-primary" type="submit">Cerrar</button>
                    </div>
                </form>
            `;
            document.body.appendChild(dialogo);
        }

        document.querySelectorAll(".data-table tbody tr").forEach((fila) => {
            const accion = fila.cells[5];
            if (!accion) return;
            if (accion.dataset.receiptConfigured) return;

            accion.style.cursor = "pointer";
            accion.dataset.receiptConfigured = "true";
            accion.addEventListener("click", () => {
                const titulo = dialogo.querySelector("h2");
                const detalles = dialogo.querySelector(".invoice-details");
                if (titulo) {
                    titulo.textContent = `Factura - Pedido ${fila.cells[0].textContent.trim()}`;
                }
                if (detalles) {
                    detalles.innerHTML = `
                        <div><strong>Cliente:</strong> ${fila.cells[1].textContent.trim()}</div>
                        <div><strong>Total:</strong> ${fila.cells[2].textContent.trim()}</div>
                        <div><strong>Método de pago:</strong> ${fila.cells[3].textContent.trim()}</div>
                        <div><strong>Repartidor:</strong> ${fila.cells[4].textContent.trim()}</div>
                    `;
                }
                dialogo.showModal();
            });
        });
    }
}

function configurarAsignacionRuta() {
    if (!window.location.pathname.includes("pedidos.html")) return;

    const boton = document.querySelector("#assign-route");
    if (!boton) return;

    boton.addEventListener("click", () => {
        let dialogo = document.querySelector("#route-dialog");
        if (!dialogo) {
            dialogo = document.createElement("dialog");
            dialogo.id = "route-dialog";
            dialogo.className = "admin-dialog";
            dialogo.innerHTML = `
                <form method="dialog" id="route-form">
                    <h2>Asignar repartidor</h2>
                    <label>
                        Pedido
                        <select name="pedido">
                            ${Array.from(document.querySelectorAll(".data-table tbody tr"))
                                .map((fila) => {
                                    const id = fila.cells[0]?.textContent.trim();
                                    return `<option value="${id}">${id}</option>`;
                                }).join("")}
                        </select>
                    </label>
                    <label>
                        Repartidor
                        <select name="repartidor">
                            <option>Juan Díaz</option>
                            <option>Kevin Alzate</option>
                            <option>Sin asignar</option>
                        </select>
                    </label>
                    <div class="dialog-actions">
                        <button class="btn btn-secondary" type="button" data-close-route>Cancelar</button>
                        <button class="btn btn-primary" type="submit">Asignar</button>
                    </div>
                </form>
            `;
            document.body.appendChild(dialogo);

            dialogo.querySelector("[data-close-route]").addEventListener("click", () => {
                dialogo.close();
            });

            dialogo.querySelector("#route-form").addEventListener("submit", (evento) => {
                evento.preventDefault();
                const datos = new FormData(evento.currentTarget);
                const pedido = datos.get("pedido");
                const repartidor = datos.get("repartidor");
                const fila = Array.from(document.querySelectorAll(".data-table tbody tr"))
                    .find((item) => item.cells[0]?.textContent.trim() === pedido);

                if (fila) {
                    const badge = fila.cells[4]?.querySelector(".badge");
                    if (badge) {
                        badge.textContent = repartidor === "Sin asignar"
                            ? "Pendiente"
                            : "En preparación";
                        badge.className = `badge ${claseEstado(badge.textContent)}`;
                    }
                    window.mostrarToast(
                        repartidor === "Sin asignar"
                            ? `Pedido ${pedido} dejado sin asignar.`
                            : `Pedido ${pedido} asignado a ${repartidor}.`
                    );
                }

                dialogo.close();
            });
        }

        dialogo.showModal();
    });
}

configurarTablaConFiltros();
configurarEstadosPedidos();
configurarEstadosRepartidor();
configurarAccionesWhatsApp();
configurarAccionesSimuladas();
configurarAsignacionRuta();

if (window.location.pathname.includes("inventario.html")) {
    crearDialogoCRUD("inventario");
}

if (window.location.pathname.includes("crm.html")) {
    crearDialogoCRUD("crm");
}

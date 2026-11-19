const CART_KEY = "etherware_cart";

const defaultCart = [
    {
        id: "1",
        nombre: "Fresas con crema clásica",
        precio: 8000,
        cantidad: 2,
        imagen: "assets/img/fresas-crema-clasica.png"
    },
    {
        id: "3",
        nombre: "Fresas con crema con arequipe",
        precio: 9500,
        cantidad: 1,
        imagen: "assets/img/fresas-crema-arequipe.png"
    },
    {
        id: "6",
        nombre: "Combo familiar (4 porciones)",
        precio: 28000,
        cantidad: 1,
        imagen: "assets/img/combo-familiar-fresas.png"
    }
];

function leerCarrito() {
    const guardado = localStorage.getItem(CART_KEY);

    if (!guardado) {
        return defaultCart.map((producto) => ({ ...producto }));
    }

    try {
        const carrito = JSON.parse(guardado);
        return Array.isArray(carrito) ? carrito : [];
    } catch {
        return [];
    }
}

let carrito = leerCarrito();

function formatoPesos(valor) {
    return new Intl.NumberFormat("es-CO").format(valor);
}

function guardarCarrito() {
    localStorage.setItem(CART_KEY, JSON.stringify(carrito));
    actualizarContador();
    renderizarCarrito();
    renderizarCheckout();
}

function actualizarContador() {
    const contador = document.querySelectorAll("#cart-count");
    const cantidadTotal = carrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
    );

    contador.forEach((elemento) => {
        elemento.textContent = String(cantidadTotal);
        elemento.hidden = cantidadTotal === 0;
    });
}

function obtenerRutaImagen(imagen) {
    if (window.location.pathname.includes("/pages/")) {
        return `../${imagen}`;
    }

    return imagen;
}

function renderizarCarrito() {
    const contenedor = document.querySelector(".cart-list");
    if (!contenedor) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="empty-cart">
                <p>Tu carrito está vacío.</p>
                <a class="btn btn-primary" href="../index.html#productos">Ver productos</a>
            </div>
        `;
    } else {
        contenedor.innerHTML = carrito.map((producto) => `
            <article class="cart-item" data-id="${producto.id}">
                <img src="${obtenerRutaImagen(producto.imagen)}" alt="${producto.nombre}">
                <div class="cart-item-info">
                    <h3>${producto.nombre}</h3>
                    <div class="quantity-control" aria-label="Cantidad de ${producto.nombre}">
                        <span class="quantity-label">Cantidad:</span>
                        <button type="button" data-action="disminuir" aria-label="Disminuir cantidad">−</button>
                        <span>${producto.cantidad}</span>
                        <button type="button" data-action="aumentar" aria-label="Aumentar cantidad">+</button>
                    </div>
                </div>
                <strong>$ ${formatoPesos(producto.precio * producto.cantidad)}</strong>
                <button class="remove-item" type="button" data-action="eliminar" aria-label="Eliminar ${producto.nombre}">×</button>
            </article>
        `).join("");
    }

    const total = carrito.reduce(
        (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
        0
    );
    const totalElemento = document.querySelector(".cart-total strong");
    if (totalElemento) {
        totalElemento.textContent = `$ ${formatoPesos(total)}`;
    }
}

function renderizarCheckout() {
    const resumen = document.querySelector(".order-summary");
    if (!resumen) return;

    const total = carrito.reduce(
        (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
        0
    );

    const filas = carrito.map((producto) => `
        <div class="summary-row">
            <span>${producto.cantidad}x ${producto.nombre}</span>
            <strong>$${formatoPesos(producto.precio * producto.cantidad)}</strong>
        </div>
    `).join("");

    resumen.innerHTML = `
        <h2>Resumen de tu orden</h2>
        ${filas || '<p class="text-muted">Tu carrito está vacío.</p>'}
        <div class="summary-divider"></div>
        <div class="summary-meta"><span>Subtotal</span><strong>$${formatoPesos(total)}</strong></div>
        <div class="summary-meta"><span>Domicilio</span><strong>Por convenir</strong></div>
        <div class="summary-total"><span>Total a pagar:</span><span>$ ${formatoPesos(total)}</span></div>
        <button class="btn btn-whatsapp" type="submit" form="checkout-form" ${carrito.length === 0 ? "disabled" : ""}>● Agendar pedido por WhatsApp</button>
    `;
}

function configurarBotonesAgregar() {
    document.querySelectorAll(".product-card button").forEach((boton) => {
        boton.addEventListener("click", () => {
            const tarjeta = boton.closest(".product-card");
            const id = boton.dataset.id;
            const nombre = tarjeta.querySelector("h3").textContent.trim();
            const precio = Number(
                tarjeta.querySelector(".price").textContent
                    .replace(/[^0-9]/g, "")
            );
            const imagen = tarjeta.querySelector("img").getAttribute("src");
            const existente = carrito.find((producto) => producto.id === id);

            if (existente) {
                existente.cantidad += 1;
            } else {
                carrito.push({ id, nombre, precio, cantidad: 1, imagen });
            }

            guardarCarrito();
            boton.textContent = "¡Agregado!";
            window.setTimeout(() => {
                boton.textContent = "Agregar al carrito";
            }, 800);
        });
    });
}

function configurarControlesCarrito() {
    const contenedor = document.querySelector(".cart-list");
    if (!contenedor) return;

    contenedor.addEventListener("click", (evento) => {
        const boton = evento.target.closest("button[data-action]");
        if (!boton) return;

        const item = boton.closest(".cart-item");
        if (!item) return;

        const producto = carrito.find(
            (elemento) => elemento.id === item.dataset.id
        );
        if (!producto) return;

        if (boton.dataset.action === "aumentar") {
            producto.cantidad += 1;
        }

        if (boton.dataset.action === "disminuir") {
            producto.cantidad -= 1;
            if (producto.cantidad <= 0) {
                carrito = carrito.filter((elemento) => elemento.id !== producto.id);
            }
        }

        if (boton.dataset.action === "eliminar") {
            carrito = carrito.filter((elemento) => elemento.id !== producto.id);
        }

        guardarCarrito();
    });
}

function configurarBusqueda() {
    const busqueda = document.querySelector(".search-box input");
    if (!busqueda) return;

    busqueda.addEventListener("input", () => {
        const texto = busqueda.value.toLowerCase().trim();

        document.querySelectorAll(".product-card").forEach((tarjeta) => {
            const coincide = tarjeta
                .querySelector("h3")
                .textContent
                .toLowerCase()
                .includes(texto);
            tarjeta.hidden = !coincide;
        });
    });
}

function configurarCheckout() {
    const formulario = document.querySelector("#checkout-form");
    if (!formulario) return;

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        if (carrito.length === 0) {
            window.alert("Tu carrito está vacío.");
            return;
        }

        const datos = new FormData(formulario);
        const nombre = String(datos.get("name") || "").trim();
        const telefono = String(datos.get("phone") || "").trim();
        const barrio = String(datos.get("sector") || "").trim();
        const direccion = String(datos.get("address") || "").trim();
        const metodo = String(datos.get("payment") || "").trim();
        const observaciones = String(datos.get("notes") || "").trim();
        const total = carrito.reduce(
            (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
            0
        );
        const productos = carrito
            .map((producto) => `• ${producto.cantidad}x ${producto.nombre} - $${formatoPesos(producto.precio * producto.cantidad)}`)
            .join("\n");

        const mensaje = [
            "Hola, quiero confirmar mi pedido en Etherware:",
            "",
            productos,
            "",
            `Subtotal: $${formatoPesos(total)}`,
            "Domicilio: Por convenir",
            `Total: $${formatoPesos(total)}`,
            "",
            `Nombre: ${nombre}`,
            `Teléfono: ${telefono}`,
            `Barrio: ${barrio}`,
            `Dirección: ${direccion}`,
            `Método de pago: ${metodo}`,
            `Observaciones: ${observaciones || "Ninguna"}`
        ].join("\n");

        if (!window.confirm("¿Confirmar el pedido y abrir WhatsApp?")) return;

        window.open(
            `https://wa.me/573000000000?text=${encodeURIComponent(mensaje)}`,
            "_blank",
            "noopener,noreferrer"
        );
        localStorage.removeItem(CART_KEY);
        carrito = [];
        actualizarContador();
        renderizarCarrito();
        renderizarCheckout();
    });
}

actualizarContador();
renderizarCarrito();
renderizarCheckout();
configurarBotonesAgregar();
configurarControlesCarrito();
configurarBusqueda();
configurarCheckout();
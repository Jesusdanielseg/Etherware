// Utilidad global de moneda usada en las vistas públicas y administrativas.
window.formatearCOP = function formatearCOP(valor) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(valor);
};

// Muestra feedback temporal para acciones simuladas o pendientes de backend.
window.mostrarToast = function mostrarToast(mensaje) {
    let toast = document.querySelector(".app-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.className = "app-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.appendChild(toast);
    }

    toast.textContent = mensaje;
    toast.classList.add("visible");
    window.clearTimeout(window.__etherwareToastTimer);
    window.__etherwareToastTimer = window.setTimeout(() => {
        toast.classList.remove("visible");
    }, 3500);
};

function configurarLogin() {
    const formulario = document.querySelector(".login-form");
    if (!formulario) return;

    const enlaceRecuperacion = formulario.querySelector(".forgot");
    if (enlaceRecuperacion) {
        enlaceRecuperacion.addEventListener("click", (evento) => {
            evento.preventDefault();
            window.mostrarToast(
                "Contacta al administrador del sistema para restablecer tu clave."
            );
        });
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        const datos = new FormData(formulario);
        const correo = String(datos.get("email") || "").trim().toLowerCase();
        const seleccion = String(datos.get("role") || "").trim().toLowerCase();
        const esRepartidor =
            seleccion === "repartidor" ||
            correo.includes("repartidor") ||
            correo.includes("domiciliario");

        sessionStorage.setItem("etherware_session", JSON.stringify({
            correo,
            rol: esRepartidor ? "repartidor" : "administrador"
        }));
        window.mostrarToast(
            "Acceso simulado. La autenticación real requiere conectar un backend."
        );
        window.setTimeout(() => {
            window.location.href = esRepartidor
                ? "repartidor.html"
                : "dashboard.html";
        }, 900);
    });
}

function configurarSesionDemostracion() {
    const ruta = window.location.pathname;
    const esVistaPrivada =
        ruta.includes("/pages/dashboard.html") ||
        ruta.includes("/pages/inventario.html") ||
        ruta.includes("/pages/pedidos.html") ||
        ruta.includes("/pages/crm.html") ||
        ruta.includes("/pages/repartidor.html");

    if (esVistaPrivada) {
        const sesionTexto = sessionStorage.getItem("etherware_session");
        if (!sesionTexto) {
            window.location.replace("login.html");
            return;
        }
    }

    document.querySelectorAll(".logout-link").forEach((enlace) => {
        enlace.addEventListener("click", () => {
            sessionStorage.removeItem("etherware_session");
        });
    });

    const enlaceCerrarSesion = document.querySelector(".courier-footer a");
    if (enlaceCerrarSesion) {
        enlaceCerrarSesion.addEventListener("click", () => {
            sessionStorage.removeItem("etherware_session");
        });
    }
}

configurarLogin();
configurarSesionDemostracion();

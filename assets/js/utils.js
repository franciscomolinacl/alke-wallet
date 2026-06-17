// Cambio modo claro/oscuro bootstrap
export function modoDarkLight() {
    const html = document.documentElement;
    const checkbox = document.getElementById("btnDarkLight");
    let modoDarkLight = localStorage.getItem("modoDarkLight");
    let elModo = (modoDarkLight === "light") ? "light" : "dark";

    html.setAttribute("data-bs-theme", elModo);
    checkbox && (checkbox.checked = (elModo === "light"));

    document.getElementById("btnDarkLight").addEventListener("click", () => {
        const currentTheme = html.getAttribute("data-bs-theme");

        if (currentTheme === "dark") {
            html.setAttribute("data-bs-theme", "light");
            localStorage.setItem("modoDarkLight", "light");
        } else {
            html.setAttribute("data-bs-theme", "dark");
            localStorage.setItem("modoDarkLight", "dark");
        }
    });
}

// Validadción campos vacios en formularios
export function activarValidacion() {
    "use strict";
    const forms = document.querySelectorAll(".needs-validation");

    Array.from(forms).forEach((form) => {
        form.addEventListener("submit", (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();

                form.querySelectorAll("input[required]").forEach((input) => {
                    const inputGroup = input.closest(".input-group");
                    const iconoBlock = inputGroup ? inputGroup.querySelector(".input-group-text") : null;
                    if (!input.checkValidity() && iconoBlock) {
                        iconoBlock.classList.add("border-danger", "text-danger");
                    }
                    const elementoSiguiente = inputGroup ? inputGroup.nextElementSibling : input.nextElementSibling;
                    const yaExisteError = elementoSiguiente?.classList.contains("invalid-feedback");
                    if (!input.checkValidity() && !yaExisteError) {
                        const errorDiv = document.createElement("div");
                        errorDiv.className = "invalid-feedback d-block mb-3 text-center";

                        // Asigno textos segun el tipo de campo
                        if (input.type === "email") {
                            $("#email").removeClass("is-valid");
                            $("#email").addClass("is-invalid");
                            errorDiv.innerText = "Por favor, escribe un correo electrónico válido.";
                        } else if (input.type === "password") {
                            $("#password").addClass("is-invalid");
                            errorDiv.innerText = "La contraseña no puede quedar vacía.";
                        } else {
                            input.classList.add("is-invalid");
                            errorDiv.innerText = "Este campo es obligatorio.";
                        }

                        if (inputGroup) {
                            inputGroup.after(errorDiv);
                        } else {
                            input.after(errorDiv);
                        }
                    } else {
                        input.classList.add("is-valid");
                    }
                });
            }
        }, false);

    });
}

// Redirección
export function redireccion(enlace, seg) {
    setTimeout(function () {
        window.location.href = enlace;
    }, (seg * 1000));
}

// Mostrar / ocultar contraseña
export function mostrarOcultarPass() {
    const btnToggle = document.getElementById("btnTogglePassword");
    const passwordInput = document.getElementById("password");

    if (btnToggle) {
        btnToggle.addEventListener("click", () => {
            const tipo = passwordInput.type === "password" ? "text" : "password";
            passwordInput.type = tipo;

            btnToggle.classList.toggle("icono-eye");
            btnToggle.classList.toggle("icono-eye-closed");
        });
    }

}

// Crea automaticamente primer usuario
export function primerUsuario() {
    let listaUsuarios = localStorage.getItem("usuarios");
    if (listaUsuarios === null) {
        listaUsuarios = [];
        const primerUsuario = {
            email: "fran@correo.com",
            password: "laclave1234",
            nombre: "Francisco",
            nacimiento: "01-01-1980",
        };

        listaUsuarios.push(primerUsuario);
        localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    }
}
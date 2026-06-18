// Cambio modo claro/oscuro bootstrap
$(document).on("change", "#btnDarkLight", function () {
    const nuevoTema = this.checked ? "light" : "dark";
    $("html").attr("data-bs-theme", nuevoTema);
    localStorage.setItem("modoDarkLight", nuevoTema);
});

export function modoDarkLight() {
    const html = document.documentElement;
    const checkbox = document.getElementById("btnDarkLight");
    let modoDarkLight = localStorage.getItem("modoDarkLight");
    let elModo = (modoDarkLight === "light") ? "light" : "dark";

    html.setAttribute("data-bs-theme", elModo);
    checkbox && (checkbox.checked = (elModo === "light"));
}

// Validadción campos vacios en formularios
export function activarValidacion() {
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
                            $(".input-password").removeClass("is-valid");
                            $(".input-password").addClass("is-invalid");
                            errorDiv.innerText = "La contraseña no puede quedar vacía.";
                        } else {
                            input.classList.remove("is-valid");
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

const salt = "AlK3-W4ll3t_T4l3nt0-D1git4L_2026";
// Redirección
export function redireccion(enlace, seg) {
    setTimeout(function () {
        window.location.href = enlace;
    }, (seg * 1000));
}

// Mostrar / ocultar contraseña
export function mostrarOcultarPass() {
    $(".btnTogglePassword").on("click", function () {
        const $contenedor = $(this).closest(".input-group");
        const $pass = $contenedor.find(".input-password");
        const tipo = $pass.prop("type") === "password" ? "text" : "password";
        $pass.prop("type", tipo);
        $(this).toggleClass("icono-eye icono-eye-closed");
    });
}

// Crea automaticamente primer usuario
export function primerUsuario() {
    let listaUsuarios = localStorage.getItem("usuarios");
    if (listaUsuarios === null) {
        listaUsuarios = [];
        const primerUsuario = {
            email: "fran@correo.com",
            password: hashPassword("laclave1234", 1),
            nombre: "Francisco Molina",
            nacimiento: "19-02-1980",
        };

        listaUsuarios.push(primerUsuario);
        localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    }
}

// Encriptar/Desencriptar contraseña
export function hashPassword(password, modo) {
    if (modo == 1) {
        let textoLargo = password + "||" + salt;
        return btoa(textoLargo);
    } else if (modo == 2) {
        let textoLargo = atob(password);
        return textoLargo.split("||")[0];
    } 
}

// Datos de usuario logueado
export function cargarDatosUsuario() {
    const userLogueado = localStorage.getItem("usuario_logueado");
    
    if (!userLogueado) {
        window.location.href = "./login.html";
        return;
    }

    const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioActual = listaUsuarios.find(user => user.email === userLogueado);

    if (usuarioActual) {
        const nombreCompleto = usuarioActual.nombre;
        const primeraLetra = nombreCompleto.charAt(0).toUpperCase();

        $(".nombre-usuario").text(nombreCompleto);
        $(".avatar-inicial").text(primeraLetra);

    } else {
        localStorage.removeItem("usuario_logueado");
        redireccion("login.html",  1);
    }
}

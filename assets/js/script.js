import * as Utils from './utils.js';

$(document).ready(() => {
    // Ejecuta la función según la página    
    const funcionAEditar = document.body.id;
    if (typeof window[funcionAEditar] === "function") {
        window[funcionAEditar]();
    }
});

// Index
function pagIndex() {
    Utils.modoDarkLight();
}

// Login
function pagLogin() {
    let loginExitoso = false;

    if ($("#formLogin").length) {
        $("#formLogin").submit(function (evento) {
            evento.preventDefault();

            const email = $("#email").val().trim();
            const password = $("#password").val().trim();
            const usuarios = localStorage.getItem("usuarios");
            const listaUsuarios = JSON.parse(usuarios) || [];

            $(this).find(".invalid-feedback").remove();
            $("#email, #password").removeClass("is-invalid");

            if (email && password) {
                const usuarioEncontrado = listaUsuarios.find(user =>
                    user.email === email && user.password === password
                );
                if (usuarioEncontrado) {
                    loginExitoso = true;
                    localStorage.setItem("login", "true");
                    localStorage.setItem("usuarioActual", usuarioEncontrado.nombre);
                    $("#email, #password").addClass("is-valid");
                    $("<div>", {
                        id: "credenciales-exito",
                        class: "valid-feedback text-center",
                        text: "¡Credenciales correctas! Iniciando sesión...",
                    }).insertAfter("#btnTogglePassword");
                    $("#credenciales-exito").show();
                    document.getElementById("btn-spinner").classList.remove("d-none");
                    document.getElementById("btn-texto").innerText = "Cargando...";
                    document.getElementById("btn-enviar").disabled = true;
                    Utils.redireccion("./menu.html", 2);
                } else {
                    $("#email, #password").removeClass("is-valid");
                    if (!$("#credenciales-error").length) {
                        $("<div>", {
                            id: "credenciales-error",
                            class: "invalid-feedback text-center",
                            text: "Error de credenciales.",
                        }).insertAfter("#btnTogglePassword");
                    }
                    $("#email, #password").addClass("is-invalid");
                }
            }
        });
    }
    Utils.mostrarOcultarPass()
    Utils.modoDarkLight();
    Utils.primerUsuario();
    $(Utils.activarValidacion);
}

function pagRegister() {
    if ($("#formRegister").length) {
        $("#formRegister").submit(function (evento) {
            evento.preventDefault();

            const email = $("#email").val().trim();
            const password = $("#password").val().trim();
            const nombre = $("#nombre").val().trim();
            const nacimiento = $("#nacimiento").val();

            $(this).find(".invalid-feedback").remove();
            $("#email, #password").removeClass("is-invalid");

            if (email && password) {
                let usuarios = localStorage.getItem("usuarios");
                const listaUsuarios = JSON.parse(usuarios) || [];
                const usuarioEncontrado = listaUsuarios.find(user => user.email === email);
                if (usuarioEncontrado) {

                    $("#email, #password").removeClass("is-valid");
                    if (!$("#usuario-existe").length) {
                        $("<div>", {
                            id: "usuario-existe",
                            class: "invalid-feedback text-center pt-3",
                            text: "El E-Mail ya esta registrado.",
                        }).insertAfter("#btnTogglePassword");
                    }
                    $("#email, #password").addClass("is-invalid");

                } else {
                    const userNuevo = {
                        email: email,
                        password: password,
                        nombre: nombre,
                        nacimiento: nacimiento,
                    };

                    listaUsuarios.push(userNuevo);
                    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

                    $("#email, #password, #nombre, #nacimiento").addClass("is-valid");
                    $("<div>", {
                        id: "registro-exito",
                        class: "valid-feedback text-center",
                        text: "¡Cuenta creada correctamente!",
                    }).insertAfter("#btnTogglePassword");
                    $("#registro-exito").show();
                    document.getElementById("btn-spinner").classList.remove("d-none");
                    document.getElementById("btn-texto").innerText = "Cargando...";
                    document.getElementById("btn-enviar").disabled = true;
                    Utils.redireccion("./login.html", 2);

                }
            }
        });
    }
    Utils.mostrarOcultarPass()
    Utils.modoDarkLight();
    $(Utils.activarValidacion);
}

// Registro de funciones de paginas
window.pagIndex = pagIndex;
window.pagLogin = pagLogin;
window.pagRegister = pagRegister;
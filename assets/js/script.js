import * as Utils from './utils.js';

$(document).ready(() => {
    // Ejecuta la función según la página    
    const funcionAEditar = document.body.id;
    if (typeof window[funcionAEditar] === "function") {
        window[funcionAEditar]();
    }
});

// Pagina Index
function pagIndex() {
    Utils.modoDarkLight();
}

// Pagina Login
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
                    user.email === email && Utils.hashPassword(user.password, 2) === password
                );

                if (usuarioEncontrado) {
                    loginExitoso = true;
                    localStorage.setItem("login", "true");
                    localStorage.setItem("usuarioActual", usuarioEncontrado.nombre);
                    $("#email, #password").removeClass("is-invalid");
                    $("#email, #password").addClass("is-valid");
                    $("<div>", {
                        id: "credenciales-exito",
                        class: "valid-feedback text-center",
                        text: "¡Credenciales correctas! Iniciando sesión...",
                    }).insertAfter(".btnTogglePassword");
                    $("#credenciales-exito").show();
                    $("#btn-spinner").removeClass("d-none");
                    $("#btn-texto").text("Cargando...");
                    $("#btn-enviar").prop("disabled", true);
                    Utils.redireccion("./menu.html", 2);
                } else {
                    $("#email, #password").removeClass("is-valid");
                    $("#email, #password").addClass("is-invalid");
                    if (!$("#credenciales-error").length) {
                        $("<div>", {
                            id: "credenciales-error",
                            class: "invalid-feedback text-center",
                            text: "Error de credenciales.",
                        }).insertAfter(".btnTogglePassword");
                    }
                }
            }
        });
    }

    Utils.modoDarkLight();
    Utils.activarValidacion();
    Utils.mostrarOcultarPass();
    Utils.primerUsuario();
}

// Pagina Registro cuenta
function pagRegister() {
    if ($("#formRegister").length) {
        $("#formRegister").submit(function (evento) {
            evento.preventDefault();

            const email = $("#email").val().trim();
            const password = $("#password").val().trim();
            const nombre = $("#nombre").val().trim();
            const nacimiento = $("#nacimiento").val();

            $(this).find(".invalid-feedback").remove();
            $("#email, #password, #nombre, #nacimiento").removeClass("is-invalid");

            if (email && password && nombre && nacimiento) {
                const usuarios = localStorage.getItem("usuarios");
                const listaUsuarios = JSON.parse(usuarios) || [];
                const usuarioEncontrado = listaUsuarios.find(user => user.email === email);
                if (usuarioEncontrado) {
                    $("#email, #password, #nombre, #nacimiento").removeClass("is-valid");
                    $("#email, #password, #nombre, #nacimiento").addClass("is-invalid");
                    if (!$("#usuario-existe").length) {
                        $("<div>", {
                            id: "usuario-existe",
                            class: "invalid-feedback text-center pt-3",
                            text: "El E-Mail ya esta registrado.",
                        }).insertAfter(".btnTogglePassword");
                    }
                } else {
                    const userNuevo = {
                        email: email,
                        password: Utils.hashPassword(password, 1),
                        nombre: nombre,
                        nacimiento: nacimiento,
                    };

                    listaUsuarios.push(userNuevo);
                    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

                    $("#email, #password, #nombre, #nacimiento").removeClass("is-invalid");
                    $("#email, #password, #nombre, #nacimiento").addClass("is-valid");
                    $("<div>", {
                        id: "registro-exito",
                        class: "valid-feedback text-center",
                        text: "¡Cuenta creada correctamente!",
                    }).insertAfter(".btnTogglePassword");
                    $("#registro-exito").show();
                    $("#btn-spinner").removeClass("d-none");
                    $("#btn-texto").text("Cargando...");
                    $("#btn-enviar").prop("disabled", true);
                    Utils.redireccion("./login.html", 2);

                }
            }
        });
    }

    Utils.modoDarkLight();
    Utils.activarValidacion();
    Utils.mostrarOcultarPass();
}

// Pagina Recuperar Contraseña
function pagRecovery() {
    if ($("#formRecovery").length) {
        $("#formRecovery").submit(function (evento) {
            evento.preventDefault();

            const email = $("#email").val().trim();
            const nombre = $("#nombre").val().trim();
            const nacimiento = $("#nacimiento").val();

            $(this).find(".invalid-feedback").remove();
            $("#email, #nombre, #nacimiento").removeClass("is-invalid");

            if (email && nombre && nacimiento) {
                const usuarios = localStorage.getItem("usuarios");
                const listaUsuarios = JSON.parse(usuarios) || [];
                const usuarioEncontrado = listaUsuarios.find(user => user.email === email && user.nombre === nombre && user.nacimiento === nacimiento);
                if (usuarioEncontrado) {
                    $("#email, #nombre, #nacimiento, .btnTogglePassword").removeClass("is-invalid");
                    $("#email, #nombre, #nacimiento, .btnTogglePassword").addClass("is-valid");
                    if (!$("#usuario-existe").length) {
                        $("<div>", {
                            id: "usuario-existe",
                            class: "valid-feedback text-center pt-3",
                            text: "Datos correctos, será redirigido a resetear la contraseña.",
                        }).insertAfter(".btnTogglePassword");
                    }
                    localStorage.setItem("permiso_reset", email);
                    Utils.redireccion("reset.html", 2);
                } else {
                    $("#email, #nombre, #nacimiento, .btnTogglePassword").removeClass("is-valid");
                    $("#email, #nombre, #nacimiento, .btnTogglePassword").addClass("is-invalid");
                    $("<div>", {
                        id: "registro-error",
                        class: "invalid-feedback text-center",
                        text: "La información ingresada no coincide con nuestros registros.",
                    }).insertAfter(".btnTogglePassword");

                }
            }
        });
    }
    Utils.modoDarkLight();
    Utils.activarValidacion();
}

// Pagina Reset
function pagReset() {
    const permiso = localStorage.getItem("permiso_reset");

    if (permiso === null) {
        Utils.redireccion("login.html", 0);
        return;
    }

    $("#pagReset").removeClass("d-none");

    if ($("#formReset").length) {
        $("#formReset").submit(function (evento) {
            evento.preventDefault();

            const pass1 = $("#password1").val().trim();
            const pass2 = $("#password2").val().trim();

            $(this).find(".invalid-feedback").remove();
            $(".input-password").removeClass("is-invalid");

            if (!pass1 || !pass2) {
                $(".input-password").addClass("is-invalid");
                return;
            }

            if (pass1 !== pass2) {
                $(".input-password").addClass("is-invalid");
                $("<div>", {
                    class: "invalid-feedback",
                    text: "Las contraseñas no coinciden. Por favor, verifíquelas.",
                }).insertAfter(".btnTogglePassword");
                return;
            }

            const email = localStorage.getItem("permiso_reset");
            const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuarioIndex = listaUsuarios.findIndex(user => user.email === email);

            if (usuarioIndex !== -1) {
                const nuevaClave = Utils.hashPassword(pass1, 1);
                listaUsuarios[usuarioIndex].password = nuevaClave;
                localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

                $(".input-password").addClass("is-valid");
                $("<div>", {
                    id: "pass-reseteada",
                    class: "valid-feedback text-center pt-3",
                    text: "Contraseña reseteada con exito! Será redirigido al login.",
                }).insertAfter("#btnTogglePassword");
                localStorage.removeItem("permiso_reset");
                Utils.redireccion("login.html", 3);
            } else {
                alert("Hubo un error con el usuario. Inténtalo de nuevo.");
                Utils.redireccion("login.html", 0);
            }
        });
    }
    Utils.modoDarkLight();
    Utils.mostrarOcultarPass();
    Utils.activarValidacion();
}

// Registro de funciones de paginas
window.pagIndex = pagIndex;
window.pagLogin = pagLogin;
window.pagRegister = pagRegister;
window.pagRecovery = pagRecovery;
window.pagReset = pagReset;
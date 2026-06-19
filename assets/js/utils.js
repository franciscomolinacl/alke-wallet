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

                form.querySelectorAll("input[required], select[required]").forEach((input) => {
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

export function loginPag() {
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
                    user.email === email && hashPassword(user.password, 2) === password
                );

                if (usuarioEncontrado) {
                    loginExitoso = true;
                    localStorage.setItem("login", "true");
                    localStorage.setItem("usuario_logueado", usuarioEncontrado.email);
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
                    redireccion("./menu.html", 2);
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
}

export function registerPag() {
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
                        password: hashPassword(password, 1),
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
                    redireccion("./login.html", 2);

                }
            }
        });
    }
}

export function recoveryPag() {
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
                    redireccion("reset.html", 2);
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
}

export function resetPag() {
    const permiso = localStorage.getItem("permiso_reset");

    if (permiso === null) {
        redireccion("login.html", 0);
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
                const nuevaClave = hashPassword(pass1, 1);
                listaUsuarios[usuarioIndex].password = nuevaClave;
                localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

                $(".input-password").addClass("is-valid");
                $("<div>", {
                    id: "pass-reseteada",
                    class: "valid-feedback text-center pt-3",
                    text: "Contraseña reseteada con exito! Será redirigido al login.",
                }).insertAfter("#btnTogglePassword");
                localStorage.removeItem("permiso_reset");
                redireccion("login.html", 3);
            } else {
                alert("Hubo un error con el usuario. Inténtalo de nuevo.");
                redireccion("login.html", 0);
            }
        });
    }
}

export function depositoPag() {
    const inputDeposito = $("#deposito");
    if ($("#formDeposit").length) {

        $("#formDeposit").submit(function (evento) {
            evento.preventDefault(); // Evita que la página se recargue
            const valorInput = inputDeposito.val().trim();

            if (valorInput) {
                const montoADepositar = Number(valorInput);
                let saldoGuardado = Number(localStorage.getItem("saldoUsuario"));
                let nuevoSaldo = saldoGuardado + montoADepositar;
                localStorage.setItem("saldoUsuario", nuevoSaldo);
                const fechaYHora = new Date().toLocaleString("es-CL");
                guardarTransaccion("Deposito", montoADepositar, "deposito", fechaYHora);
                const montoFormateado = montoADepositar.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                    minimumFractionDigits: 0,
                });

                $("#alert-container")
                    .html(
                        `<div class="alert alert-success">¡Depósito exitoso! Se han abonado <strong>${montoFormateado}</strong> a tu cuenta.</div>`,
                    )
                    .show().delay(3000)
                    .fadeOut(800, function () {
                        $("#deposito").focus();
                    });

                saldoCaja();
                $("#deposito").val("");
            } else {
                $("#alert-container")
                    .html(
                        `<div class="alert alert-warning">¡Advertencia! Debe ingresar monto antes de enviar.</div>`,
                    )
                    .show()
                    .delay(3000)
                    .fadeOut(800, function () {
                        $("#deposito").focus();
                    });
            }
        });
    }
}

export function transferirPag() {
    activarValidacion();
    agregarContacto();

    const formSendMoney = $("#formSendMoney");

    if (formSendMoney.length) {
        formSendMoney.submit(function (evento) {
            evento.preventDefault();

            const sendmoneyTransferencia = $("#sendmoney").val().trim();
            const contactoSeleccionado = $("input[name='contacto']:checked");

            if (
                sendmoneyTransferencia && contactoSeleccionado.length
            ) {
                const idTransferencia = contactoSeleccionado.attr("id");
                const contactoTransferencia = $(
                    `label[for="${idTransferencia}"]`,
                ).text();
                const montoATransferir = Number(sendmoneyTransferencia);
                let saldoGuardado = Number(localStorage.getItem("saldoUsuario"));

                if (saldoGuardado < montoATransferir) {
                    let respuesta = `El monto a transferir debe ser inferior al saldo de $${saldoGuardado.toLocaleString("es-CL")}`;
                    $("#alert-container2")
                        .html(
                            `<div class="alert alert-warning">¡Advertencia! ${respuesta}</div>`,
                        )
                        .show()
                        .delay(4000)
                        .fadeOut(800, function () {
                            $("#sendmoney").focus();
                        });
                    $("#sendmoney").removeClass("is-invalid");
                    return;
                }

                let nuevoSaldo = saldoGuardado - montoATransferir;
                localStorage.setItem("saldoUsuario", nuevoSaldo);

                const fechaYHora = new Date().toLocaleString("es-CL");
                guardarTransaccion(
                    contactoTransferencia,
                    montoATransferir,
                    "transferencia",
                    fechaYHora,
                );

                $("#alert-container2")
                    .html(
                        `<div class="alert alert-success">¡Éxito! La transferencia se efectuó exitosamente.</div>`,
                    )
                    .show()
                    .delay(4000)
                    .fadeOut(800, function () {
                        $("#sendmoney").val("");
                        $("#sendmoney").focus();
                    });
                saldoCaja();
            }
            else {
                let respuesta2 = "";
                if (!sendmoneyTransferencia) {
                    respuesta2 = "El monto no puede estar vacío.";
                } else
                    if (!contactoSeleccionado.length) {
                        respuesta2 = "Debe seleccionar un contacto para transferir.";
                    }

                $("#alert-container2")
                    .html(
                        `<div class="alert alert-warning">¡Advertencia! ${respuesta2}</div>`,
                    )
                    .show()
                    .delay(3500)
                    .fadeOut(800, function () {
                        if (!sendmoneyTransferencia) {
                            $("#sendmoney").removeClass("is-invalid");
                            $(".invalid-feedback").remove();
                            $("#sendmoney").focus();
                        }
                    });
            }
        });
    }
}

// Agregar contacto
function agregarContacto() {
    filtroContactos();

    $("#btn-mostrar-formulario").click(function () {
        if ($("#contenedor-formulario").hasClass("d-none")) {
            $("#contenedor-formulario").removeClass("d-none").hide();
        }

        $("#contenedor-formulario").slideToggle(400, function () {
            if ($("#contenedor-formulario").is(":visible")) {
                $("#rut").focus();
            }
        });
    });

    if ($("#formContactos").length) {
        $("#formContactos").submit(function (evento) {
            evento.preventDefault();

            const rutContacto = $("#rut").val();
            const nombreContacto = $("#nombre").val();
            const aliasContacto = $("#alias").val();
            const emailContacto = $("#email").val();
            const bancoContacto = $("#banco").val();
            const tipocuentaContacto = $("#tipocuenta").val();
            const cuentaContacto = $("#cuenta").val();

            if (
                rutContacto &&
                nombreContacto &&
                bancoContacto &&
                tipocuentaContacto &&
                cuentaContacto
            ) {
                let listaContactos = localStorage.getItem("misContactos");
                if (listaContactos === null) {
                    listaContactos = [];
                } else {
                    listaContactos = JSON.parse(listaContactos);
                }

                const nuevoContacto = {
                    rut: rutContacto,
                    nombre: nombreContacto,
                    alias: aliasContacto,
                    email: emailContacto,
                    banco: bancoContacto,
                    tipocuenta: tipocuentaContacto,
                    cuenta: cuentaContacto,
                };

                listaContactos.push(nuevoContacto);
                localStorage.setItem("misContactos", JSON.stringify(listaContactos));
                $("#formContactos")[0].reset();
                $("#formContactos").find(".form-control, .form-select").removeClass("is-invalid is-valid");
                $("#formContactos").find(".invalid-feedback").remove();

                $("#alert-container")
                    .html(
                        `<div class="alert alert-success">¡Éxito! Contacto agregado correctamente.</div>`,
                    )
                    .show()
                    .delay(3000)
                    .fadeOut(800);
                $("#contenedor-formulario").slideUp(400);

                mostrarContactosEnCheck();
            } else {
                $("#alert-container")
                    .html(
                        `<div class="alert alert-warning">¡Advertencia! Debe completar los campos obligatorios.</div>`,
                    )
                    .show()
                    .delay(3000)
                    .fadeOut(800, function () {
                        $("#rut").focus();
                    });
            }
        });
    }
}

// Filtro de contactos para transferencia
function filtroContactos() {
    mostrarContactosEnCheck();

    const inputBuscador = $("#buscar_agenda");

    if (inputBuscador.length) {
        inputBuscador.on("input", function () {
            const textoEscrito = $(this).val();
            mostrarContactosEnCheck(textoEscrito);
        });
    }
}

// Leer contactos
function mostrarContactosEnCheck(textoBuscar = "") {
    const contenedor = document.getElementById("contenedor-contactos");
    if (!contenedor) return;

    const datosStorage = localStorage.getItem("misContactos");

    if (!datosStorage) {
        contenedor.innerHTML =
            '<p class="text-muted p-3 text-center" id="vacio">No tienes contactos guardados.</p>';
        return;
    }

    let lista = JSON.parse(datosStorage);

    if (textoBuscar.trim() !== "") {
        const textoMinuscula = textoBuscar.toLowerCase();

        lista = lista.filter((contacto) => {
            const nombre = contacto.nombre ? contacto.nombre.toLowerCase() : "";
            const alias = contacto.alias ? contacto.alias.toLowerCase() : "";

            return nombre.includes(textoMinuscula) || alias.includes(textoMinuscula);
        });
    }

    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML =
            '<p class="text-muted p-3 text-center">No se encontraron contactos.</p>';
        return;
    }

    const $contenedor = $("#contenedor-contactos");
    $contenedor.empty();

    $.each(lista, function (indice, contacto) {
        const idUnica = `contacto_${indice}`;

        const nombreAMostrar = contacto.alias
            ? `${contacto.nombre} (${contacto.alias})`
            : contacto.nombre;

        // Estructura nueva usando d-flex para separar el nombre del botón de eliminar
        const estructuraContacto = `
            <div class="d-flex align-items-center mb-2 w-100 gap-2">
                <!-- El radio original oculto de Bootstrap -->
                <input type="radio" class="btn-check" name="contacto" id="${idUnica}" value="${contacto.cuenta}">
                
                <!-- El label ahora tiene flex-grow-1 para ocupar todo el espacio izquierdo -->
                <label class="btn btn-outline-primary text-start p-3 flex-grow-1" for="${idUnica}">
                    ${nombreAMostrar}
                </label>
                
                <!-- El botón de eliminar alineado a la derecha -->
                <button type="button" class="btn bg-dark p-3 btn-eliminar-contacto" data-indice="${indice}" title="Eliminar contacto">
                    ❌
                </button>
            </div>
        `;

        $contenedor.append(estructuraContacto);
    });
    $contenedor.off("click", ".btn-eliminar-contacto").on("click", ".btn-eliminar-contacto", function (e) {
        e.preventDefault();

        const indiceABorrar = $(this).data("indice");
        let listaOriginal = JSON.parse(localStorage.getItem("misContactos")) || [];

        if (textoBuscar.trim() !== "") {
            const cuentaBuscada = lista[indiceABorrar].cuenta;
            listaOriginal = listaOriginal.filter(c => c.cuenta !== cuentaBuscada);
        } else {
            listaOriginal.splice(indiceABorrar, 1);
        }

        if (listaOriginal.length === 0) {
            localStorage.removeItem("misContactos");
        } else {
            localStorage.setItem("misContactos", JSON.stringify(listaOriginal));
        }

        mostrarContactosEnCheck(textoBuscar);
    });

    $contenedor.off("change", "input[name='contacto']").on("change", "input[name='contacto']", function () {
        $("#btn-transferir").removeClass("d-none").hide().fadeIn(400);
    });


    $contenedor.on("change", "input[name='contacto']", function () {
        $("#btn-transferir").removeClass("d-none").hide().fadeIn(400);
    });
}

export function historialPag() {
    leerTransacciones();
    calcularEstadisticas();
    $(document).on("change", "#filtro-movimientos", function () {
        const opcionSeleccionada = $(this).val();

        if (opcionSeleccionada === "todos") {
            $(".tarjeta-movimiento").fadeIn(300);
        } else {
            $(".tarjeta-movimiento").hide();
            $(`.tarjeta-movimiento.${opcionSeleccionada}`).fadeIn(300);
        }
    });
}

function leerTransacciones() {
    const contenedor = $("#contenedor-transacciones");
    if (!contenedor.length) return;

    const datosStorage = localStorage.getItem("transacciones");

    if (!datosStorage) {
        contenedor.html(`
      <div class="card mb-2 shadow-sm animate-vacio">
        <div class="card-body d-flex justify-content-between align-items-center text-muted">
          Aún no registras movimientos.
        </div>
      </div>
    `);
        return;
    }

    const lista = JSON.parse(datosStorage);
    lista.sort((a, b) => {
        const arreglarFecha = (fechaStr) => {
            const [fechaPart, horaPart] = fechaStr.trim().split(" ");
            const [dia, mes, anio] = fechaPart.includes("-")
                ? fechaPart.split("-")
                : fechaPart.split("/");
            return `${anio}-${mes}-${dia} ${horaPart || ""}`.trim();
        };
        return (
            new Date(arreglarFecha(b.fechayhora)) -
            new Date(arreglarFecha(a.fechayhora))
        );
    });
    contenedor.empty();

    $.each(lista, function (index, tx) {
        const tipoNormalizado = tx.tipo.toLowerCase();
        const colorMonto =
            tipoNormalizado === "deposito" ? "text-success" : "text-danger";
        const signo = tipoNormalizado === "deposito" ? "+" : "-";
        const montoFormateado = Number(tx.monto).toLocaleString("es-CL"); // Formateo a moneda

        const estructuraTarjeta = `
      <div class="card mb-2 shadow-sm tarjeta-movimiento ${tx.tipo.toLowerCase()}">
          <div class="card-body d-flex justify-content-between align-items-center">
              <div>
                  <h6 class="mb-0 fw-bold">${tx.contacto}</h6>
                  <small class="text-muted">${tx.fechayhora}</small>
              </div>
              <div class="text-end">
                  <span class="fw-bold ${colorMonto}">${signo}$${montoFormateado}</span>
                  <br>
                  <small class="badge bg-light text-dark text-capitalize">${tipoNormalizado}</small>
              </div>
          </div>
      </div>
    `;

        contenedor.append(estructuraTarjeta);
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
        redireccion("login.html", 1);
    }
}

// Obtengo el saldo en caja
export function saldoCaja() {
    const cajaSaldo = document.getElementsByClassName("saldo-usuario");
    if (cajaSaldo) {
        const saldoInicial = 0;
        let saldoActual = localStorage.getItem("saldoUsuario");

        if (saldoActual === null) {
            localStorage.setItem("saldoUsuario", saldoInicial);
            saldoActual = saldoInicial;
            const fechaYHora = new Date().toLocaleString("es-CL");
            guardarTransaccion("Saldo inicial", saldoActual, "deposito", fechaYHora);
        }
        saldoActual = Number(saldoActual).toLocaleString("es-CL");
        $(".saldo-usuario").text(`$${saldoActual}`);
    }
}

// Guardar transaccion
function guardarTransaccion(contacto, monto, tipo, fechayhora) {
    let listaTransacciones = localStorage.getItem("transacciones");
    if (listaTransacciones === null) {
        listaTransacciones = [];
    } else {
        listaTransacciones = JSON.parse(listaTransacciones);
    }

    const nuevaTransferencia = {
        contacto: contacto,
        monto: monto,
        tipo: tipo,
        fechayhora,
    };

    listaTransacciones.push(nuevaTransferencia);
    localStorage.setItem("transacciones", JSON.stringify(listaTransacciones));
}

// Reviso login activo
export function loginActivo(pag) {
    let loginGuardado = localStorage.getItem("login");
    const paginasPublicas = ["pagIndex", "pagLogin", "pagRegister", "pagRecovery", "pagReset"];

    if (loginGuardado !== "true") {
        if (paginasPublicas.includes(pag)) {
            return;
        }
        redireccion("./login.html", 0);
    } else {
        if (paginasPublicas.includes(pag)) {
            redireccion("./menu.html", 0);
        }
        $(`#${pag}`).removeClass("d-none");
    }
}

// Funcion para salir del login
export function salir() {
    const btnSalir = document.getElementById("btnSalir");
    const miModal = new bootstrap.Modal($("#salida")[0]);
    if (btnSalir) {
        btnSalir.addEventListener("click", function (evento) {
            evento.preventDefault();
            localStorage.removeItem("login");
            miModal.show();
            redireccion("./login.html", 2);
        });
    }
}

export function calcularEstadisticas() {
    const datosStorage = localStorage.getItem("transacciones");
    if (!datosStorage) return;

    const lista = JSON.parse(datosStorage);

    let ingresos = 0;
    let egresos = 0;

    lista.forEach(tx => {
        const monto = Number(tx.monto) || 0;
        if (tx.tipo.toLowerCase() === "deposito") {
            ingresos += monto;
        } else {
            egresos += monto;
        }
    });

    const balance = ingresos - egresos;

    $("#total-ingresos").text(`+$${ingresos.toLocaleString("es-CL")}`);
    $("#total-egresos").text(`-$${egresos.toLocaleString("es-CL")}`);
    $("#total-txs").text(lista.length);

    const $balanceElemento = $("#balance-neto");
    $balanceElemento.text(`$${balance.toLocaleString("es-CL")}`);
    if (balance >= 0) {
        $balanceElemento.removeClass("text-danger").addClass("text-primary");
    } else {
        $balanceElemento.removeClass("text-primary").addClass("text-danger");
    }
}

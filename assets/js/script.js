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
    Utils.loginActivo("pagIndex");
}

// Pagina Login
function pagLogin() {
    Utils.loginPag();
    Utils.modoDarkLight();
    Utils.activarValidacion();
    Utils.mostrarOcultarPass();
    Utils.primerUsuario();
    Utils.loginActivo("pagLogin");
}

// Pagina Registro cuenta
function pagRegister() {
    Utils.registerPag();
    Utils.modoDarkLight();
    Utils.activarValidacion();
    Utils.mostrarOcultarPass();
    Utils.loginActivo("pagRegister");
}

// Pagina Recuperar Contraseña
function pagRecovery() {
    Utils.recoveryPag();
    Utils.modoDarkLight();
    Utils.activarValidacion();
    Utils.loginActivo("pagRecovery");
}

// Pagina Reset
function pagReset() {
    Utils.resetPag();
    Utils.modoDarkLight();
    Utils.mostrarOcultarPass();
    Utils.activarValidacion();
    Utils.loginActivo("pagReset");
}

// Pagina Menu
function pagMenu() {
    Utils.modoDarkLight();
    Utils.cargarDatosUsuario();
    Utils.saldoCaja();
    Utils.loginActivo("pagMenu");
    Utils.salir();
}

// Pagina Deposito
function pagDeposito() {
    Utils.depositoPag();
    Utils.modoDarkLight();
    Utils.cargarDatosUsuario();
    Utils.saldoCaja();
    Utils.loginActivo("pagDeposito");
    Utils.salir();    
}

// Pagina Transferir
function pagTransferir() {
    Utils.transferirPag();
    Utils.modoDarkLight();  
    Utils.cargarDatosUsuario();
    Utils.saldoCaja();
    Utils.loginActivo("pagTransferir");
    Utils.salir();    
}

// Pagina Historial
function pagHistorial() {
    Utils.historialPag();
    Utils.modoDarkLight();
    Utils.cargarDatosUsuario();
    Utils.saldoCaja();    
    Utils.loginActivo("pagHistorial");
    Utils.salir();    
}

// Registro de funciones de paginas
window.pagIndex = pagIndex;
window.pagLogin = pagLogin;
window.pagRegister = pagRegister;
window.pagRecovery = pagRecovery;
window.pagReset = pagReset;
window.pagMenu = pagMenu;
window.pagDeposito = pagDeposito;
window.pagTransferir = pagTransferir;
window.pagHistorial = pagHistorial;
# 🏦 Proyecto: AlK3 Wallet - Sistema de Login y Autenticación

¡Bienvenido al repositorio de **AlK3 Wallet**! Este es un proyecto educativo diseñado para simular el comportamiento de una billetera digital, enfocándose en la lógica de registro, inicio de sesión seguro y recuperación de contraseñas.

🌐 **[¡Haz clic aquí para probar la aplicación en vivo en GitHub Pages!] https://franciscomolinacl.github.io/alke-wallet/**

---

## 🚀 Funcionalidades Principales

El sistema cuenta con las siguientes pantallas y lógicas de programación:

*   **Página de Login (`login.html`):** Permite el acceso seguro de los usuarios registrados mediante la validación de sus credenciales.
*   **Página de Registro (`register.html`):** Crea nuevos usuarios capturando su nombre, correo, fecha de nacimiento y clave. Valida que los datos estén completos y que el formato del correo sea el correcto antes de guardarlo.
*   **Recuperación de Datos (`recovery.html`):** Solicita el correo, nombre y nacimiento del usuario. Si coinciden con los registros, le otorga un permiso especial para continuar.
*   **Restablecer Clave (`reset.html`):** Permite ingresar la nueva contraseña por duplicado. Verifica que ambas coincidan perfectamente antes de guardarla. Cuenta con un sistema de seguridad por CSS que bloquea el acceso si no pasaste por la pantalla de recuperación.
*   **Menú Principal (`menu.html`):** Panel central del usuario que muestra de forma dinámica su saludo con iniciales y su saldo. Cuenta con un diseño adaptativo elástico y un menú lateral (Offcanvas) para la versión móvil.
*   **Página de Depósitos (`deposit.html`):** Permite abonar montos reales a la cuenta del usuario conectado, actualizando su saldo de forma segura y gatillando alertas temporizadas con efecto *fade*.
*   **Historial de Movimientos (`transactions.html`):** Se comporta en PC como un Dashboard Financiero de nivel ejecutivo, mostrando un panel con estadísticas de ingresos, gastos y balance neto calculados en tiempo real.
*   **Módulo de Transferencias (`sendmoney.html`):** Permite gestionar una agenda privada de contactos por usuario (con buscador dinámico y opción de eliminar ❌). Al enviar dinero, emite un Comprobante de Transferencia en un Modal interactivo con botón visual para compartir.


---

## 🛠️ Tecnologías Utilizadas

Para el desarrollo de este proyecto se utilizaron las siguientes herramientas del desarrollo web:

*   **HTML5:** Para construir la estructura limpia de todas las interfaces del sitio.
*   **Bootstrap 5:** Para lograr un diseño moderno, profesional y adaptable a dispositivos móviles (Responsive).
*   **jQuery:** Para la manipляция interactiva del DOM, captura de eventos de formularios y animaciones visuales.
*   **JavaScript (ES6):** Uso de módulos (`export`/`import`), funciones anónimas para eventos y lógica de control.
*   **Web Storage (LocalStorage):** Utilizado como base de datos local para guardar y actualizar la lista de usuarios en formato JSON.

---

## 🔐 Detalles Técnicos Destacados

### 1. Sistema de Ofuscación de Contraseñas
Para cumplir con los requisitos académicos de protección de datos en el navegador, se implementó una función propia llamada `hashPassword`. Esta herramienta añade una cadena de texto secreta (*Salt*) y aplica una codificación avanzada en **Base64** con el método `btoa()`.

### 2. Protección de Rutas Avanzada
La página `reset.html` está protegida para evitar accesos directos escribiendo la URL. El contenedor se carga oculto con la clase `d-none` de Bootstrap y solo se muestra si el sistema detecta el permiso correcto en el almacenamiento del navegador, eliminando por completo cualquier parpadeo visual.

### 3. Funciones Reutilizables
El botón para mostrar u ocultar el texto de la contraseña (el ícono del ojo) fue optimizado usando clases de jQuery en lugar de selectores de identificación fija (ID). Gracias a esto, funciona simultáneamente para múltiples campos en una misma ventana sin duplicar código.

### 4. Automatización con Git-Helper Personalizado
Para garantizar la consistencia en el flujo de trabajo profesional, se desarrolló un asistente interactivo en Bash (`git-helper.sh`). Esta herramienta automatiza las revisiones de seguridad de la carpeta, la creación y viaje entre ramas, y estandariza los mensajes de confirmación bajo la convención internacional de *Conventional Commits* (`feat:`, `fix:`, `style:`).


---

## 👤 Autor

*   **Francisco Molina** — *Desarrollador del Proyecto*
*   Estudiante de Programación / Desarrollo Web


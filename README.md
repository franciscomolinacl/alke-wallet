# 🏦 Proyecto: AlK3 Wallet - Sistema de Login y Autenticación

¡Bienvenido al repositorio de **AlK3 Wallet**! Este es un proyecto educativo diseñado para simular el comportamiento de una billetera digital, enfocándose en la lógica de registro, inicio de sesión seguro y recuperación de contraseñas.

---

## 🚀 Funcionalidades Principales

El sistema cuenta con las siguientes pantallas y lógicas de programación:

*   **Página de Login (`login.html`):** Permite el acceso seguro de los usuarios registrados mediante la validación de sus credenciales.
*   **Página de Registro (`register.html`):** Crea nuevos usuarios capturando su nombre, correo, fecha de nacimiento y clave. Valida que los datos estén completos y que el formato del correo sea el correcto antes de guardarlo.
*   **Recuperación de Datos (`recovery.html`):** Solicita el correo, nombre y nacimiento del usuario. Si coinciden con los registros, le otorga un permiso especial para continuar.
*   **Restablecer Clave (`reset.html`):** Permite ingresar la nueva contraseña por duplicado. Verifica que ambas coincidan perfectamente antes de guardarla. Cuenta con un sistema de seguridad por CSS que bloquea el acceso si no pasaste por la pantalla de recuperación.

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

---

## 👤 Autor

*   **Francisco Molina** — *Desarrollador del Proyecto*
*   Estudiante de Programación / Desarrollo Web


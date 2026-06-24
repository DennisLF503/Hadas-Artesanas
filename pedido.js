// ===== JS DE LA PÁGINA DE PEDIDO =====
// Funcionalidad: 1) validar el formulario  2) enviar los datos a Formspree (almacenamiento real)

document.addEventListener("DOMContentLoaded", function () {

  // Seleccionamos el formulario y los campos que vamos a validar
  const formulario = document.getElementById("formPedido");
  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const producto = document.getElementById("producto");
  const botonEnviar = document.querySelector(".boton-enviar");

  // Seleccionamos donde mostraremos los mensajes
  const errorMensaje = document.getElementById("errorMensaje");
  const confirmacionMensaje = document.getElementById("confirmacionMensaje");

  // Escuchamos el evento "submit" (cuando el usuario presiona Enviar)
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); // evita la recarga normal del navegador; lo enviamos nosotros con fetch

    // Limpiamos mensajes y estilos de error anteriores
    errorMensaje.textContent = "";
    confirmacionMensaje.textContent = "";
    [nombre, correo, producto].forEach(campo => campo.classList.remove("campo-invalido"));

    let formularioValido = true;

    // Validamos que el nombre no esté vacío
    if (nombre.value.trim() === "") {
      formularioValido = false;
      nombre.classList.add("campo-invalido");
    }

    // Validamos el formato del correo con una expresión simple
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(correo.value.trim())) {
      formularioValido = false;
      correo.classList.add("campo-invalido");
    }

    // Validamos que se haya elegido un producto
    if (producto.value === "") {
      formularioValido = false;
      producto.classList.add("campo-invalido");
    }

    // Si algo falló, mostramos el mensaje de error y detenemos el envío
    if (!formularioValido) {
      errorMensaje.textContent = "Por favor completa correctamente los campos marcados en rojo.";
      return;
    }

    // ===== ENVÍO REAL DE LOS DATOS A FORMSPREE =====
    botonEnviar.disabled = true;
    botonEnviar.textContent = "Enviando...";

    // Tomamos todos los datos del formulario automáticamente
    const datosFormulario = new FormData(formulario);

    fetch(formulario.action, {
      method: "POST",
      body: datosFormulario,
      headers: { "Accept": "application/json" } // pide respuesta en JSON, sin redirigir de página
    })
      .then(function (respuesta) {
        if (respuesta.ok) {
          // Éxito: el pedido quedó guardado/enviado
          confirmacionMensaje.textContent = "¡Tu pedido fue enviado con éxito! Pronto te contactaremos.";
          formulario.reset();
        } else {
          // Formspree respondió con error (ej: URL mal configurada)
          errorMensaje.textContent = "Hubo un problema al enviar el pedido. Intenta de nuevo.";
        }
      })
      .catch(function () {
        // Error de conexión a internet, o el "action" no se configuró bien
        errorMensaje.textContent = "No se pudo conectar. Revisa tu conexión a internet.";
      })
      .finally(function () {
        botonEnviar.disabled = false;
        botonEnviar.textContent = "Enviar Pedido";
      });
  });

});
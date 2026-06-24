// ===== JS DE LA PÁGINA DE INICIO =====

// Esperamos a que todo el contenido HTML esté cargado
document.addEventListener("DOMContentLoaded", function () {

  // Seleccionamos el botón de llamada a la acción
  const boton = document.querySelector(".boton-cta");

  // Mostramos un mensaje en consola cuando el usuario hace clic
  // (esto es solo un ejemplo simple de interacción)
  boton.addEventListener("click", function () {
    console.log("El usuario quiere ver los productos");
  });

});

//  JS DE LA PÁGINA DE CATÁLOGO =====
// Funcionalidad: Filtro de productos por categoría sin recargar la página

document.addEventListener("DOMContentLoaded", function () {

  // Seleccionamos todos los botones de filtro
  const botones = document.querySelectorAll(".filtro-btn");

  // Seleccionamos todas las tarjetas de productos
  const productos = document.querySelectorAll(".tarjeta");

  // Recorremos cada botón para asignarle un evento de clic
  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {

      // Quitamos la clase "activo" de todos los botones
      botones.forEach(b => b.classList.remove("activo"));
      // Añadimos la clase "activo" solo al botón que se presionó
      boton.classList.add("activo");

      // Obtenemos la categoría que indica el botón (ej: "crochet", "velas", "todos")
      const categoriaSeleccionada = boton.getAttribute("data-categoria");

      // Recorremos cada producto para mostrarlo u ocultarlo
      productos.forEach(function (producto) {
        const categoriaProducto = producto.getAttribute("data-categoria");

        if (categoriaSeleccionada === "todos" || categoriaProducto === categoriaSeleccionada) {
          producto.classList.remove("oculto"); // se muestra
        } else {
          producto.classList.add("oculto"); // se oculta
        }
      });

    });
  });

});

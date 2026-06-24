// ===== JS DE LA PÁGINA "ACERCA DE NOSOTROS" =====

document.addEventListener("DOMContentLoaded", function () {

  // Seleccionamos todos los títulos h2 de la sección
  const titulos = document.querySelectorAll(".texto-acerca h2");

  // Ejemplo simple: al pasar el mouse sobre un título, cambia de color
  titulos.forEach(function (titulo) {
    titulo.addEventListener("mouseover", function () {
      titulo.style.color = "#9c4a4a";
    });

    titulo.addEventListener("mouseout", function () {
      titulo.style.color = "#b85c5c";
    });
  });

});

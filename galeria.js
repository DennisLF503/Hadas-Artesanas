// ===== JS DE LA PÁGINA DE GALERÍA =====
// Funcionalidad: efecto lightbox (ampliar imagen al hacer clic)

document.addEventListener("DOMContentLoaded", function () {

  // Seleccionamos todas las imágenes de la galería
  const imagenes = document.querySelectorAll(".imagen-galeria");

  // Seleccionamos los elementos del lightbox
  const lightbox = document.getElementById("lightbox");
  const imagenLightbox = document.getElementById("imagenLightbox");
  const botonCerrar = document.getElementById("cerrarLightbox");

  // Cuando se hace clic en una imagen de la galería...
  imagenes.forEach(function (img) {
    img.addEventListener("click", function () {
      lightbox.style.display = "flex";       // mostramos el lightbox
      imagenLightbox.src = img.src;           // copiamos la imagen clicada al lightbox
      imagenLightbox.alt = img.alt;
    });
  });

  // Cuando se hace clic en la "X" para cerrar
  botonCerrar.addEventListener("click", function () {
    lightbox.style.display = "none";
  });

  // También se cierra si el usuario hace clic fuera de la imagen
  lightbox.addEventListener("click", function (evento) {
    if (evento.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

});

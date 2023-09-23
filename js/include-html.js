fetch("detalle.json")
.then((respuesta) => respuesta.json())
.then((datos) => localStorage.setItem("detalle", JSON.stringify(datos)));
// Agregar evento de clic al botón "Detalle" en cada producto
const botonesDetalle = document.querySelectorAll(".product-box button");
botonesDetalle.forEach((boton, index) => {
boton.addEventListener("click", () => {
  // Al hacer clic, redirige a la página de detalles y pasa el índice del producto como parámetro
  window.location.href = `detalle.html?product=${index}`;
});
});


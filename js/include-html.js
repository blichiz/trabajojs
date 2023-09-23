function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("include-html");
      if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /*remove the attribute, and call this function once more:*/
            elmnt.removeAttribute("include-html");
            includeHTML();
          }
        }      
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
      }
    }
  };
  includeHTML();
  const productosContainer = document.getElementById('productos-container');

fetch('productos.json')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((producto, index) => {
      const productoHTML = `
        <div class="producto">
          <h2>${producto.codigo}</h2>
          <p>${producto.descripcion}</p>
          <button onclick="verDetalle(${index})">Ver Detalle</button>
        </div>
      `;
      productosContainer.innerHTML += productoHTML;
    });
  });
  function verDetalle(index) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    productos.push(index);
    localStorage.setItem('productos', JSON.stringify(productos));
    window.location.href = 'detalle.html';
  }
  const detalleContainer = document.getElementById('detalle-container');

const productos = JSON.parse(localStorage.getItem('productos'));

if (productos && productos.length > 0) {
  const selectedProduct = productos[productos.length - 1]; // El último producto seleccionado
  fetch('productos.json')
    .then((response) => response.json())
    .then((data) => {
      const producto = data[selectedProduct];
      const detalleHTML = `
        <h2>${producto.codigo}</h2>
        <p>${producto.descripcion}</p>
        <img src="${producto.imagen}" alt="${producto.codigo}">
        <p>${producto.detalle}</p>
        <p>Precio: $${producto.precio}</p>
        <p>Puntuación: ${producto.puntuacion}</p>
        <button onclick="volverALista()">Volver a la Lista</button>
      `;
      detalleContainer.innerHTML = detalleHTML;
    });
} else {
  detalleContainer.innerHTML = '<p>No se ha seleccionado ningún producto o servicio.</p>';
}

function volverALista() {
  localStorage.removeItem('productos');
  window.location.href = 'index.html';
}

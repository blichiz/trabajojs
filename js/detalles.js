        // Recuperar el índice del producto de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const productIndex = urlParams.get("product");
        
        // Recuperar los datos del localStorage
        const detalleData = JSON.parse(localStorage.getItem("detalle"));
        
        // Mostrar los detalles del producto seleccionado
        if (detalleData && productIndex >= 0 && productIndex < detalleData.length) {
            const productoSeleccionado = detalleData[productIndex];
            const detalleProductoElement = document.getElementById("detalle-producto");
            
            // Crear elementos HTML para mostrar los detalles del producto seleccionado
            const detalleHTML =
                `<h3>${productoSeleccionado.descripcion}</h3>
                <img src="${productoSeleccionado.imagen}" alt="${productoSeleccionado.descripcion}" />
                <p>${productoSeleccionado.detalle}</p>
                <p>Precio: $${productoSeleccionado.precio}</p>
                <p>Puntuación: ${productoSeleccionado.puntuacion}</p>
            `;
            
            detalleProductoElement.innerHTML = detalleHTML;
        } else {
            // Si el índice del producto no es válido, mostrar un mensaje de error
            const detalleProductoElement = document.getElementById("detalle-producto");
            detalleProductoElement.innerHTML = "Producto no encontrado.";
        }
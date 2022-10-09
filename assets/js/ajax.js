let productos = [];
contenedorProductos = document.getElementById("contenedorProductos");

function pintarProductos() {
    contenedorProductos.innerHTML = "";
    productos.forEach((producto) => {
      let column = document.createElement("div");
      column.className = "col-md-4 mt-3";
      column.id = `columna-${producto.id}`;
      column.innerHTML = `
              <div class="card">
                  <div class="card-body">
                  <p class="card-text">ID:
                      <b>${producto.id}</b>
                  </p>
                  <p class="card-text">Nombre:
                      <b>${producto.nombre}</b>
                  </p>
                  <p class="card-text">Precio compra:
                      <b>${producto.cantidad}</b>
                  </p>
                  <p class="card-text">Precio venta:
                      <b>${producto.precioVenta}</b>
                  </p>
                  <img class="card-img-top w-100 card-img-top" src=">${producto.imagen}" alt="Card image cap">
                  </div>
                  <div class="card-footer">
                    <button class="btn btn-danger" id="botonEliminar-${producto.id}" >Eliminar</button>
                  </div>
              </div>`;
  
      contenedorProductos.append(column);
  
      let botonEliminar = document.getElementById(`botonEliminar-${producto.id}`);
      botonEliminar.onclick = () => confirmarEliminacion(producto.id);
    });
  }

async function consultarProductosServer() {
    try {
      const response = await fetch(
        "https://634214b7ba4478d47837c01a.mockapi.io/ApiTest"
      );
      const data = await response.json();
      productos = [...data];
      pintarProductos();
    } catch (error) {
      console.log(error);
    }
  }


function main() {

    consultarProductosServer();


  }
  
  main();
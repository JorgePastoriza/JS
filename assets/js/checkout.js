const contenedorProductos = document.getElementById("contenedorProductos");
let carrito = [];

function MostrarProductos(carrito){

    contenedorProductos.innerHTML = "";
    for (const dato of carrito) {
        let column = document.createElement("div");
            column.className = "col-md-6 pb-3";
            column.id = `columna-venta-${dato.id}`;
            column.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <p class="card-text">Nombre: <b>${dato.nombre}</b></p>
                        <p class="card-text">Precio Unitario: <b>${dato.precio}</b></p>
                        <p class="card-text" id="cant-${dato.id}">Cantidad: <b>${dato.cantidad}</b></p>
                        <button class="btn btn-primary" id="${dato.id}" >Eliminar</button>
                    </div>
                </div>`;
                contenedorProductos.append(column);
    }
}

function eventoCarrito(seleccion){
    let index = carrito.findIndex(prod => prod.id == seleccion);  
    console.log(index);
    carrito.splice(index, 1);
    actualizarProductosStorage();
    actualizaContador(carrito);
    MostrarProductos(carrito);
}

function actualizaContador(datoCarrito){
    let total = 0;
    for (const dato of datoCarrito) {
        total += dato.cantidad;
    }
    cantidadArticulos.innerHTML = total;
    }

function inicializarEventos() {

    contenedorProductos.onclick = (event) => eventoCarrito(event.target.id);

  }

//-------------------------Funcionadlidad LocalStorage-------------------

function obtenerProductosStorage() {
    let productosJSON = localStorage.getItem("carrito");
    if (productosJSON) {
        carrito = JSON.parse(productosJSON);
        actualizaContador(carrito);
    }
}

function actualizarProductosStorage() {
    let productosJSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", productosJSON);
}

//-------------------------Aca llamamos a cargar los productos, filtro y genero el event click-----------------

function main() {
    inicializarEventos();
    obtenerProductosStorage();
    MostrarProductos(carrito);
    console.log(carrito);
  }
  
main();

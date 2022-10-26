const contenedorProductos = document.getElementById("contenedorProductos");
const contadorCarrito = document.getElementById("cantidadArticulos");
const botonEnviar = document.getElementById("btnEnviar");
const TotalVenta = document.getElementById("TotalVenta");
let carrito = [];
let montoVenta = 0;

function mostrarSweetAlert(mensaje){
    swal({
        text: mensaje,
        icon: "error",
        button: "Aceptar",
      });
}

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
    carrito.splice(index, 1);
    actualizarProductosStorage();
    actualizaContador(carrito);
    MostrarProductos(carrito);
}

function actualizaContador(datoCarrito){
    let total = 0;
    montoVenta = 0;
        for (const dato of datoCarrito) {
            total += dato.cantidad;
            montoVenta += dato.precio * dato.cantidad;
        }
    contadorCarrito.innerHTML = total;
    TotalVenta.innerHTML = `<label class="form-label">Total compra: ${montoVenta}</label>`;
}

function cierreCarrito(){
    if (montoVenta === 0) {
        mostrarSweetAlert("Tenes el carrito vacio!");
    }else{
        localStorage.clear();
        carrito.splice(0, carrito.length);
        actualizaContador(carrito);
        MostrarProductos(carrito);
        montoVenta = 0;
    }
}


function inicializarEventos() {
    contenedorProductos.onclick = (event) => eventoCarrito(event.target.id);
    botonEnviar.onclick = (event) => cierreCarrito(event.target.id);

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
}

main();
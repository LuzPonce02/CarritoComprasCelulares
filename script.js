
const celulares = [
    {
        id: 1,
        nombre: "Iphone 13 128gb",
        precio: 808
    },
    {
        id: 2,
        nombre: "Iphone 15 128gb",
        precio: 1103
    },
    {
        id: 3,
        nombre: "Iphone 16 128gb",
        precio: 1236
    },
    {
        id: 4,
        nombre: "Iphone 16 PRO 128gb",
        precio: 1648
    },
];

const contenedorProductos = document.getElementById("lista-productos");
function mostrarProductos() {
    celulares.forEach((celular) => {
        const divNuevo = document.createElement("div");
        divNuevo.classList.add("producto");
        divNuevo.innerHTML = `
      <h3>${celular.nombre}</h3>
      <p>Precio: $${celular.precio}</p>
      <button onclick="agregarAlCarrito(${celular.id})">Agregar al carrito</button>
    `;
        contenedorProductos.appendChild(divNuevo);
    });
}
mostrarProductos();

//Agregar al carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
function agregarAlCarrito(id) {
    const producto = celulares.find(celular => celular.id === id);
    if (producto) {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    }
}

//Mostrar Carrito
const contenedorCarrito = document.getElementById("lista-carrito");

function mostrarCarrito() {
    contenedorCarrito.innerHTML = "";

    carrito.forEach((producto, posicionProducto) => {
        const div2 = document.createElement("div");
        div2.classList.add("producto-carrito");
        div2.innerHTML = `
      <p>${producto.nombre} - $${producto.precio}</p>
      <button onclick="eliminarDelCarrito(${posicionProducto})">Eliminar</button>
    `;
        contenedorCarrito.appendChild(div2);
    });
    //Calcular total
    const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("total-carrito");
    totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
    contenedorCarrito.appendChild(totalDiv);
}


//Eliminar del carrito
function eliminarDelCarrito(posicionProducto) {
    let nuevoCarrito = [];
    for (let i = 0; i < carrito.length; i++) {
        if (i !== posicionProducto) {
            nuevoCarrito.push(carrito[i]);
        }
    }
    carrito = nuevoCarrito;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

//Vaciar carrito
const botonVaciar = document.getElementById("vaciar-carrito");
botonVaciar.addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
});


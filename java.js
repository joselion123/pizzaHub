document.addEventListener("DOMContentLoaded", () => {
    fetch("productos.json")
        .then(response => response.json())
        .then(data => mostrarProductos(data))
        .catch(error => console.error("Error cargando los productos:", error));
});

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 1500;

function mostrarProductos(productos) {
    const contenedor = document.getElementById("productos");
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("col-md-4", "mb-3");
        div.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text"><strong>$${producto.precio}</strong></p>
                    <input type="number" id="cantidad-${producto.id}" class="form-control mb-2" placeholder="Cantidad" min="1">
                    <button class="btn btn-success" onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio})">Agregar</button>
                </div>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

function agregarAlCarrito(id, nombre, precio) {
    const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value) || 1;
    const item = { id, nombre, precio, cantidad };
    carrito.push(item);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("carrito");
    lista.innerHTML = "";
    total = 1500;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.textContent = `${item.cantidad}x ${item.nombre} - $${item.precio * item.cantidad}`;
        lista.appendChild(li);
    });
    document.getElementById("total").textContent = total;
}

function liquidarPedido() {
    if (carrito.length === 0) {
        alert("No has seleccionado productos para liquidar el pedido.");
    } else {
        alert("Pedido liquidado. Total: $" + total);
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
        document.querySelectorAll("input[type='number']").forEach(input => input.value = "");
    }
}

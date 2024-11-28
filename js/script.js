// Clase para definir un producto
class Producto {
    constructor(nombre, categoria, precio) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
    }
}

// Array de productos
const productos = [
    new Producto("Oversize Essentials", "Remeras", 30),
    new Producto("Chomba", "Remeras", 40),
    new Producto("Short Lino", "Pantalones", 30),
    new Producto("Bermudas", "Pantalones", 40),
    new Producto("Jean Mom", "Pantalones", 60),
    new Producto("Oversize Levis", "Buzos", 90),
    new Producto("Campera Inflable", "Camperas", 200),
    new Producto("Adidas Campus", "Zapatillas", 140),
    new Producto("Adidas Forum", "Zapatillas", 110),
];

// Elementos del DOM
const output = document.getElementById("output");
const productForm = document.getElementById("productForm");
const listarButton = document.getElementById("listarProductos");
const filtrarButton = document.getElementById("filtrarProductos");
const buscarButton = document.getElementById("buscarProducto");

// Función para mostrar texto en pantalla
function mostrarEnPantalla(titulo, contenido) {
    const div = document.createElement("div");
    div.classList.add("result");

    const h3 = document.createElement("h3");
    h3.textContent = titulo;
    div.appendChild(h3);

    if (Array.isArray(contenido)) {
        contenido.forEach((item) => {
            const p = document.createElement("p");
            p.textContent = typeof item === "object" ? JSON.stringify(item) : item;
            div.appendChild(p);
        });
    } else {
        const p = document.createElement("p");
        p.textContent = typeof contenido === "object" ? JSON.stringify(contenido) : contenido;
        div.appendChild(p);
    }

    output.appendChild(div);
}

// Formatear un producto para mostrarlo de forma legible
function formatearProducto(producto) {
    if (producto && typeof producto === "object") {
        return `Nombre: ${producto.nombre}, Categoría: ${producto.categoria}, Precio: $${producto.precio}`;
    }
    return producto; // Si no es un objeto, devuelve el contenido tal cual
}

// Función para mostrar texto en pantalla
function mostrarEnPantalla(titulo, contenido) {
    const div = document.createElement("div");
    div.classList.add("result");

    const h3 = document.createElement("h3");
    h3.textContent = titulo;
    div.appendChild(h3);

    if (Array.isArray(contenido)) {
        contenido.forEach((item) => {
            const p = document.createElement("p");
            p.textContent = typeof item === "object" ? formatearProducto(item) : item;
            div.appendChild(p);
        });
    } else {
        const p = document.createElement("p");
        p.textContent = typeof contenido === "object" ? formatearProducto(contenido) : contenido;
        div.appendChild(p);
    }

    output.appendChild(div);
}


// Limpiar resultados anteriores
function limpiarPantalla() {
    output.innerHTML = "";
}

// Agregar producto desde el formulario
productForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const precio = parseFloat(document.getElementById("precio").value);

    if (!nombre || !categoria || isNaN(precio) || precio <= 0) {
        mostrarEnPantalla("Error", "Datos inválidos para agregar un producto.");
        return;
    }

    const nuevoProducto = new Producto(nombre, categoria, precio);
    productos.push(nuevoProducto);

    mostrarEnPantalla("Producto agregado", nuevoProducto);
    productForm.reset(); // Limpiar formulario
});

// Listar productos
listarButton.addEventListener("click", () => {
    limpiarPantalla();
    mostrarEnPantalla("Lista de productos", productos);
});

// Filtrar productos con precio menor a 100
filtrarButton.addEventListener("click", () => {
    limpiarPantalla();
    const productosBaratos = productos.filter((producto) => producto.precio < 100);
    mostrarEnPantalla("Productos con precio menor a 100", productosBaratos);
});


// Filtrar productos de Zapatillas
buscarZapatillas.addEventListener("click", () => {
    limpiarPantalla();
    const productosZapatillas = productos.filter((producto) => producto.categoria === "Zapatillas");
    mostrarEnPantalla("Producto encontrado", productosZapatillas);
});


// Buscar producto específico
buscarButton.addEventListener("click", () => {
    limpiarPantalla();
    const buscarProducto = productos.find((producto) => producto.nombre === "Chomba");
    mostrarEnPantalla("Producto encontrado", buscarProducto || "No encontrado");
});

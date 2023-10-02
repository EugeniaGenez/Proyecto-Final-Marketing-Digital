
    
        // Obtener elementos del DOM
        const botonesAgregar = document.querySelectorAll(".agregar");
        const botonesEliminar = document.querySelectorAll(".eliminar");
        const verResumenBtn = document.getElementById("verResumenBtn");
        const contadorCarrito = document.getElementById("contadorCarrito");
        const modalTotal = document.getElementById("modalTotal");
        const tablaProductos = document.getElementById("tablaProductos");
        const productosEnCarrito = {}; // Para almacenar los productos en el carrito
        contadorCarrito.style.display = "none";
        let cantidadProductosEnCarrito = 0;
        let cantidadProductos = 0;
        let totalAPagar = 0.00;
        const productos = {
            "Aceite-Cada-Dia": { nombre:"Aceite Cada Día", precio: 899.00 },
            "Aceite-Costa-del-sol": { nombre:"Aceite Costa del Sol", precio: 950.00 },
            "Alubias-Tarragona": { nombre:"Alubias Tarragona", precio: 400.00 },
            "Azucar-Los-Pupis": { nombre:"Azucar Los Pupis", precio: 800.00 },
            "Fideos-Tallarin-Ricatto": { nombre:"Fideos Tallarin Ricatto", precio: 245.00 },
            "Garbanzos-Tarragona": { nombre:"Garbanzos Tarragona", precio: 140.00 },
            "Harina-000-Doña-Luisa": { nombre:"Harina 000 Doña Luisa", precio: 150.00 },
            "Leche-La-Lechera": { nombre:"Leche La Lechera", precio: 1200.00 },
            "Leche-Purisima": { nombre:"Leche Purisima", precio: 1500.00 },
            "Leche-Vidalac": { nombre:"Leche Vidalac", precio: 1700.00 },
            "Lentejas-Monarca": { nombre:"Lentejas Monarca", precio: 500.00 },
            "Polenta-Campo-Lindo": { nombre:"Polenta Campo Lindo", precio: 350.00 },
            "Yerba-Mate-Andresito": { nombre:"Yerba Mate Andresito", precio: 2000.00 },
        };

        
        function actualizarContadorProductos() {
            cantidadProductosEnCarrito = 0;
            for (const key in productosEnCarrito) {
                cantidadProductosEnCarrito += productosEnCarrito[key];
            }

            // Ocultar el contador si no hay productos en el carrito
            if (cantidadProductosEnCarrito > 0) {
                contadorCarrito.style.display = "inline-block"; // Mostrar el contador
                contadorCarrito.textContent = cantidadProductosEnCarrito;
            } else {
                contadorCarrito.style.display = "none"; // Ocultar el contador
            }
        }

        function abrirModalFunction() {
    modalTotal.textContent = totalAPagar.toFixed(2);
    tablaProductos.innerHTML = ""; // Limpiar contenido previo
    for (const key in productosEnCarrito) {
        const cantidad = productosEnCarrito[key];
        if (cantidad > 0) {
            const producto = productos[key];
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${cantidad}</td>
                <td>$${(cantidad * producto.precio).toFixed(2)}</td>
                <td><button  class="eliminator" onclick="eliminarProducto('${key}')"><i class="bi bi-x-circle"></i></button></td>
            `;
            tablaProductos.appendChild(row);
        }
    }
}

        // Función para agregar producto al carrito
        function agregarProducto(key) {
            if (!productosEnCarrito[key]) {
                productosEnCarrito[key] = 0;
            }
            productosEnCarrito[key]++;
            cantidadProductos++;
            totalAPagar += productos[key].precio;
            actualizarContadorProductos();
        }

        // Función para eliminar producto del carrito
        function eliminarProducto(key) {
            if (productosEnCarrito[key] > 0) {
                productosEnCarrito[key]--;
                cantidadProductos--;
                totalAPagar -= productos[key].precio;
                actualizarContadorProductos();
            }
            abrirModalFunction(); // Actualizar el modal después de eliminar
        }

        // Agregar eventos a los botones de agregar
        botonesAgregar.forEach((boton) => {
            boton.addEventListener("click", () => {
                const producto = boton.getAttribute("data-producto");
                agregarProducto(producto);
            });
        });

        // Agregar eventos a los botones de eliminar
        botonesEliminar.forEach((boton) => {
            boton.addEventListener("click", (event) => {
                event.stopPropagation(); // Evitar que se propague el clic al contenedor
                const producto = boton.getAttribute("data-producto");
                eliminarProducto(producto);
            });
        });

        // Evento click para el botón Ver Resumen
        verResumenBtn.addEventListener("click", () => {
            abrirModalFunction();
        });

        function irAComprar() {
            // Obtén la referencia a la sección deseada por su id
            const productosSection = document.getElementById("Compras");
        
            // Desplázate suavemente a la sección
            productosSection.scrollIntoView({ behavior: "smooth" });
        }

        function irAInico() {
            // Obtén la referencia a la sección deseada por su id
            const productosSection = document.getElementById("Inicios");
        
            // Desplázate suavemente a la sección
            productosSection.scrollIntoView({ behavior: "smooth" });
        }


        function obtenerListaProductosCarritoFormateada() {
            let listaFormateada = "Nombre               Cantidad     Precio\n"; // Encabezados de la tabla
            let maxLongitudNombre = 0; // Variable para almacenar la longitud máxima del nombre de producto
        
            for (const nombre in productosEnCarrito) {
                const cantidad = productosEnCarrito[nombre];
                if (cantidad > 0) {
                    const producto = productos[nombre];
                    const subtotal = (cantidad * producto.precio).toFixed(2);
        
                    // Actualiza la longitud máxima si es necesario
                    if (producto.nombre.length > maxLongitudNombre) {
                        maxLongitudNombre = producto.nombre.length;
                    }
        
                    // Calcula la cantidad de espacios necesarios para alinear el precio
                    const espaciosNombre = maxLongitudNombre - producto.nombre.length + 15;
                    const espaciosCantidad = 9 - cantidad.toString().length;
                    const precioAlineado = `$${subtotal}`;
                    const espaciosPrecio = 15 - precioAlineado.length;
        
                    listaFormateada += `${producto.nombre}${' '.repeat(espaciosNombre)}${cantidad}${' '.repeat(espaciosCantidad)}${precioAlineado}${' '.repeat(espaciosPrecio)}\n`;
                }
            }
            return listaFormateada;
        }

        function compartirEnWhatsApp() {
            // Número de teléfono de WhatsApp al que deseas enviar el mensaje
            const numeroWhatsApp = '3435352075'; // Reemplaza con el número deseado
        
            // Obtén la lista de productos del carrito con formato similar al modal
            let mensaje = 'Resumen de Compra:\n';
            mensaje += 'Nombre               Cantidad     Precio\n'; // Encabezados de la tabla
        
            for (const nombre in productosEnCarrito) {
                const cantidad = productosEnCarrito[nombre];
                if (cantidad > 0) {
                    const producto = productos[nombre];
        
                    // Calcula la cantidad de espacios necesarios para alinear los datos
                    const espaciosNombre = Math.max(0, 20 - producto.nombre.length);
                    const espaciosCantidad = Math.max(0, 12 - cantidad.toString().length);
                    const subtotal = (cantidad * producto.precio).toFixed(2);
        
                    // Agrega los datos al mensaje con espacios en blanco para la alineación
                    mensaje += `${producto.nombre}${' '.repeat(espaciosNombre)}${cantidad}${' '.repeat(espaciosCantidad)}$${subtotal}\n`;
                }
            }
        
            // Calcula el total a pagar nuevamente
            let totalAPagar = 0.00;
            for (const nombre in productosEnCarrito) {
                const cantidad = productosEnCarrito[nombre];
                if (cantidad > 0) {
                    const producto = productos[nombre];
                    totalAPagar += cantidad * producto.precio;
                }
            }
        
            // Agrega el total al mensaje
            mensaje += `\nTotal a Pagar: $${totalAPagar.toFixed(2)}`;
        
            // Escapa el mensaje
            const mensajeCodificado = encodeURIComponent(mensaje);
        
            // Genera el enlace de WhatsApp con el número de teléfono y el mensaje
            const whatsappURL = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
        
            // Abre WhatsApp en una nueva ventana o pestaña
            window.open(whatsappURL, "_blank");
        }
        document.addEventListener("DOMContentLoaded", function () {
            const themeToggle = document.getElementById("themeToggle");
            const themeIcon = document.getElementById("themeIcon");
            const currentTheme = localStorage.getItem("theme");
        
            // Verifica el tema almacenado en el almacenamiento local
            if (currentTheme === "dark") {
                applyTheme("dark");
            } else if (currentTheme === "light") {
                applyTheme("light");
            }
        
            // Agrega un controlador de eventos al botón
            themeToggle.addEventListener("click", function () {
                if (document.body.classList.contains("dark-theme")) {
                    // Cambia al tema claro
                    applyTheme("light");
                } else {
                    // Cambia al tema oscuro
                    applyTheme("dark");
                }
            });
        
            // Función para aplicar el tema a las tarjetas
            function applyTheme(theme) {
                const cards = document.querySelectorAll(".card");
        
                // Recorre todas las tarjetas y cambia la clase de tema
                cards.forEach((card) => {
                    card.classList.remove("dark-theme", "light-theme"); // Elimina ambas clases de tema
                    card.classList.add(theme + "-theme"); // Agrega la clase de tema seleccionada
                });
        
                // Cambia el tema en el almacenamiento local
                localStorage.setItem("theme", theme);
        
                // Cambia el tema del cuerpo (body) si es necesario
                document.body.classList.remove("dark-theme", "light-theme");
                document.body.classList.add(theme + "-theme");
        
                // Cambia el icono del tema (si es necesario)
                if (theme === "dark") {
                    themeIcon.classList.remove("bi-sun");
                    themeIcon.classList.add("bi-moon");
                } else {
                    themeIcon.classList.remove("bi-moon");
                    themeIcon.classList.add("bi-sun");
                }
            }
        });
        
        
                       window.addEventListener("scroll", function () {
                            var navbar = document.querySelector(".navbar");
                           if (window.scrollY > 100) { // Cambia 100 a la posición deseada donde se muestra la barra de navegación
                               navbar.style.top = "0";
                                navbar.style.backgroundColor = "#333"; // Cambia el color de fondo de la barra de navegación cuando se muestra
                            }
                       });
        
        
const compartirWhatsAppButton = document.getElementById('compartir-whatsapp');
compartirWhatsAppButton.addEventListener('click', compartirEnWhatsApp);
   
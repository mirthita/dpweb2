function validar_form(tipo) {
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let detalle = document.getElementById("detalle").value;
    let precio = document.getElementById("precio").value;
    let stock = document.getElementById("stock").value;
    let id_categoria = document.getElementById("id_categoria").value;
    let fecha_vencimiento = document.getElementById("fecha_vencimiento").value;
    //let imagen = document.getElementById("imagen").value;
    if (codigo == "" || nombre == "" || detalle == "" || precio == "" || stock == "" || id_categoria == "" || fecha_vencimiento == "") {
        Swal.fire({
            title: "Error campos vacios!",
            icon: "Error",
            draggable: true
        });
        return;
    }
    if (tipo == "nuevo") {
        registrarProducto();
    }
    if (tipo == "actualizar") {
        actualizarProducto();
    }

}

if (document.querySelector('#frm_product')) {
    // evita que se envie el formulario
    let frm_product = document.querySelector('#frm_product');
    frm_product.onsubmit = function (e) {
        e.preventDefault();
        validar_form("nuevo");
    }
}

async function registrarProducto() {
    try {
        //capturar campos de formulario (HTML)
        const datos = new FormData(frm_product);
        //enviar datos a controlador
        let respuesta = await fetch(base_url + 'control/ProductoController.php?tipo=registrar', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        let json = await respuesta.json();
        // validamos que json.status sea = True
        if (json.status) { //true
            alert(json.msg);
            document.getElementById('frm_product').reset();
        } else {
            alert(json.msg);
        }
    } catch (e) {
        console.log("Error al registrar Producto:" + e);
    }
}
async function view_products() {
    try {
        let respuesta = await fetch(base_url + 'control/ProductoController.php?tipo=ver_productos', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache'
        });
        json = await respuesta.json();
        contenidot = document.getElementById('content_products');
        if (json.status) {
            let cont = 1;
            json.data.forEach(producto => {
                let nueva_fila = document.createElement("tr");
                nueva_fila.id = "fila" + producto.id;
                nueva_fila.className = "filas_tabla";
                nueva_fila.innerHTML = `
                            <td>${cont}</td>
                            <td>${producto.codigo}</td>
                            <td>${producto.nombre}</td>
                            <td>${producto.detalle}</td>
                            <td>${producto.precio}</td>
                            <td>${producto.stock}</td>
                            <td>${producto.categoria}</td>
                            <td>${producto.proveedor}</td>
                            <td>${producto.fecha_vencimiento}</td>
                            <td>
                                <a href="`+ base_url + `edit-product/` + producto.id + `" class="btn btn-primary">Editar</a>
                                <button class="btn btn-danger" onclick="fn_eliminar(` + producto.id + `);">Eliminar</button>
                            </td>
                `;
                cont++;
                contenidot.appendChild(nueva_fila);
            });
        }
    } catch (e) {
        console.log('error en mostrar producto ' + e);
    }
}
if (document.getElementById('content_products')) {
    view_products_cards();
}

async function edit_product() {
    try {
        let id_producto = document.getElementById('id_producto').value;
        const datos = new FormData();
        datos.append('id_producto', id_producto);

        let respuesta = await fetch(base_url + 'control/ProductoController.php?tipo=ver', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        json = await respuesta.json();
        if (!json.status) {
            alert(json.msg);
            return;
        }
        document.getElementById('codigo').value = json.data.codigo;
        document.getElementById('nombre').value = json.data.nombre;
        document.getElementById('detalle').value = json.data.detalle;
        document.getElementById('precio').value = json.data.precio;
        document.getElementById('stock').value = json.data.stock;
        document.getElementById('id_categoria').value = json.data.id_categoria;
        document.getElementById('fecha_vencimiento').value = json.data.fecha_vencimiento;
        //document.getElementById('imagen').value = json.data.imagen;
        document.getElementById('id_proveedor').value = json.data.id_proveedor;

    } catch (error) {
        console.log('oops, ocurrió un error ' + error);
    }
}

async function actualizarProducto() {
    const datos = new FormData(frm_edit_product);
    let respuesta = await fetch(base_url + 'control/ProductoController.php?tipo=actualizar', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: datos
    });
    json = await respuesta.json();
    if (!json.status) {
        alert("Oooooops, ocurrio un error al actualizar, intentelo nuevamente");
        console.log(json.msg);
        return;
    } else {
        alert(json.msg);
    }
}
async function fn_eliminar(id) {
    if (window.confirm("¿Seguro que quiere eliminar?")) {
        eliminar(id);
    }
}
async function eliminar(id_producto) {
    let datos = new FormData();
    datos.append('id_producto', id_producto);
    let respuesta = await fetch(base_url + 'control/ProductoController.php?tipo=eliminar', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: datos
    });
    json = await respuesta.json();
    if (!json.status) {
        alert("Oooooops, ocurrio un error al eliminar persona, intentelo mas tarde");
        console.log(json.msg);
        return;
    } else {
        alert(json.msg);
        location.replace(base_url + 'products');
    }
}

if (document.querySelector('#frm_edit_product')) {
    // evita que se envie el formulario
    let frm_product = document.querySelector('#frm_edit_product');
    frm_product.onsubmit = function (e) {
        e.preventDefault();
        validar_form("actualizar");
    }
}
async function cargar_categorias() {
    let respuesta = await fetch(base_url + 'control/CategoriaController.php?tipo=ver_categorias', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache'
    });
    let json = await respuesta.json();
    let contenido = '<option>Seleccione Categoria</option>';
    json.data.forEach(categoria => {
        contenido += '<option value="' + categoria.id + '">' + categoria.nombre + '</option>';
    });
    //console.log(contenido);
    document.getElementById("id_categoria").innerHTML = contenido;
}
async function cargar_proveedores() {
    let respuesta = await fetch(base_url + 'control/UsuarioController.php?tipo=listar_proveedores', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache'
    });
    let json = await respuesta.json();
    let contenido = '<option>Seleccione Proveedor</option>';
    json.data.forEach(proveedor => {
        contenido += '<option value="' + proveedor.id + '">' + proveedor.razon_social + '</option>';
    });
    //console.log(contenido);
    document.getElementById("id_proveedor").innerHTML = contenido;
}


async function view_products_cards() {
    try {
        console.log("Cargando productos en vista de cards...");
        let respuesta = await fetch(base_url + 'control/ProductoController.php?tipo=ver_productos', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache'
        });

        let json = await respuesta.json();
        console.log("Datos recibidos:", json);

        let contenido = document.getElementById('content_products');
        if (!contenido) {
            console.error("❌ No se encontró el contenedor #content_productos");
            return;
        }

        contenido.innerHTML = '';

        if (json.status && json.data.length > 0) {
            let fila = document.createElement('div');
            fila.className = 'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4';

            json.data.forEach(producto => {

                let rutaImagen;
                if (producto.imagen && producto.imagen.startsWith('data:image')) {
                    rutaImagen = producto.imagen;
                } else if (producto.imagen && producto.imagen.trim() !== "") {
                    rutaImagen = base_url + producto.imagen;
                } else {
                    rutaImagen = base_url + 'assets/img/no-image.png';
                }


                let col = document.createElement('div');
                col.className = 'col';
                col.setAttribute('data-producto-id', producto.id);

                col.innerHTML = `
                    <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                       <img src="${rutaImagen}" 
             class="card-img-top img-fluid" 
             alt="${producto.nombre}" 
             style="height: 300px; width: 900px; object-fit: cover; transition: transform 0.3s ease;">
        
       <div class="card-body text-center bg-light rounded-4 shadow-sm py-4">
    <h5 class="card-title fw-bold mb-3 text-dark">
        ${producto.nombre}
    </h5>
    <p class="card-text small text-secondary mb-3">
        ${producto.detalle}
    </p>
    <p class="fw-semibold fs-5 text-dark mb-3">
        💰 S/ ${parseFloat(producto.precio).toFixed(2)}
    </p>
    <span class="badge bg-dark text-white mb-3 px-4 py-2 rounded-pill">
        Stock: ${producto.stock}
    </span>
    <div class="border-top pt-3">
        <p class="text-dark small mb-2">
            <i class="bi bi-tags me-1 text-secondary"></i>
            <strong>Categoría:</strong> ${producto.categoria ?? '—'}
        </p>
        <p class="text-dark small mb-2">
            <i class="bi bi-truck me-1 text-secondary"></i>
            <strong>Proveedor:</strong> ${producto.proveedor ?? '—'}
        </p>
        <p class="text-dark small mb-0">
            <i class="bi bi-calendar-event me-1 text-secondary"></i>
            <strong>Fecha:</strong> ${producto.fecha_vencimiento ?? '—'}
        </p>
            </div>
        </div>


        <div class="card-footer bg-light border-0 d-flex justify-content-center gap-2 pb-3">
    <button class="btn btn-primary btn-sm rounded-pill shadow-sm px-3">
        <i class="bi bi-eye-fill"></i> Ver
    </button>
    <button href="${base_url}edit-producto/${producto.id}" class="btn btn-warning btn-sm rounded-pill shadow-sm px-3 text-dark">
        <i class="bi bi-pencil-fill"></i> Editar
    </button>
    <button class="btn btn-success btn-sm rounded-pill shadow-sm px-3" onclick="agregarAlCarrito(${producto.id})">
    <i class="bi bi-cart-fill"></i> Añadir
</button>
    <button class="btn btn-danger btn-sm rounded-pill shadow-sm px-3" onclick="fn_eliminar(${producto.id})">
        <i class="bi bi-trash-fill"></i> Borrar
    </button>
</div>
`;

                fila.appendChild(col);
            });

            contenido.appendChild(fila);
        } else {
            contenido.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-box-seam display-4 text-muted"></i>
                    <h5 class="mt-3 text-muted">No hay productos disponibles</h5>
                </div>
            `;
        }
    } catch (error) {
        console.error("Error al mostrar productos en tarjetas:", error);
        let contenido = document.getElementById('content_products');
        if (contenido) {
            contenido.innerHTML = `
                <div class="alert alert-danger text-center" role="alert">
                    Error al cargar los productos. Intente nuevamente más tarde.
                </div>
            `;
        }
    }
}

if (document.getElementById('content_products')) {
    view_products_cards();
}

async function agregarAlCarrito(id_producto) {
    try {
        // Crear el cuerpo de la solicitud
        const datos = new FormData();
        datos.append('id_producto', id_producto);

        // Enviar al controlador del carrito (debes tener este archivo)
        let respuesta = await fetch(base_url + 'control/CarritoController.php?tipo=agregar', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });

        let json = await respuesta.json();

        if (json.status) {
            Swal.fire({
                title: "Agregado al carrito 🛒",
                text: json.msg,
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                title: "Error",
                text: json.msg,
                icon: "error"
            });
        }

    } catch (error) {
        console.error("Error al agregar al carrito:", error);
        Swal.fire({
            title: "Error",
            text: "No se pudo agregar al carrito. Intenta más tarde.",
            icon: "error"
        });
    }
}



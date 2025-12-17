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
                            <td>${producto.precio}</td>
                            <td>${producto.stock}</td>
                            <td>${producto.categoria}</td>
                            <td>${producto.fecha_vencimiento}</td>
                            <td><svg id="barcode${producto.id}"></svg></td>
                            <td>
                                <a href="`+ base_url + `edit-product/` + producto.id + `">Editar</a>
                                <button class="btn btn-danger" onclick="fn_eliminar(` + producto.id + `);">Eliminar</button>
                            </td>
                `;
                cont++;
                contenidot.appendChild(nueva_fila);

            });
            json.data.forEach(producto => {
                JsBarcode("#barcode" + producto.id, "" + producto.codigo, {
                    width: 2,
                    height: 40
                });
            });
        }
    } catch (e) {
        console.log('error en mostrar producto ' + e);
    }
}
if (document.getElementById('content_products')) {
    view_products();
}

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
async function cargar_categorias() {
    let respuesta = await fetch(base_url + 'control/CategoriaController.php?tipo=ver_categorias', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache'
    });
    let json = await respuesta.json();
    let contenido = '<option>Seleccione</option>';
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
    let contenido = '<option>Seleccione</option>';
    json.data.forEach(proveedor => {
        contenido += '<option value="' + proveedor.id + '">' + proveedor.razon_social + '</option>';
    });
    //console.log(contenido);
    document.getElementById("id_proveedor").innerHTML = contenido;
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
        document.getElementById('id_proveedor').value = json.data.id_proveedor;
        document.getElementById('fecha_vencimiento').value = json.data.fecha_vencimiento;
        document.getElementById('direccion').value = json.data.direccion;
        document.getElementById('rol').value = json.data.rol;

    } catch (error) {
        console.log('oops, ocurrió un error ' + error);
    }
}
if (document.querySelector('#frm_edit_product')) {
    // evita que se envie el formulario
    let frm_user = document.querySelector('#frm_edit_product');
    frm_user.onsubmit = function (e) {
        e.preventDefault();
        validar_form("actualizar");
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



async function listar_productos_venta() {
    try {
        let dato = document.getElementById('busqueda_venta').value;
        const datos = new FormData();
        datos.append('dato', dato);
        let respuesta = await fetch(base_url + 'control/ProductoController.php?tipo=buscar_producto_venta', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: datos
        });
        json = await respuesta.json();
        contenidot = document.getElementById('productos_venta');
        if (json.status) {
            let cont = 1;
            contenidot.innerHTML = ``;
            json.data.forEach(producto => {
                let producto_list = ``;
                producto_list += `<div class="card m-2 col-12">
                                <img src="${base_url + producto.imagen}" alt="" width="100%" height="150px">
                                <p class="card-text">${producto.nombre}</p>
                                <p>Precio: ${producto.precio}</p>
                                <p>Stock: ${producto.stock}</p>
                                <button onclick="agregar_producto_temporal(${producto.id},${producto.precio},1)" class="btn btn-primary">Agregar</button>
                            </div>`;

                let nueva_fila = document.createElement("div");
                nueva_fila.className = "div col-md-3 col-sm-6 col-xs-12";
                nueva_fila.innerHTML = producto_list;
                cont++;
                contenidot.appendChild(nueva_fila);
                let id = document.getElementById('id_producto_venta');
                let precio = document.getElementById('producto_precio_venta');
                let cantidad = document.getElementById('producto_cantidad_venta');
                id.value = producto.id;
                precio.value = producto.precio;
                cantidad.value = 1;
            });
        }
    } catch (e) {
        console.log('error en mostrar producto ' + e);
    }
}
if (document.getElementById('productos_venta')) {
    listar_productos_venta();
}
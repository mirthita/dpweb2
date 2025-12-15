<div class="container-fluid mt-4 row">
    <h2>Ventas</h2>
    <div class="col-8">
        <div class="card">
            <div class="card-body row">
                <h5 class="card-title col-md-4">Busqueda de Productos</h5>
                <div class="col-md-6">
                    <input type="text" class="form-control col-md-12" placeholder="buscar producto por codigo o nombre" id="busqueda_venta" onkeyup="listar_productos_venta();">
                    <input type="hidden" id="id_producto_venta">
                    <input type="hidden" id="producto_precio_venta">
                    <input type="hidden" id="producto_cantidad_venta" value="1">
                </div>
                <div class="row container-fluid" id="productos_venta">
                    <!--<div class="card m-2 col-3">
                        <div class="card-body">
                            <img src="https://www.agenciaeplus.com.br/wp-content/uploads/2021/12/pagina-de-produto.jpg" alt="" width="100%" height="150px">
                            <p class="card-text">Descripcion del producto</p>
                            <button class="btn btn-primary">Agregar</button>
                        </div>
                    </div>-->
                </div>
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Lista de Compra</h5>
                <div class="row" style="min-height: auto;">
                    <div class="col-12">
                        <table class="table-responsive table table-hover">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cant.</th>
                                    <th>P. Unit.</th>
                                    <th>SubTotal</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="lista_compra">
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-end">
                        <h4>Subtotal : <label id="subtotal_general"></label></h4>
                        <h4>Igv : <label id="igv_general"></label></h4>
                        <h4>Total : <label id="total"></label></h4>
                        <button class="btn btn-success">Realizar Venta</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<?= BASE_URL ?>view/function/product.js"></script>
<script src="<?= BASE_URL ?>view/function/venta.js"></script>
<script>
    let input = document.getElementById("busqueda_venta");
    input.addEventListener('keydown', (event)=>{
        if (event.key == 'Enter') {
            agregar_producto_temporal();
        }
    });
    listar_temporales();
    act_subt_general();
</script>
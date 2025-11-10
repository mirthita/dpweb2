<div class="container-fluid mt-3">
    <div class="row">
        <!-- Columna de Productos (col-9) -->
        <div class="col-lg-9 col-md-8">
            <div class="card shadow-sm border-0 mb-4">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="mb-0">
                            <i class="bi bi-box-seam-fill text-primary"></i> Lista de Productos
                        </h4>
                        <a href="<?php echo BASE_URL; ?>new-product" class="btn btn-success">
                            <i class="bi bi-plus-circle-fill"></i> Nuevo Producto
                        </a>
                    </div>
                    <!-- Aquí se mostrarán las tarjetas de productos -->
                    <div id="content_products" class="mt-3"></div>
                </div>
            </div>
        </div>

        <!-- Columna del Carrito (col-3) -->
        <div class="col-lg-3 col-md-4">
            <div class="carrito-fijo">
                <div class="card shadow border-0 sticky-top" style="top: 20px;">
                    <!-- Header del Carrito -->
                    <div class="card-header bg-gradient text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                        <h5 class="mb-0">
                            <i class="bi bi-cart-fill"></i> Mi Carrito
                            <span class="badge bg-danger float-end" id="badge-carrito-fijo">0</span>
                        </h5>
                    </div>

                    <!-- Cuerpo del Carrito -->
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Lista de Compra</h5>
                <div class="row" style="min-height: 500px;">
                    <div class="col-12">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Total</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="lista_compra">
                                <tr>
                                    <td>Producto 1</td>
                                    <td>2</td>
                                    <td>$10.00</td>
                                    <td>$20.00</td>
                                    <td><button class="btn btn-danger btn-sm">Eliminar</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-end">
                        <h4>Subtotal : <label id="">$20.00</label></h4>
                        <h4>Igv : <label id="">$20.00</label></h4>
                        <h4>Total : <label id="">$20.00</label></h4>
                        <button class="btn btn-success">Realizar Venta</button>
                    </div>

                    <!-- Footer del Carrito -->
                    <div class="card-footer bg-light">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <strong>Total:</strong>
                            <h4 class="mb-0 text-primary" id="total-carrito-fijo">S/ 0.00</h4>
                        </div>
                        <button class="btn btn-success w-100 mb-2" onclick="finalizarCompraFijo()">
                            <i class="bi bi-check-circle-fill"></i> Finalizar Compra
                        </button>
                        <button class="btn btn-outline-danger w-100 btn-sm" onclick="vaciarCarritoFijo()">
                            <i class="bi bi-trash-fill"></i> Vaciar Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="<?= BASE_URL ?>view/function/product.js"></script>
<script src="<?= BASE_URL ?>view/function/venta.js"></script>
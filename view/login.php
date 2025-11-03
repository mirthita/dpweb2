<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
     body {
    background-image: url('view/img/2.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin: 0;
    padding: 0;
}

nav {
    display: none !important;
}

.image-container {
    width: 100%;
    height: 200px;
    background-image: url('view/img/1.jpeg');
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    margin-bottom: 20px;
}

.login-container {
    max-width: 400px;
    width: 90%;
    padding: 40px;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.login-container h2 {
    margin-bottom: 20px;
    text-align: center;
    color: #333333;
    font-weight: bold;
}

.login-container input {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border-radius: 8px;
    border: 1px solid #cfd8dc;
    font-size: 14px;
}

.login-container input:focus {
    outline: none;
    border: 1px solid #4A90E2;
    box-shadow: 0 0 5px #4A90E2;
}

.login-container button {
    width: 100%;
    padding: 12px;
    background-color: #4A90E2;
    color: white;
    font-weight: bold;
    font-size: 15px;
    border-radius: 8px;
    border: none;
    transition: background-color 0.3s ease;
}

.login-container button:hover {
    background-color: #357ABD;
    cursor: pointer;
}
    </style>
    <script>
        const base_url = '<?= BASE_URL; ?>';
    </script>
</head>

<body>
    <div class="login-container">
        <div class="image-container"></div>
        <h2>Iniciar Sesión</h2>
        <form id="frm_login">
            <input type="text" placeholder="Usuario" name="username" id="username" required>
            <input type="password" placeholder="Contraseña" name="password" id="password" required>
            <button type="button" onclick="iniciar_sesion();">Iniciar Sesión</button>
        </form>
    </div>
    <script src="<?= BASE_URL; ?>view/function/user.js"></script>
</body>

</html>
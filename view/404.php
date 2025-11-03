<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error 404 - Página no encontrada</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color:rgb(241, 234, 235);
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            padding: 20px;
            text-align: center;
        }
        .container {
            max-width: 800px;
            background-color: white;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .error-code {
            font-size: 120px;
            font-weight: bold;
            color: #e74c3c;
            margin: 0;
            line-height: 1;
        }
        .error-text {
            font-size: 36px;
            margin: 10px 0 30px;
            color: #2c3e50;
        }
        .robot {
            max-width: 200px;
            margin: 20px auto;
        }
        .btn {
            display: inline-block;
            background-color:rgb(4, 61, 248);
            color: white;
            padding: 12px 30px;
            border-radius: 30px;
            text-decoration: none;
            font-weight: bold;
            transition: background-color 0.3s;
            margin: 10px;
        }
        .btn:hover {
            background-color:rgb(23, 90, 189);
        }
        .gear {
            animation: spin 5s linear infinite;
            display: inline-block;
            font-size: 30px;
            margin: 0 20px;
        }
        .robot img {
    animation: bounce 1s ease-in-out infinite;
}
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
}
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .error-description {
            font-size: 20px;
            margin: 20px 0;
            color:rgb(25, 25, 26);
        }
        @media (max-width: 600px) {
            .container {
                padding: 20px;
            }
            .error-code {
                font-size: 80px;
            }
            .error-text {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <span class="gear">⚙️</span>
        <span class="gear">⚙️</span>
        
        <div class="robot">
            <img src="1.avif" alt="Error 404 - Robot amarillo" style="max-width: 250px; height: auto;">
        </div>
        
        <p class="error-description">
            OoOops! 
            <br>La página fuera de servicio.
        </p>
        
        <div>
            <a href="#" class="btn">cargar</a>
            <a href="#" class="btn">volver</a>
        </div>
    </div>
</body>
</html>
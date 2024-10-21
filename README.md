<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página con Efecto Tornasol, Relieve 3D y Cuadro de Mensajes</title>
    <style>
        body {
            margin: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #FFD1DC, #FFB6C1, #FFC0CB, #FF69B4);
            background-size: 200% 200%;
            animation: gradientShift 5s ease infinite;
        }

        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .relieve {
            width: 60%;
            padding: 20px;
            background-color: #FFD1DC;
            border-radius: 20px;
            box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2),
                        -10px -10px 20px rgba(255, 255, 255, 0.6),
                        inset 10px 10px 20px rgba(0, 0, 0, 0.2),
                        inset -10px -10px 20px rgba(255, 255, 255, 0.6);
            text-align: center;
            font-family: 'Arial', sans-serif;
            color: #333;
            font-size: 24px;
        }

        .mensaje {
            padding: 20px;
            background-color: rgba(255, 255, 255, 0.8); /* Fondo translúcido */
            border-radius: 15px;
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2),
                        -5px -5px 15px rgba(255, 255, 255, 0.5);
            font-size: 18px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="relieve">
        <div class="mensaje">
            ¡Bienvenido a nuestra página!
            <br><br>
            Este es un cuadro de mensaje en el centro.
        </div>
    </div>
</body>
</html>

<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página con Cuadro de Mensajes y Envío</title>
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
            position: relative;
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

        /* Cuadro de texto y botón de envío */
        .input-container {
            position: absolute;
            bottom: 20px;
            width: 50%; /* Ajusta el ancho del contenedor */
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .input-container input[type="text"] {
            width: 80%; /* Ajusta el ancho del cuadro de texto */
            padding: 10px;
            font-size: 18px;
            border: 2px solid #FFB6C1;
            border-radius: 10px;
            box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.1),
                        inset -5px -5px 10px rgba(255, 255, 255, 0.5);
            outline: none;
        }

        .input-container button {
            padding: 10px 20px;
            margin-left: 10px;
            font-size: 18px;
            background-color: #FF69B4;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
                        -5px -5px 10px rgba(255, 255, 255, 0.5);
            transition: background-color 0.3s;
        }

        .input-container button:hover {
            background-color: #FF1493;
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

    <!-- Contenedor de cuadro de texto y botón de envío -->
    <div class="input-container">
        <input type="text" id="mensajeInput" placeholder="Escribe tu mensaje aquí...">
        <button onclick="enviarMensaje()">Enviar</button>
    </div>

    <script>
        function enviarMensaje() {
            // Capturamos el valor del cuadro de texto
            var mensaje = document.getElementById("mensajeInput").value;

            // Guardamos el valor en una variable
            console.log("Mensaje enviado:", mensaje);

            // Puedes realizar más acciones con el mensaje, como enviarlo a un servidor
        }
    </script>
</body>
</html>

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
            height: 300px;
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
            position: relative;
        }

        .mensaje {
            padding: 10px;
            background-color: rgba(255, 255, 255, 0.8); /* Fondo translúcido */
            border-radius: 15px;
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2),
                        -5px -5px 15px rgba(255, 255, 255, 0.5);
            font-size: 18px;
            font-weight: bold;
        }

        .mensaje-container {
            max-height: 200px;
            overflow-y: auto;
            padding: 10px;
            text-align: left;
        }

        .mensaje-usuario {
            padding: 10px;
            background-color: #FFC0CB;
            border-radius: 10px;
            margin-bottom: 10px;
            display: inline-block;
            max-width: 80%;
            text-align: right;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
        }

        /* Cuadro de texto y botón de envío */
        .input-container {
            position: absolute;
            bottom: 20px;
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .input-container input[type="text"] {
            width: 80%;
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
        <div class="mensaje-container" id="mensajeContainer">
            <!-- Los mensajes enviados aparecerán aquí -->
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

            if (mensaje.trim() !== "") { // Verificamos que el mensaje no esté vacío
                // Creamos un nuevo elemento para el mensaje del usuario
                var nuevoMensaje = document.createElement("div");
                nuevoMensaje.classList.add("mensaje-usuario");
                nuevoMensaje.textContent = mensaje;

                // Insertamos el nuevo mensaje en el contenedor de mensajes
                var mensajeContainer = document.getElementById("mensajeContainer");
                mensajeContainer.appendChild(nuevoMensaje);

                // Limpiamos el cuadro de texto después de enviar el mensaje
                document.getElementById("mensajeInput").value = "";

                // Hacemos scroll hasta el último mensaje
                mensajeContainer.scrollTop = mensajeContainer.scrollHeight;
            }
        }
    </script>
</body>
</html>

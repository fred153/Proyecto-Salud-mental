pip install Flask requests
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WhatsApp Button</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }
        .whatsapp-button {
            padding: 15px 30px;
            background-color: #25D366;
            color: white;
            font-size: 18px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            display: inline-block;
        }
        .whatsapp-button:hover {
            background-color: #20b358;
        }
    </style>
</head>
<body>

    <a href="https://wa.me/+573212810060" class="whatsapp-button" onclick="sendMessage()">Contáctanos por WhatsApp</a>

<script>
        async function sendMessage() {
            // Mensaje que enviarás
            const mensaje = "Hola soy tu asistente virtual y voy \n ayudarte a entender mejor las enfermedades del sistema nervioso";
            body: new URLSearchParams({
                    'Body': mensaje
                })
            });
        }
    </script>
</body>
</html>

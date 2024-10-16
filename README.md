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
    // Importar las dependencias
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Crear una instancia del cliente de WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(), // Guarda la sesión para no tener que escanear el código QR cada vez
});

// Generar el código QR para el inicio de sesión
client.on('qr', (qr) => {
    console.log('Escanea este código QR con tu WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Confirmar que el cliente está listo para usar
client.on('ready', () => {
    console.log('El cliente de WhatsApp está listo.');
});

// Manejar los mensajes entrantes
client.on('message', message => {
    console.log(`Mensaje recibido: ${message.body}`);

    // Verificar si el mensaje es "hola"
    if (message.body.toLowerCase() === 'hola') {
        // Responder con "¿Cómo estás?"
        message.reply('¿Cómo estás?');
    }
});

// Iniciar el cliente
client.initialize();
    </script>
</body>
</html>

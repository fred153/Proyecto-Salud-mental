<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat en WhatsApp</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
        }
        .whatsapp-button {
            padding: 10px 20px;
            background-color: #25D366; /* Color de WhatsApp */
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
            font-size: 18px;
        }
        .whatsapp-button:hover {
            background-color: #128C7E; /* Color de WhatsApp al pasar el mouse */
        }
    </style>
</head>
<body>
    <h1>Bienvenido a nuestra página</h1>
    <p>Si tienes alguna pregunta, no dudes en contactarnos a través de WhatsApp.</p>
    <button class="whatsapp-button" onclick="iniciarChat()">Contáctanos por WhatsApp</button>

    <script>
        async function iniciarChat() {
    const mensaje = 'Hola'; // Mensaje inicial
    console.log('Botón de WhatsApp presionado. Enviando mensaje a backend...'); // Agregado para depuración

    try {
        // Hacer una llamada a tu backend en Render para manejar el mensaje
        const response = await fetch('https://proyecto-salud-mental.onrender.com/whatsapp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: mensaje }),
        });

        console.log('Respuesta del servidor:', response); // Agregado para depuración

        if (response.ok) {
            // Si la llamada es exitosa, abrir WhatsApp
            const numero = '+573212810060'; // Reemplaza con el número de WhatsApp
            const url = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensaje)}`;
            window.open(url, '_blank');
        } else {
            console.error('Error en la respuesta del servidor:', response.statusText);
        }
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
}
    </script>
</body>
</html>
